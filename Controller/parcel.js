import { nanoid } from "nanoid";
import { parcelModel } from "../Model/parcel.js";

export default class ParcelController {
  static async createParcel(req, res) {
    const { sender, recipient } = req.body;

    const trackingNumber = nanoid();
    // Create a new parcel with initial tracking information
    const newParcel = new parcelModel({
      trackingNumber,
      sender,
      recipient,
      user: req.user._id, // Associate the user's ID with the parcel
      status: "Pending",
      trackingInfo: [
        {
          status: "Pending",
          location: sender.address,
        },
      ],
    });

    const savedParcel = await newParcel.save();
    res.status(201).json({ success: true, savedParcel });
  }

  // Controller to update a user-specific parcel by ID
  static async updateParcel(req, res) {
    const { trackingNumber, sender, recipient, status, deliveryDate } =
      req.body;
    const parcelId = req.params.id;

    // Find the parcel by ID
    const parcel = await parcelModel.findById(parcelId);
    if (!parcel) {
      res.status(404);
      throw new Error("Parcel not found");
    }

    // Check if the user has permission to update the parcel
    if (parcel.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error(
        "Unauthorized - You do not have permission to update this parcel",
      );
    }

    // Update parcel details
    parcel.trackingNumber = trackingNumber || parcel.trackingNumber;
    parcel.sender = sender || parcel.sender;
    parcel.recipient = recipient || parcel.recipient;
    parcel.status = status || parcel.status;
    parcel.deliveryDate = deliveryDate || parcel.deliveryDate;

    const updatedParcel = await parcel.save();
    res.status(200).json(updatedParcel);
  }

  // Controller to add tracking information to a parcel
  static async addTrackingInfo(req, res) {
    const { status, location } = req.body;
    const parcelId = req.params.id;

    // Find the parcel by ID
    const parcel = await parcelModel.findById(parcelId);
    if (!parcel) {
      res.status(404);
      throw new Error("Parcel not found");
    }

    // Check if the user has permission to update the parcel
    if (parcel.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error(
        "Unauthorized - You do not have permission to update this parcel",
      );
    }

    // Add tracking information to the parcel
    parcel.trackingInfo.push({ status, location });
    parcel.status = status;

    // Update delivery date if status is 'Delivered'
    if (status === "Delivered") {
      parcel.deliveryDate = new Date();
    }

    const updatedParcel = await parcel.save();
    res.status(200).json({ success: true, updatedParcel });
  }

  // Controller to get all parcels for the current user
  static async getAllParcels(req, res) {
    // Fetch all parcels for the current user
    const parcels = await parcelModel.find({ user: req.user._id });
    res.json(parcels);
  }

  // Controller to get a specific parcel by ID
  static async getParcelById(req, res) {
    const parcelId = req.params.id;

    // Find the parcel by ID
    const parcel = await parcelModel.findById(parcelId);
    if (!parcel) {
      res.status(404);
      throw new Error("Parcel not found");
    }

    // Check if the user has permission to view the parcel
    if (parcel.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error(
        "Unauthorized - You do not have permission to view this parcel",
      );
    }

    res.json(parcel);
  }

  // Controller to delete a parcel by ID
  static async deleteParcel(req, res) {
    const parcelId = req.params.id;

    const parcel = await parcelModel.findById(parcelId);

    // Check if the user has permission to delete the parcel
    if (parcel.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        error:
          "Unauthorized - You do not have permission to delete this parcel",
      });
    }

    // Find the parcel by ID and delelte
    const check = await parcelModel.findByIdAndDelete(parcelId);
    if (!check) {
      res.status(404);
      throw new Error("Parcel not found");
    }
    res
      .status(200)
      .json({ success: true, message: "Parcel deleted successfully" });
  }

  // Controller to update a parcel by ID (admin only)
  static async updateParcelAdmin(req, res) {
    const { trackingNumber, sender, recipient, status } = req.body;
    const parcelId = req.params.id;

    // Find the parcel by ID
    const parcel = await parcelModel.findById(parcelId);
    if (!parcel) {
      res.status(404);
      throw new Error("Parcel not found");
    }

    // Update parcel details (admin only)
    parcel.trackingNumber = trackingNumber || parcel.trackingNumber;
    parcel.sender = sender || parcel.sender;
    parcel.recipient = recipient || parcel.recipient;
    parcel.status = status || parcel.status;

    const updatedParcel = await parcel.save();
    res.json(updatedParcel);
  }

  // Controller to get all parcels for all users (admin only)
  static async getAllParcelsAdmin(req, res) {
    // Fetch all parcels for all users (admin only)
    if (req.user.role !== "admin") {
      res.status(403);
      throw new Error(
        "Unauthorized - Only admin users can view all parcels for all users",
      );
    }

    const parcels = await parcelModel.find();
    res.status(200).json(parcels);
  }

  // Controller to get all parcels for a specific user (admin only)
  static async getParcelsByUserIdAdmin(req, res) {
    const userId = req.params.userId;

    // Fetch all parcels for the specified user (admin only)
    if (req.user.role !== "admin") {
      res.status(403);
      throw new Error(
        "Unauthorized - Only admin users can view all parcels for a specific user",
      );
    }

    const parcels = await parcelModel.find({ user: userId });
    res.status(200).json(parcels);
  }

  // Controller to delete a parcel by ID (admin only)
  static async deleteParcelAdmin(req, res) {
    const parcelId = req.params.id;

    // Check if the user has permission to delete the parcel (admin only)
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Unauthorized - Only admin users can delete parcels" });
    }
    // Find the parcel by ID
    const check = await parcelModel.findById(parcelId);
    if (!check) {
      res.status(404);
      throw new Error("Parcel not found");
    }

    res.json({ success: true, message: "Parcel deleted successfully" });
  }
}
