import express from "express";
import tokenMiddleware from "../middlewares/tokenMiddleware.js";
import chatController from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/", tokenMiddleware.tokenAuth, chatController.chatCompletion);

export default router;
