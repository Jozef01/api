import authModel from "../Model/auth.js";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
//files
import keys from "../Config/keys.js";

const AuthMiddleware = expressAsyncHandler(async (req, res, next) => {
  // const getTokenFromCookie = req.cookies.jwt;

  const getTokenFromCookie = req.headers.authorization;

  if (!getTokenFromCookie) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  const token = getTokenFromCookie.split(" ")[1];

  await jwt.verify(token, keys.jwt.secret, async (err, decoded) => {
    if (err) {
      res.status(403);
      throw new Error("Forbidden");
    }
    const user = await authModel.findById(decoded.userId);

    if (!user) {
      res.status(401);
      throw new Error("Unauthorized user");
    }
    req.user = user;
    next();
  });
});

export default AuthMiddleware;
