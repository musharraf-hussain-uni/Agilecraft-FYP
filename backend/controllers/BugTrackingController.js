import BugTracking from "../schema/Bug-Tracking.js";
import User from "../schema/User.js";

export const GetBug = async (req, res) => {
  try {
    const foundBug = await BugTracking.findById(req.params.id).populate(
      "assignedTo",
      "fName lName email"
    );

    if (!foundBug) {
      return res.status(404).json({ message: "No Single Bug found!" });
    }

    res.status(200).json({ message: "Single Bug found!", bug: foundBug });
  } catch (error) {
    res.status(501).json({ message: "Internal Server Error", error });
  }
};

export const GetAllBug = async (req, res) => {
  try {
    const getAllBug = await BugTracking.find().populate(
      "assignedTo",
      "fName lName email"
    );

    if (!getAllBug) res.status(404).json({ message: "No Bugs found!" });

    res.status(200).json({ message: "Bugs found!", getAllBug });
  } catch (error) {
    res.status(501).json({ message: "Internal Server Error", error });
  }
};

export const CreateBug = async (req, res) => {
  try {
    // const id = req.user;
    const {
      title,
      description,
      severity,
      priority,
      status,
      project,
      reportedBy,
      assignedTo,
    } = req.body;

    const media = req.files;

    let teams = assignedTo.map((user) => user);
    const assetPaths = media?.map((file) => file.path);

    const bugCreation = await BugTracking.create({
      title,
      description,
      severity,
      priority,
      project,
      media: media && assetPaths,
      assignedTo: teams,
      status,
      reportedBy,
    });

    // 4. Populate BugTracking (Potential Issue)
    const populateBugTracking = await BugTracking.findById(
      bugCreation._id
    ).populate("assignedTo", "fName lName email"); // Assuming 'BugTracking' is a separate model, this is correct

    // 5. Update Assigned Users (Potential Issue)
    for (const userId of assignedTo) {
      await User.findByIdAndUpdate(userId, {
        $push: { bugTracking: bugCreation._id }, // Update each user's list of assigned bugs
      });
    }

    // 6. Send Response
    res.status(201).json({
      message: "Bug has been created successfully",
      bug: populateBugTracking,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "Internal Server Error", error });
  }
};

export const UpdateBug = async (req, res) => {
  try {
    const { title, description, severity, priority, status, assignedTo } =
      req.body;

    const media = req.files;

    const assetPaths = media?.map((file) => file.path);

    console.log(title, description, severity, priority, status, assignedTo);

    console.log(media);

    const updateFields = {};

    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (project) updateFields.project = project;
    if (severity) updateFields.severity = severity;
    if (status) updateFields.status = status;
    if (priority) updateFields.priority = priority;
    if (assignedTo)
      updateFields.assignedTo = Array.isArray(assignedTo)
        ? assignedTo
        : assignedTo.split(",");
    if (media) updateFields.media = media.length > 0 && assetPaths;

    const updatedTrack = await BugTracking.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    // Send a success response
    res.status(200).json({
      message: "Bug updated successfully",
      bug: updatedTrack,
    });
  } catch (error) {
    res.status(501).json({ message: "Internal Server Error" });
  }
};

export const DeleteBug = async (req, res) => {
  try {
    const deleteBug = await BugTracking.findByIdAndDelete(req.params.id);

    if (!deleteBug) res.status(404).json({ message: "Bug can't be found!" });

    res.status(200).json({ message: "Bug deleted successfully!" });
  } catch (error) {
    res.status(501).json({ message: "Internal Server Error" });
  }
};
