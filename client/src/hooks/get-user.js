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

      setUser(data);
      setLoading(false);
    } catch (error) {
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
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAllUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/users/find/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data); // Assuming data is within the response object
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false); // Set loading to false after all operations are complete
    }
  };

  // http://localhost:3001/api/users/all (commented out for brevity)

  useEffect(() => {
    fetchAllUser();
  }, []);

  const mutate = () => {
    fetchAllUser();
  };

  return { data, error, loading, mutate };
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

  const mutate = () => {
    fetchUserTask();
  };

  return { userTask, error, loading, setUserTask, mutate };
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
        console.log(data);
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

export const GetUserNotification = () => {
  const [notifications, setNotification] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAllNotifications = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/notification/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("fetchAllNotifications", data);

      setNotification(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllNotifications();
  }, []);

  const mutate = () => {
    fetchAllNotifications();
  };

  return { notifications, error, loading, mutate };
};

// export const MarkNotificationAsRead = (id) => {
// const
// }
