import express from "express";
import {
  CreateProject,
  DeleteProject,
  GetProject,
  ProjectActivity,
  SingleProjectDetails,
  UpdateProject,
} from "../controllers/ProjectController.js";
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

const router = express.Router();

router.get("/", verifyToken, GetProject);

router.post("/create", upload.array("assets"), verifyToken, CreateProject);

router.get("/:id", verifyToken, SingleProjectDetails);

router.put("/update/:id", upload.array("assets"), verifyToken, UpdateProject);

router.post("/activity/:id", verifyToken, ProjectActivity);

router.delete("/delete/:id", verifyToken, DeleteProject);

export default router;
