import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
//files
import ParcelController from "../Controller/parcel.js";
import { parcelValidator } from "../Utils/validation.js";
import AuthMiddleware from "../Middleware/auth.js";

const router = Router();

router.use(AuthMiddleware);

router.post(
  "/addtrackinginfo",
  expressAsyncHandler(ParcelController.addTrackingInfo),
);
/* USER ONLY */
// Get a list of all parcels
router.get("/list", expressAsyncHandler(ParcelController.getAllParcels));
// Get a specific parcel by ID
router.get("/list/:id", expressAsyncHandler(ParcelController.getParcelById));
//Create a new Parcel
router.post(
  "/create",
  parcelValidator.create,
  expressAsyncHandler(ParcelController.createParcel),
);
//Edit a Parcel by ID
router.patch(
  "/edit/:id",
  parcelValidator.edit,
  expressAsyncHandler(ParcelController.updateParcel),
);
//Delete a parcel by ID
router.delete("/delete", expressAsyncHandler(ParcelController.deleteParcel));

/* ADMIN ONLY*/
router.get(
  "/list/admin",
  expressAsyncHandler(ParcelController.getAllParcelsAdmin),
);
// Get a specific parcel by ID
router.get(
  "/list/admin/:id",
  expressAsyncHandler(ParcelController.getParcelsByUserIdAdmin),
);
//Edit a Parcel by ID
router.patch(
  "/edit/admin/:id",
  parcelValidator.edit,
  expressAsyncHandler(ParcelController.updateParcelAdmin),
);
//Delete a parcel by ID
router.delete(
  "/delete/admin/:id",
  expressAsyncHandler(ParcelController.deleteParcelAdmin),
);

export default router;
