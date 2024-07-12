import CodeReviews from "../schema/Code-Review.js";

export const AddCodeReview = async (req, res) => {
  try {
    // Extract request body data (using destructuring)
    const { title, description, project, code, comment, status } = req.body;

    console.log(title, description, project, code, comment, status);
    // Validate required fields
    const requiredFields = ["title", "description", "project", "code"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      res
        .status(400)
        .json(`Please fill the required fields: ${missingFields.join(", ")}`);
      return;
    }

    // Handle unexpected/invalid status values
    if (
      !status ||
      !["open", "approved", "rejected"].includes(status.toLowerCase())
    ) {
      res
        .status(400)
        .json("Invalid status value. Valid options: open, approved, rejected");
      return;
    }

    // Create the code review (using lowercased status for consistency)
    const createCodeReview = await CodeReviews.create({
      title,
      description,
      project,
      code,
      comment,
      status: status.toLowerCase(),
    });

    res.status(201).json(createCodeReview);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json("Internal Server Error"); // Use a generic 500 for unexpected errors
  }
};

export const UpdateCodeReview = async (req, res) => {
  try {
    // Extract code review ID and status from request
    const { id } = req.params;
    const { status } = req.body;

    // Validate input (optional but recommended)
    if (!id || !status) {
      return res.status(400).json("Missing required fields: id and status");
    }

    // Construct update object with proper assignment
    const updateFields = { status };

    // Update the code review using findByIdAndUpdate
    const updatedCodeReview = await CodeReviews.findByIdAndUpdate(
      id,
      updateFields,
      { new: true }
    );

    // Handle not found case gracefully
    if (!updatedCodeReview) {
      return res.status(404).json("Code Review not found");
    }

    // Send successful update response
    return res.status(200).json(updatedCodeReview);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json("Internal Server Error"); // Generic error for client
  }
};

export const DeleteCodeReview = async (req, res) => {
  try {
    const deleteReviews = await CodeReviews.findByIdAndDelete(req.params.id);
    if (!deleteReviews) {
      res.status(404).json("No Code Reviews Founded");
    }
    res.status(200).json(`${req.params.id}-Deleted successfully!.`);
  } catch (error) {
    res.status(404).json({ message: "Internal Server Error" });
  }
};

export const GetCodeReview = async (req, res) => {
  try {
    const allCodeReviews = await CodeReviews.find();

    if (!allCodeReviews) res.status(404).json("No Code Reviews available!");

    res.status(200).json(allCodeReviews);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

export const GetSingleCodeReview = async (req, res) => {
  try {
    const id = req.params.id;

    console.log(id);

    const singleCodeReview = await CodeReviews.findById(id);

    if (!singleCodeReview) res.status(404).json("No Code Review Found!");

    res.status(200).json(singleCodeReview);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};
