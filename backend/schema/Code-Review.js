import mongoose from "mongoose";

const CodeReviewSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Enforce mandatory description
      trim: true, // Remove leading/trailing whitespace
    },
    description: {
      type: String,
      required: true, // Enforce mandatory description
      trim: true, // Remove leading/trailing whitespace
    },
    project: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: [true, "Code is required"],
      trim: true,
    },
    comment: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "open",
      required: true,
      enum: ["open", "approved", "rejected"],
    },
  },
  {
    timestamps: true,
  }
);

const CodeReviews = mongoose.model("CodeReviews", CodeReviewSchema);

export default CodeReviews;
