import bcrypt from "bcrypt";
import User from "../schema/User.js";
import { generateToken } from "../config/token.js";

const saltRounds = 10;

export const register = async (req, res) => {
  try {
    const { fName, lName, email, password, phoneNumber, options } = req.body;

    const img = req.file;
    const url = img.path;

    const conditionForImage = img ? url : "";
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
      isLoggedIn,
    });

    // Generate token
    const token = generateToken(res, newUser._id, newUser.role);

    // Send user object and token in the response
    res.status(201).json({
      user: newUser,
      token,
    }); // Send both user and token as properties of a single object
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return res.status(502).json({
        message: "No User Found",
      });
    }

    const verifyPass = await bcrypt.compare(password, user.password);
    if (!verifyPass) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    // Update isLoggedIn field
    user.isLoggedIn = true;
    await user.save(); // Save the updated user object

    const token = generateToken(res, user._id, user.role);
    res.status(200).json({
      message: "User logged in successfully",
      user,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    const id = req.user;

    console.log(id)

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update isLoggedIn field
    user.isLoggedIn = false;
    await user.save(); // Save the updated user object

    // Clear the access_token cookie
    res.clearCookie("access_token", {
      httpOnly: true, // Prevent client-side JavaScript access
      secure: true, // Only send over HTTPS connections (if applicable)
    });

    res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    res.status(404).json({ message: "Internal Server Error" });
  }
};
