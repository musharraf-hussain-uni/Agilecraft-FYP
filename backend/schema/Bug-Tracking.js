import mongoose, { Schema } from "mongoose";

const bugTrackingSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    severity: {
      type: String,
      default: "critical",
      enum: ["critical", "major", "moderate", "low"],
    },
    priority: {
      type: String,
      default: "normal",
      enum: ["high", "medium", "normal", "low"],
    },
    project: {
      type: String,
    },
    status: {
      type: String,
    },
    media: [String],
    reportedBy: {
      type: String,
      required: true,
    },
    assignedTo: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const BugTracking = mongoose.model("BugTracking", bugTrackingSchema);

export default BugTracking;
