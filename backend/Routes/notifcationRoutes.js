import express from "express";
import { verifyToken } from "../config/token.js";
import {
  GetAllNotification,
  markNotificationRead,
} from "../controllers/NotificationController.js";
const router = express.Router();

router.get("/", verifyToken, GetAllNotification);
router.post("/read-notification", verifyToken, markNotificationRead);

export default router;
