import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = "http://localhost:3001/api"; // Set base URL
const token = localStorage.getItem("access_token");

export const useGetUser = () => {
  const [user, setUser] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("Fetched user data:", data); // Log fetched data
      setUser(data);
      setLoading(false);
    } catch (error) {
      // console.error("Error fetching user:", error); // Log error details
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, error, loading };
};

export const useGetAllUser = () => {
  const [allUsers, setAllUsers] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAllUser = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/users/find/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("fetchAllUser", data);

      setAllUsers(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  // http://localhost:3001/api/users/all

  useEffect(() => {
    fetchAllUser();
  }, []);

  return { allUsers, error, loading, setAllUsers };
};

export const useGetAllUserDash = () => {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashUser = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/users/find/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchDashUser();
  }, []);

  return { users, error, loading };
};

export const useGetUserTask = () => {
  const [userTask, setUserTask] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserTask = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserTask(data.projects);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserTask();
  }, []);

  return { userTask, error, loading, setUserTask };
};

export const useGetUserById = (id) => {
  const [singleUser, setSingleUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSingleUser = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSingleUser(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
        setLoading(false);
      }
    };

    fetchSingleUser();
  }, [id]);

  return { singleUser, error, loading };
};
