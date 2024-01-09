import PDFDocument from "pdfkit";
//files
import { parcelModel } from "../Model/parcel.js";

export class Track {
  static async getParcelByTrackingNumber(req, res) {
    const trackingNumber = req.params.trackingNumber;

    // Find the parcel by tracking number
    const parcel = await parcelModel.findOne({ trackingNumber });

    if (!parcel) {
      res.status(404);
      throw new Error("Parcel not found");
    }

    res.json(parcel);
  }

  static async downloadParcelPDF(req, res) {
    const trackingNumber = req.params.trackingNumber;

    // Find the parcel by ID
    const parcel = await parcelModel.findOne({ trackingNumber });

    if (!parcel) {
      res.status(404);
      throw new Error("Parcel not found");
    }

    // Create a new PDF document
    const doc = new PDFDocument();

    // Pipe the PDF to a writable stream
    const stream = doc.pipe(res);

    // Set the PDF content
    doc.text(`Parcel Details for Tracking Number: ${parcel.trackingNumber}`);
    doc.text(
      `Sender: ${parcel.sender.name}, ${parcel.sender.address}, ${parcel.sender.phone}, ${parcel.sender.email}`,
    );
    doc.text(
      `Recipient: ${parcel.recipient.name}, ${parcel.recipient.address}, ${parcel.recipient.phone}, ${parcel.recipient.email}`,
    );
    doc.text(`Status: ${parcel.status}`);
    doc.text(`Delivery Date: ${parcel.deliveryDate || "Not available"}`);

    // End the document
    doc.end();

    // Set the response headers for PDF download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=parcel_${parcel.trackingNumber}.pdf`,
    );

    // Send the response
    stream.on("finish", () => {
      res.end();
    });
  }
}
