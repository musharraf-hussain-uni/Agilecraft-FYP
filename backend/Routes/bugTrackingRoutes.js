import express from "express";

import {
  CreateBug,
  DeleteBug,
  GetAllBug,
  GetBug,
  UpdateBug,
} from "../controllers/BugTrackingController.js";
import { verifyToken } from "../config/token.js";

const BugRouter = express.Router();

BugRouter.get("/:id", verifyToken, GetBug);

BugRouter.get("/", verifyToken, GetAllBug);

BugRouter.post("/create", verifyToken, CreateBug);

BugRouter.put("/update/:id", verifyToken, UpdateBug);

BugRouter.delete("/delete/:id", verifyToken, DeleteBug);

export default BugRouter;
