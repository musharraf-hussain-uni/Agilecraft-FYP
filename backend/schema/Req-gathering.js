import mongoose, { Schema } from "mongoose";

const RequrimentGatheringSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    requirement: {
      type: String,
      required: true,
    },
    project: {
      type: String,
    },
    module: {
      type: String,
    },
    priority: String,
    createdBy: {
      type: String,
      required: true,
    },
    updatedBy: { type: String },
  },
  {
    timestamps: true,
  }
);

const Requirements = mongoose.model("Requirements", RequrimentGatheringSchema);

export default Requirements;
