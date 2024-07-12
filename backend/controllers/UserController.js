import Notice from "../schema/Notify.js";
import User from "../schema/User.js";
import bcrypt from "bcrypt";

export const fetchUser = async (req, res) => {
  try {
    // Extract user ID from the decoded token
    const userId = req.user;

    // Fetch user data from the database
    const user = await User.findById(userId).populate({
      path: "projects",
      match: { team: userId }, // Filter projects where user is in the team
    });
    if (!user) res.status(404).json({ message: "User not found" });

    res.status(201).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const FetchAllUser = async (req, res) => {
  try {
    const role = req.role; // Assuming role is set correctly by middleware

    if (role === "admin" || role === "Project Manager") {
      const users = await User.find()
        .select("-password") // Exclude password field
        .limit(10); // Consider adding a limit for efficiency (optional)
      return res.status(200).json(users);
    } else {
      return res.status(403).json({ error: "Forbidden" });
    }
  } catch (error) {
    console.error("Error fetching all users:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const fetchUserById = async (req, res) => {
  try {
    const userById = await User.findById(req.params.id);
    if (!userById) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(userById);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const FetchUserDashBoard = async (req, res) => {
  try {
    const role = req.role;

    if (role === "admin") {
      const users = await User.find()
        .select("-password")
        .sort({ _id: -1 })
        .limit(10);
      return res.status(200).json(users);
    } else {
      return res.status(403).json({ error: "Forbidden" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const role = req.role;
    if (role === "admin") {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    } else {
      return res.status(403).json({ error: "Forbidden" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const UpdateUser = async (req, res) => {
  try {
    const { fName, lName, email, password, phoneNumber, options } = req.body;

    const img = req.file;

    const updateFields = {};
    if (fName) updateFields.fName = fName;
    if (lName) updateFields.lName = lName;
    if (email) updateFields.email = email;
    if (password) updateFields.password = await bcrypt.hash(password, 10);
    if (phoneNumber) updateFields.phoneNumber = phoneNumber;
    if (options) updateFields.role = options;
    if (img) updateFields.img = img.path;

    const updatedReq = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields }, // Use $set to specify the fields to update
      { new: true } // Return the updated document
    );

    res
      .status(200)
      .json({ message: "Requirements updated successfully", updatedReq });
  } catch (error) {
    res.status(404).json({ message: "Internal Server Error" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    console.log(id, password);

    console.log("User ID: ", id);

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.findByIdAndUpdate(id, { password: hashedPassword });

    console.log("Found User", user);
    if (!user) {
      return res.status(404).json({ message: "No User found!" });
    }

    // Avoid sending password back in response
    const updatedUser = { ...user.toObject() };
    delete updatedUser.password;

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
