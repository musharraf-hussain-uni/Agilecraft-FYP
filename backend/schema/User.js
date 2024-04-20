import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    fName: {
      type: String,
    },
    lName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
    },
    img: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    projects: [{ type: mongoose.Types.ObjectId, ref: "Project" }],
  },

  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
