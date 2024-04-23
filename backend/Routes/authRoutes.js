import express from "express";
import { login, logout, register } from "../controllers/AuthController.js";
import multer from "multer";

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Generate unique filename
  },
});
const upload = multer({ storage: storage });

const AuthRouter = express.Router();

AuthRouter.post("/login", login);

AuthRouter.post("/register", upload.single("img"), register);
AuthRouter.post("/logout", logout);

export default AuthRouter;
