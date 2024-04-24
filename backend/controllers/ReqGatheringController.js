import Requirements from "../schema/Req-gathering.js";

export const GetRequirement = async (req, res) => {
  try {
    const getRequirement = await Requirements.find();
    if (!getRequirement) {
      res.status(502).json("No Requriement Founded");
    }
    res.status(200).json(getRequirement);
  } catch (error) {
    res.status(404).json({ message: "Internal Server Error" });
  }
};

export const GetSingleRequirement = async (req, res) => {
  try {
    const getSingleRequirement = await Requirements.findById(req.params.id);
    if (!getSingleRequirement) {
      res.status(502).json("No Requriement Founded");
    }
    res.status(200).json(getSingleRequirement);
  } catch (error) {
    res.status(404).json({ message: "Internal Server Error" });
  }
};

export const AddRequirement = async (req, res) => {
  try {
    const { title, requirement, module, priority, createdBy, project } =
      req.body;
    if (
      title.length === 0 ||
      requirement.length == 0 ||
      project.length == 0 ||
      module.length == 0 ||
      priority.length == 0 ||
      createdBy.length == 0
    ) {
      res.status(400).json({ message: "Please fill all the fields" });
      return;
    }

    const newRequirement = new Requirements({
      title,
      requirement,
      project,
      module,
      priority,
      createdBy,
    });

    await newRequirement.save();
    res.status(200).json({ message: "Requirements added successfully" });
  } catch (error) {
    res.status(404).json({ message: "Internal Server Error" });
  }
};

export const UpdateRequirement = async (req, res) => {
  try {
    const { title, requirement, project, module, priority, updatedBy } =
      req.body;

    const updateFields = {};
    if (title) updateFields.title = title;
    if (requirement) updateFields.requirement = requirement;
    if (project) updateFields.project = project;
    if (module) updateFields.module = module;
    if (priority) updateFields.priority = priority;
    if (updatedBy) updateFields.updatedBy = updatedBy;

    const updatedReq = await Requirements.findByIdAndUpdate(
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

export const DeleteRequirement = async (req, res) => {
  try {
    const deleteRequirement = await Requirements.findByIdAndDelete(
      req.params.id
    );
    if (!deleteRequirement) {
      res.status(404).json({ message: "No Requirement Founded" });
    }
    res
      .status(200)
      .json({ message: "Requirement deleted successfully", deleteRequirement });
  } catch (error) {
    res.status(404).json({ message: "Internal Server Error" });
  }
};
