import bcrypt from "bcrypt";
import User from "../schema/User.js";
import {
  generateToken
} from "../config/token.js";

const saltRounds = 10;

export const register = async (req, res) => {
  try {
    const {
      fName,
      lName,
      email,
      password,
      phoneNumber,
      options
    } = req.body;
    const img = req.file;
    const url = img.path;
    const conditionForImage = img !== "undefined" ? url : "";
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = await User.create({
      fName,
      lName,
      email,
      password: hashedPassword,
      phoneNumber,
      role: options,
      img: conditionForImage,
    });

    // Generate token
    const token = generateToken(res, newUser._id, newUser.role);

    // Send user object and token in the response
    res.status(201).json({
      user: newUser,
      token
    }); // Send both user and token as properties of a single object
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      res.status(502).json({
        message: "No User Found"
      });
    }

    if (user) {
      const verifyPass = await bcrypt.compare(password, user.password);
      if (verifyPass) {
        const token = generateToken(res, user._id, user.role);
        res.status(200).json({
          message: "User logged in successfully",
          user,
          token,
        });
      } else {
        res.status(401).json({
          message: "Invalid Password"
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};