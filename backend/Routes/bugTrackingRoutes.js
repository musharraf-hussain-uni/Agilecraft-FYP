import express from "express";

import {
  CreateBug,
  DeleteBug,
  GetAllBug,
  GetBug,
  UpdateBug,
} from "../controllers/BugTrackingController.js";
import { verifyToken } from "../config/token.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Generate unique filename
  },
});

const upload = multer({ storage: storage });

const BugRouter = express.Router();

BugRouter.get("/:id", verifyToken, GetBug);

BugRouter.get("/", verifyToken, GetAllBug);

BugRouter.post("/create", upload.array("media"), verifyToken, CreateBug);

BugRouter.put("/update/:id", upload.array("media"), verifyToken, UpdateBug);

BugRouter.delete("/delete/:id", verifyToken, DeleteBug);

export default BugRouter;
