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
    res.status(200).json({ message: "Create test" });
  } catch (error) {
    console.log(error);

    res.status(404).json({ message: "Internal Server Error" });
  }
};

export const UpdateTest = async (req, res) => {
  try {
    const { id } = req.params;

    res.status(200).json({ message: `Update test ${id}` });
  } catch (error) {
    console.log(error);

    res.status(404).json({ message: "Internal Server Error" });
  }
};

export const DeleteTest = async (req, res) => {
  try {
    const { id } = req.params;
    res.status(200).json({ message: `Delete test ${id}` });
  } catch (error) {
    res.status(404).json({ message: "Internal Server Error" });
  }
};
