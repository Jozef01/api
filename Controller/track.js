import PDFDocument from "pdfkit";
//files
import { parcelModel } from "../Model/parcel.js";

export class Track {
  static async getParcelByTrackingNumber(req, res) {
    const trackingNumber = req.params.trackingNumber;

    const parcel = await parcelModel.findOne({ trackingNumber });

    if (!parcel) {
      res.status(404);
      throw new Error("Parcel not found");
    }

    res.json(parcel);
  }

  static async downloadParcelPDF(req, res) {
    const trackingNumber = req.params.trackingNumber;

    const parcel = await parcelModel.findOne({ trackingNumber });

    if (!parcel) {
      res.status(404);
      throw new Error("Parcel not found");
    }

    const doc = new PDFDocument();

    const stream = doc.pipe(res);

    doc.text(`Parcel Details for Tracking Number: ${parcel.trackingNumber}`);
    doc.text(
      `Sender: ${parcel.sender.name}, ${parcel.sender.address}, ${parcel.sender.phone}, ${parcel.sender.email}`,
    );
    doc.text(
      `Recipient: ${parcel.recipient.name}, ${parcel.recipient.address}, ${parcel.recipient.phone}, ${parcel.recipient.email}`,
    );
    doc.text(`Status: ${parcel.status}`);
    doc.text(`Delivery Date: ${parcel.deliveryDate || "Not available"}`);

    doc.end();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=parcel_${parcel.trackingNumber}.pdf`,
    );

    stream.on("finish", () => {
      res.end();
    });
  }
}
