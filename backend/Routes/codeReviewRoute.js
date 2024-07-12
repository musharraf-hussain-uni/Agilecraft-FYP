import express from "express";
import {
  AddCodeReview,
  DeleteCodeReview,
  GetCodeReview,
  GetSingleCodeReview,
  UpdateCodeReview,
} from "../controllers/CodeReviewControllers.js";
import { verifyToken } from "../config/token.js";

const router = express.Router();

router.get("/", GetCodeReview);
router.get("/:id", verifyToken, GetSingleCodeReview);

router.post("/add", AddCodeReview);
router.put("/update/:id", UpdateCodeReview);
router.delete("/delete/:id", DeleteCodeReview);

export default router;
