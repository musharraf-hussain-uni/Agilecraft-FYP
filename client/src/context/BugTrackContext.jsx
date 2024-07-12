import axios from "axios";
import { createContext } from "react";
import toast from "react-hot-toast";

axios.defaults.baseURL = "http://localhost:3001/api";

export const BugTrackContext = createContext(null);

export default function BugTrackContextProvider({ children }) {
  const CreateBugTrack = async (formData) => {
    try {
      console.log(formData);
      const { data } = await axios.post(`/bug-tracking/create`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      toast.success("Bug Track Created Successfully");
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.success("Internal Server Error");
    }
  };

  const UpdateBugTrack = async (id, formData) => {
    try {
      const { data } = await axios.put(`/bug-tracking/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      toast.success("Bug Track Updated Successfully");
    } catch (error) {
      console.log(error);
      toast.success("Internal Server Error");
    }
  };

  const value = {
    CreateBugTrack,
    UpdateBugTrack,
  };
  return (
    <BugTrackContext.Provider value={value}>
      {children}
    </BugTrackContext.Provider>
  );
}
