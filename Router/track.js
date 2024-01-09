import expressAsyncHandler from "express-async-handler";
import { Router } from "express";
//files
import { Track } from "../Controller/track.js";

const router = Router();

router.get(
  "/:trackingNumber",
  expressAsyncHandler(Track.getParcelByTrackingNumber),
);

router.get(
  "/print/:trackingNumber",
  expressAsyncHandler(Track.downloadParcelPDF),
);

export default router;
