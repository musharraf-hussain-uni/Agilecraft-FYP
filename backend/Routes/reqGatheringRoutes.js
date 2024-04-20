import express from "express";
import {
  AddRequirement,
  DeleteRequirement,
  GetRequirement,
  GetSingleRequirement,
  UpdateRequirement,
} from "../controllers/ReqGatheringController.js";
import { verifyToken } from "../config/token.js";

const router = express.Router();

router.get("/", verifyToken, GetRequirement);

router.get("/:id", verifyToken, GetSingleRequirement);

router.post("/add", verifyToken, AddRequirement);

router.put("/update/:id", UpdateRequirement);

router.delete("/delete/:id", verifyToken, DeleteRequirement);

export default router;
