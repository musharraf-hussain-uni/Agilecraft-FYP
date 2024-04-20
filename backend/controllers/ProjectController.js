// import Notification from "../Models/notfiy.js";
import Notice from "../schema/Notify.js";
import Project from "../schema/Project.js";
import User from "../schema/User.js";

export const CreateProject = async (req, res) => {
  try {
    const id = req.user;
    const { title, description, date, stage, priority } = req.body;
    const images = req.files;
    const team = req.body.team;

    const lowerCaseStage = stage?.toLowerCase();
    const lowerCasePriority = priority?.toLowerCase();

    let teams = team.map((user) => user);
    const assetPaths = images?.map((file) => file.path);

    let text = "New project has been assigned to you";

    if (team.length > 1) {
      text = text + ` and ${team.length - 1} others`;
    }

    text =
      text +
      ` The Task priority is set a ${priority} priority, so check and act accordingly. The task date is  ${new Date(
        date
      ).toDateString()}. Thank you.`;

    const activity = {
      type: "assigned",
      activity: text,
      by: id,
    };

    const project = await Project.create({
      title,
      description,
      date,
      stage: lowerCaseStage,
      priority: lowerCasePriority,
      assets: images && assetPaths,
      team: teams,
      activities: activity,
    });

    await Notice.create({
      team,
      text,
      project: project._id,
    });

    const populatedProject = await Project.findById(project._id).populate(
      "team",
      "fName email"
    );

    // Update each assigned user to include the project ID
    for (const userId of team) {
      await User.findByIdAndUpdate(userId, {
        $push: { projects: project._id },
      });
    }

    res.status(201).json({
      message: "Project has been created successfully",
      text,
      project: populatedProject, // Send populated project data
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const GetProject = async (req, res) => {
  try {
    const projects = await Project.find().populate(
      "team",
      "fName lName role email"
    );

    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const UpdateProject = async (req, res) => {
  try {
    const { title, description, date, stage, priority } = req.body;
    const assets = req.files;
    const team = req.body.team;

    console.log(req.body);

    const lowerCaseStage = stage?.toLowerCase();
    const lowerCasePriority = priority?.toLowerCase();
    const assetPaths = assets?.map((file) => file.path);

    const updateFields = {};

    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (date) updateFields.date = date;
    if (stage) updateFields.stage = lowerCaseStage;
    if (priority) updateFields.priority = lowerCasePriority;
    if (team) updateFields.team = Array.isArray(team) ? team : team.split(",");
    if (assets) updateFields.assets = assets.length > 0 && assetPaths;

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const populatedProject = await Project.findById(project._id).populate(
      "team",
      "fName email" // Select only specific user fields
    );

    res.status(200).json({
      message: "Project updated successfully",
      project: populatedProject, // Send populated project data
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const DeleteProject = async (req, res) => {
  try {
    const deleteProject = await Project.findByIdAndDelete(req.params.id);

    if (!deleteProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(202).json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const ProjectActivity = async (req, res) => {
  try {
    const userId = req.user;
    const { type, activity } = req.body;

    console.log(type, activity);
    console.log("id", req.params.id);

    const project = await Project.findById(req.params.id);
    const data = {
      type: type.toLowerCase(),
      activity,
      by: userId,
    };
    project.activities.push(data);

    await project.save();
    res.status(202).json({ message: "Activity saved successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const SingleProjectDetails = async (req, res) => {
  try {
    const singleProject = await Project.findById(req.params.id)
      .populate({
        path: "team",
        select: "fName email role",
      })
      .populate({
        path: "activities.by",
        select: "fName lName",
      });

    res.status(202).json(singleProject);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
