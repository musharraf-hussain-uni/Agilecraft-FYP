import Test from "../schema/Test.js";

export const GetTest = async (req, res) => {
  try {
    const { id } = req.params;
    const test = await Test.findById({ _id: id });
    if (test) {
      res.status(200).json({ message: "Get test", test });
    } else {
      res.status(404).json({ message: "Test not found" });
    }
  } catch (error) {
    console.log(error);

    res.status(404).json({ message: "Internal Server Error" });
  }
};

export const GetAllTest = async (req, res) => {
  try {
    const test = await Test.find();
    res.status(200).json({ message: "Get All test", test });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Internal Server Error" });
  }
};

export const CreateTest = async (req, res) => {
  try {
    const {
      title,
      description,
      module,
      steps,
      data,
      expectedResult,
      actualResult,
      createdBy,
    } = req.body;

    const createTestCase = await Test.create({
      title,
      description,
      module,
      steps,
      data,
      expectedResult,
      actualResult,
      createdBy,
    });

    res.status(200).json({ message: "Create test Case", createTestCase });
  } catch (error) {
    console.log(error);

    res.status(404).json({ message: "Internal Server Error" });
  }
};

export const UpdateTest = async (req, res) => {
  try {
    const { id } = req.params;

    const updateFields = {};

    const {
      title,
      description,
      module,
      steps,
      data,
      expectedResult,
      actualResult,
      updatedBy,
    } = req.body;

    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (module) updateFields.module = module;
    if (steps) updateFields.steps = steps;
    if (data) updateFields.data = data;
    if (expectedResult) updateFields.expectedResult = expectedResult;
    if (actualResult) updateFields.actualResult = actualResult;
    if (updatedBy) updateFields.updatedBy = updatedBy;

    const updatedTestCase = await Test.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    res.status(200).json({ message: `Update test ${id}`, updatedTestCase });
  } catch (error) {
    console.log(error);

    res.status(404).json({ message: "Internal Server Error" });
  }
};

export const DeleteTest = async (req, res) => {
  try {
    const deleteTest = await Test.findByIdAndDelete(req.params.id);
    if (!deleteTest) {
      res.status(404).json({ message: "Test case can't be deleted!" });
    }

    res.status(200).json({ message: "Test Case deleted successfully" });
    res.status(200).json({ message: `Delete test ${id}` });
  } catch (error) {
    res.status(404).json({ message: "Internal Server Error" });
  }
};


