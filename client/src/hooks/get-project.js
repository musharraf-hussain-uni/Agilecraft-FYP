import { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/api"; // Set base URL
const token = localStorage.getItem("access_token");

export const useGetAllProject = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/project/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      // console.log("All Projects Fetched", data);
      setProjects(data);
    } catch (error) {
      // console.error("Error fetching projects:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const mutate = () => {
    fetchProjects();
  };

  return { projects, error, loading, mutate };
};

export const useGetSingleProject = (id) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProject = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/project/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(data);
    } catch (error) {
      console.error("Error fetching project:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  const mutate = () => {
    fetchProject();
  };

  return { data, error, loading, mutate };
};
