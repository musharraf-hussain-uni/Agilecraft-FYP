import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

const NotificationContext = createContext({
  notifications: [],
  addNotification: (notification) => {},
});

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAllNotifications = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/notification/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Replace with your token access logic
        },
      });

      setNotifications(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllNotifications();
  }, []);


  const addNotification = (notification) => {
    setNotifications([...notifications, notification]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        error,
        loading,
        addNotification,
        fetchAllNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext, NotificationProvider };
