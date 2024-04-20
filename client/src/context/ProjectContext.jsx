import { createContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const ProjectContext = createContext(null);
axios.defaults.baseURL = "http://localhost:3001/api"; // Set base URL

export default function ProjectContextProvider({ children }) {
  const token = localStorage.getItem("access_token");

  const AddProject = async (newData) => {
    try {
      console.log("All project added.", newData);
      const { data } = await axios.post("/project/create", newData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (data) {
        toast.success(`New project created successfully`);
      } else {
        throw new Error("No data received in response");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Please try again");
    }
  };

  const UpdateProject = async (id, newData) => {
    try {
      const { data } = await axios.put(`/project/update/${id}`, newData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (data) {
        toast.success(`Project update successfully`);
      } else {
        throw new Error("No data received in response");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Please try again");
    }
  };

  const DeleteProject = async (id) => {
    try {
      const { data } = await axios.delete(`/project/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(`Project deleted succesfully`);
    } catch (error) {
      console.log(error);
      toast.error(`There is an error while deleting project.`);
    }
  };

  const PostActivity = async (newData, id) => {
    try {
      const { data } = await axios.post(`/project/activity/${id}`, newData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      toast.success(`Activity posted`);
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong. Try again", err);
    }
  };

  const value = { AddProject, PostActivity, DeleteProject, UpdateProject };
  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
}
