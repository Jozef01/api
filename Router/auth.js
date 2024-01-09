import { Router } from "express";
//files
import { authValidator } from "../Utils/validation.js";
import AuthMiddleware from "../Middleware/auth.js";
import AuthController from "../Controller/auth.js";
import expressAsyncHandler from "express-async-handler";

const router = Router();

// Get a list of all users (admin only)
router.get(
  "/users",
  AuthMiddleware,
  expressAsyncHandler(AuthController.getAllUsers),
);
// Get a specific user by ID (admin only)
router.get(
  "/users/:id",
  AuthMiddleware,
  expressAsyncHandler(AuthController.getUserById),
);
// Create a new user (admin only)
router.post(
  "/users",
  AuthMiddleware,
  authValidator.registerValidation,
  expressAsyncHandler(AuthController.createUser),
);
// Authenticate and generate a JWT token
router.post(
  "/login",
  authValidator.loginValidation,
  expressAsyncHandler(AuthController.loginUser),
);
// Edit a user by ID (admin only)
router.patch(
  "/users/:id",
  AuthMiddleware,
  authValidator.editValidation,
  expressAsyncHandler(AuthController.editUser),
);
// Delete a user by ID (admin only)
router.delete(
  "/users/:id",
  AuthMiddleware,
  expressAsyncHandler(AuthController.deleteUser),
);
// Logout and clear the JWT cookie
router.post(
  "/logout",
  // AuthMiddleware,
  expressAsyncHandler(AuthController.logoutUser),
);

export default router;
