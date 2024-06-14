import express from "express";
import {
  CreateTest,
  DeleteTest,
  GetAllTest,
  GetTest,
  UpdateTest,
} from "../controllers/TestController.js";
import { verifyToken } from "../config/token.js";

const TestRouter = express.Router();

TestRouter.get("/:id", verifyToken, GetTest);

TestRouter.get("/", GetAllTest);

TestRouter.post("/create", verifyToken, CreateTest);

TestRouter.put("/update/:id", verifyToken, UpdateTest);

TestRouter.delete("/delete/:id", verifyToken, DeleteTest);

export default TestRouter;
