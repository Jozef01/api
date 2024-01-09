import { Schema, model } from "mongoose";
// import expressAsyncHandler from "express-async-handler";
// import bcryptjs from "bcryptjs";

const authSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "user", // 'user' or 'admin'
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

// authSchema.pre(
//   "save",
//   expressAsyncHandler(async function (next) {
//     const user = this;
//     console.log(this);
//     //hash password
//     const salt = await bcryptjs.genSalt(10);
//     const hashPassword = await bcryptjs.hash(user.password, salt);
//     //save
//     user.password = hashPassword;
//     next();
//   }),
// );

const authModel = model.users || model("User", authSchema);
export default authModel;
