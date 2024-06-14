import mongoose, { Schema } from "mongoose";
const TestSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  module: {
    type: String,
  },
  steps: {
    type: String,
    required: true,
  },
  data: {
    type: String,
  },
  expectedResult: {
    type: String,
  },
  actualResult: {
    type: String,
  },
  createdBy: {
    type: String,
    required: true,
  },
  updatedBy: {
    type: String,
  },
});

const Test = mongoose.model("Test", TestSchema);

export default Test;
