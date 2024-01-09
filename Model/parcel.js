import { Schema, Types, model } from "mongoose";

const parcelSchema = new Schema({
  trackingNumber: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: Types.ObjectId,
    ref: "User", // Reference to the User model
  },
  sender: {
    name: String,
    address: String,
    phone: String,
    email: String,
  },
  recipient: {
    name: String,
    address: String,
    phone: String,
    email: String,
  },
  status: {
    type: String,
    enum: ["Pending", "In Transit", "Delivered"],
    default: "Pending",
  },
  deliveryDate: {
    type: Date,
  },
  // Add tracking information
  trackingInfo: [
    {
      status: {
        type: String,
        enum: ["Pending", "In Transit", "Delivered"],
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  created: {
    type: Date,
    default: Date.now,
  },
});

export const parcelModel = model.parcel || model("Parcel", parcelSchema);
