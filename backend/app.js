import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import AuthRouter from "./Routes/authRoutes.js";
import UserRouter from "./Routes/userRoutes.js";
import RequirementRoutes from "./Routes/reqGatheringRoutes.js";
import ProjectRoutes from "./Routes/projectRoutes.js";
import TestRouter from "./Routes/testRoutes.js";
import BugRouter from "./Routes/bugTrackingRoutes.js";
import CodeReviewRouter from "./Routes/codeReviewRoute.js";
import NotificationRouter from "./Routes/notifcationRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", AuthRouter);
app.use("/api/users", UserRouter);
app.use("/api/req-gathering", RequirementRoutes);
app.use("/api/project", ProjectRoutes);
app.use("/api/test", TestRouter);
app.use("/api/bug-tracking", BugRouter);
app.use("/api/code-reviews", CodeReviewRouter);
app.use("/api/notification", NotificationRouter);

// Server
const PORT = 3001 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
