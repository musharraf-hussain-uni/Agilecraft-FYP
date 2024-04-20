import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const UserContext = createContext(null);
axios.defaults.url = "http://localhost/api";

export default function UserContextProvider({ children }) {
  const token = localStorage.getItem("access_token");
  const ChangePasswordHandler = async (id, password) => {
    try {
      const { data } = await axios.put(`/users/change-password/${id}`, {
        password,
      });

      toast.success("Password Changed Successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error while changing the password");
    }
  };

  const UpdateUser = async (id, data) => {
    try {
      const { data: response } = await axios.put(`/users/update/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("User Updated Successfully");
      console.log("Update successfully:", response); // Log the response for debugging
    } catch (error) {
      console.error("Error updating user:", error.response); // Log the error response for debugging
      toast.error(
        error.response?.data?.message || "Something Went Wrong. Try again"
      );
    }
  };

  const value = {
    ChangePasswordHandler,
    UpdateUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
