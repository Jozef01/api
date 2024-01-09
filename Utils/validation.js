import expressAsyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";

const asynchandler = expressAsyncHandler((req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
});

export const authValidator = {
  registerValidation: [
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isAlphanumeric()
      .withMessage("Username must be alphanumeric")
      .escape(),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format")
      .trim()
      .escape(),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")
      .escape(),
    asynchandler,
  ],

  editValidation: [
    body("username"),
    // .trim()
    // .notEmpty()
    // .withMessage("Username is required")
    // .isAlphanumeric()
    // .withMessage("Username must be alphanumeric")
    // .optional()
    // .escape(),
    body("email"),
    // .notEmpty()
    // .withMessage("Email is required")
    // .isEmail()
    // .withMessage("Invalid email format")
    // .trim()
    // .optional()
    // .escape(),
    body("password"),
    // .notEmpty()
    // .withMessage("Password is required")
    // .isLength({ min: 6 })
    // .withMessage("Password must be at least 6 characters")
    // .optional()
    // .escape(),
    asynchandler,
  ],

  loginValidation: [
    body("input").notEmpty().escape(),
    body("password").escape(),
  ],
};

export const parcelValidator = {
  create: [
    // body("trackingNumber")
    //   .notEmpty()
    //   .withMessage("Tracking number is required"),
    body("sender.name").notEmpty().withMessage("Sender name is required"),
    body("sender.address").notEmpty().withMessage("Sender address is required"),
    body("sender.phone").notEmpty().withMessage("Sender phone is required"),
    body("sender.email")
      .notEmpty()
      .withMessage("Sender email is required")
      .isEmail()
      .withMessage("Invalid email format"),
    body("recipient.name").notEmpty().withMessage("Recipient name is required"),
    body("recipient.address")
      .notEmpty()
      .withMessage("Recipient address is required"),
    body("recipient.phone")
      .notEmpty()
      .withMessage("Recipient phone is required"),
    body("recipient.email")
      .notEmpty()
      .withMessage("Recipient email is required")
      .isEmail()
      .withMessage("Invalid email format"),
    asynchandler,
  ],

  edit: [
    body("trackingNumber")
      .notEmpty()
      .withMessage("Tracking number is required"),
    body("sender.name").notEmpty().withMessage("Sender name is required"),
    body("sender.address").notEmpty().withMessage("Sender address is required"),
    body("sender.phone").notEmpty().withMessage("Sender phone is required"),
    body("sender.email")
      .notEmpty()
      .withMessage("Sender email is required")
      .isEmail()
      .withMessage("Invalid email format"),
    body("recipient.name").notEmpty().withMessage("Recipient name is required"),
    body("recipient.address")
      .notEmpty()
      .withMessage("Recipient address is required"),
    body("recipient.phone")
      .notEmpty()
      .withMessage("Recipient phone is required"),
    body("recipient.email")
      .notEmpty()
      .withMessage("Recipient email is required")
      .isEmail()
      .withMessage("Invalid email format"),
    asynchandler,
  ],
};
