import express from "express";
import {
  FetchAllUser,
  GetAllNotification,
  UpdateUser,
  changePassword,
  deleteUser,
  fetchUser,
  fetchUserById,
  FetchUserDashBoard,
  markNotificationRead,
} from "../controllers/UserController.js";
import { verifyToken } from "../config/token.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

const UserRouter = express.Router();

UserRouter.get("/", verifyToken, fetchUser);
UserRouter.get("/:id", verifyToken, fetchUserById);
UserRouter.get("/find/all", verifyToken, FetchAllUser);
UserRouter.get("/find/dashboard", verifyToken, FetchUserDashBoard);
UserRouter.delete("/delete/:id", verifyToken, deleteUser);
UserRouter.put("/update/:id", upload.single("img"), verifyToken, UpdateUser);
UserRouter.put("/change-password/:id", changePassword);
UserRouter.get("/getNotification", verifyToken, GetAllNotification);
UserRouter.get("/read-notification", verifyToken, markNotificationRead);

export default UserRouter;
