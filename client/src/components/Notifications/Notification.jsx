import React, { useState, useEffect, useContext } from "react";
import { GetUserNotification } from "../../hooks/get-user";
import { IoIosNotifications } from "react-icons/io";
import { CiRead } from "react-icons/ci";
import axios from "axios";
import { NotificationContext } from "../../context/Notification-Context";
import { IoIosRefresh } from "react-icons/io";

// const token = localStorage.getItem("access_token");

export default function Notification() {
  // const { notifications, loading, error, mutate } = GetUserNotification();

  const {
    notifications,
    loading,
    // error,
    fetchAllNotifications: mutate,
  } = useContext(NotificationContext);

  // console.log(notifications);

  const markNotificationAsRead = async (notificationId) => {
    try {
      const { data } = await axios.post(
        "notification/read-notification",
        { id: notificationId },
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },

          // body: {, // Specify notification ID
        }
      );
      mutate();

      console.log(data);
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      const { data } = await axios.post(
        "/notification/read-notification",
        { isReadType: "all" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          // Specify marking all notifications
        }
      );

      mutate();
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  const [isOpen, setIsOpen] = useState(false); // State to track dropdown visibility
  const toggleDropdown = () => setIsOpen(!isOpen); // Function to toggle dropdown

  return (
    <div className="relative">
      <div
        className="focus:outline-none cursor-pointer p-2 bg-[#003175] text-gray-100 rounded-md"
        onClick={toggleDropdown}
      >
        {/* Notification icon (replace with your icon component) */}
        <IoIosNotifications size={24} />
      </div>
      <div className="absolute w-4 h-4 bg-red-500 rounded-full top-8 right-0 text-center">
        <h1 className="text-xs text-white font-bold">{notifications.length}</h1>
      </div>

      {isOpen && (
        <ul
          className={`absolute right-0 top-full mt-2 w-96 origin-top-right rounded-md shadow-lg z-50 transition duration-150 ease-in-out overflow-y-auto bg-slate-100`} // Close dropdown on click inside
        >
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-800 m-4">
              Notifications
            </h1>

            <div className="flex items-center gap-2">
              <div
                className="bg-blue-500 px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 justify-center"
                onClick={() => mutate()}
              >
                <IoIosRefresh size={16} className="text-white font-bold" />
                <span className="text-white text-xs font-bold">Refresh</span>
              </div>
              <div
                onClick={handleMarkAllRead}
                className="bg-blue-500 text-white p-2 text-sm rounded-lg cursor-pointer hover:bg-blue-600 mr-4"
              >
                <span className="text-xs font-bold">Mark All Read</span>
              </div>
            </div>
          </div>

          <hr />
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <li
                key={notification._id}
                className={`flex justify-between items-center p-4 hover:bg-gray-300 transition-colors duration-150`}
              >
                <span className="text-gray-700 text-sm">
                  {notification.text}
                </span>
                <div
                  className="text-red-500 hover:text-red-700 focus:outline-none cursor-pointer"
                  onClick={() => markNotificationAsRead(notification._id)}
                >
                  <CiRead size={24} />
                </div>
              </li>
            ))
          ) : loading ? (
            <div className="w-full flex justify-center items-center text-[#003175]">
              <span className="loading loading-spinner loading-md"></span>
            </div>
          ) : (
            <li className="p-4 text-center text-gray-500">
              No new notifications
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
