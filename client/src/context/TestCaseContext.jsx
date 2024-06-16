import axios from "axios";
import { createContext } from "react";
import toast from "react-hot-toast";

export const TestCaseContext = createContext(null);
axios.defaults.baseURL = "http://localhost:3001/api";

export default function TestCaseContextProvider({ children }) {
  const token = localStorage.getItem("access_token");

  const CreateTestCase = async (formData) => {
    try {
      const { data } = await axios.post("/test/create", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(data);
      toast.success("Test Case Created Successfully");
    } catch (error) {
      console.log(error.message);
      toast.success("Internal Server Error");
    }
  };

  const UpdateTestCase = async (id, formData) => {
    try {
      const { data } = await axios.put(`/test/update/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(data);
      toast.success("Test Case Updated Successfully");
    } catch (error) {
      console.log(error.message);
      toast.success("Internal Server Error");
    }
  };

  const value = {
    CreateTestCase,
    UpdateTestCase,
  };
  return (
    <TestCaseContext.Provider value={value}>
      {children}
    </TestCaseContext.Provider>
  );
}
