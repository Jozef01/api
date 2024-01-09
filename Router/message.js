import { Router } from "express";
//files
import message from "../Controller/message.js";
import AuthMiddleware from "../Middleware/auth.js";

const router = Router();

router.use(AuthMiddleware);

router.post("/message", message);

export default router;
