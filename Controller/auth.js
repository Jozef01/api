import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
//files
import keys from "../Config/keys.js";
import authModel from "../Model/auth.js";

export default class AuthController {
  static async createUser(req, res) {
    if (req.user.role !== "admin") {
      res.status(403);
      throw new Error("Unauthorized - Only admin users can create new user");
    }

    const { username, email, password } = req.body;

    const existingUser = await authModel.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      res.status(400);
      throw new Error("Username or email is already in use");
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const savedUser = await authModel.create({
      username,
      email,
      password: hashPassword,
    });

    res
      .status(201)
      .json({ success: true, message: "New user created ✔️", savedUser });
  }

  // Controller to edit a user by ID (admin only)
  static async editUser(req, res) {
    if (req.user.role !== "admin") {
      res.status(403);
      throw new Error(
        "Unauthorized - Only admin users can create view all user",
      );
    }
    const { username, email, password } = req.body;
    const userId = req.params.id;

    const existingUser = await authModel.findById(userId);
    if (!existingUser) {
      res.status(404);
      throw new Error("User not found");
    }

    existingUser.username = username;
    existingUser.email = email;

    if (password) {
      const salt = await bcryptjs.genSalt(10);
      existingUser.password = await bcryptjs.hash(password, salt);
    }

    const updatedUser = await existingUser.save();
    res.json(updatedUser);
  }

  // Controller to delete a user by ID (admin only)
  static async deleteUser(req, res) {
    if (req.user.role !== "admin") {
      res.status(403);
      throw new Error(
        "Unauthorized - Only admin users can create view all user",
      );
    }

    const userId = req.params.id;

    const check = await authModel.findByIdAndDelete(userId);
    if (!check) {
      res.status(402);
      throw new Error("Can't delete user");
    }

    res.json({ success: true, message: "User deleted successfully" });
  }

  // Controller to get a list of all users (admin only)
  static async getAllUsers(req, res) {
    if (req.user.role !== "admin") {
      res.status(403);
      throw new Error(
        "Unauthorized - Only admin users can create view all user",
      );
    }
    const users = await authModel.find();
    res.status(200).json({ success: true, users });
  }

  // Controller to get a specific user by ID (admin only)
  static async getUserById(req, res) {
    const userId = req.params.id;

    const user = await authModel.findById(userId);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.json({ success: true, user });
  }

  // Controller to authenticate and generate a JWT token
  static async loginUser(req, res) {
    const { value, password } = req.body;

    const user = await authModel.findOne({
      $or: [{ username: value }, { email: value }],
    });

    if (!user || !(await bcryptjs.compare(password, user.password))) {
      res.status(401);
      throw new Error("Invalid Credentials");
    }

    const payload = {
      userId: user._id,
      username: user.username,
      role: user.role,
    };

    const token = `Bearer ${jwt.sign(payload, keys.jwt.secret, {
      expiresIn: keys.jwt.tokenLife,
    })}`;

    // res.cookie("jwt", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "proudction",
    //   sameSite: "strict",
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    // });

    res.json({ success: true, message: "Login successful", token });
  }

  static async logoutUser(req, res) {
    res.clearCookie("jwt");
    res.json({ success: true, message: "Logout successful" });
  }
}
