import express from "express";
import {
  CreateTest,
  DeleteTest,
  GetAllTest,
  GetTest,
  UpdateTest,
} from "../controllers/TestController.js";

const TestRouter = express.Router();

TestRouter.get("/get/:id", GetTest);

TestRouter.get("/", GetAllTest);

TestRouter.post("/create", CreateTest);

TestRouter.put("/update/:id", UpdateTest);

TestRouter.delete("/delete/:id", DeleteTest);

export default TestRouter;
