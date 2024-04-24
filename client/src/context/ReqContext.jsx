import { createContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = "http://localhost:3001/api";

export const ReqContext = createContext(null);

export default function ReqContextProvider({ children }) {
  const token = localStorage.getItem("access_token");

  const AddRequirement = async (newData) => {
    try {
      const { data } = await axios.post("/req-gathering/add", newData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Requirement added successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const UpdateRequirement = async (updateData, id) => {
    try {
      const { data } = await axios.put(
        `/req-gathering/update/${id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Requrirement document updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("There is an error while deleting requirement");
    }
  };

  const DeleteRequirement = async (id) => {
    try {
      const { data } = await axios.delete(`/req-gathering/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Requrirement document deleted successfully");
    } catch (error) {
      toast.error("There is an error while deleting requirement");
    }
  };
  const value = { AddRequirement, DeleteRequirement, UpdateRequirement };

  return <ReqContext.Provider value={value}>{children}</ReqContext.Provider>;
}
