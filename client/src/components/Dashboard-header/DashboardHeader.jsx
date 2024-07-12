import React, { useContext, useState } from "react";
import avatar from "../../assets/avatar.png";
import { useGetUser, useGetUserTask } from "../../hooks/get-user";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { UserContext } from "../../context/UserContext";
import { Link, useLocation } from "react-router-dom";
import Notification from "../Notifications/Notification";
import { IoMdArrowDropdown } from "react-icons/io";
import { AuthContext } from "../../context/AuthContext";
import { NotificationContext } from "../../context/Notification-Context";

const DashboardHeader = () => {
  const { user, loading } = useGetUser();
  const [showPass, setShowPass] = useState(true);
  const { ChangePasswordHandler } = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [drop, setDrop] = useState(false);

  const { loading: Loading } = useContext(NotificationContext);

  const { userTask } = useGetUserTask();

  const { pathname } = useLocation();
  // Split the pathname by '/' and filter out any empty strings
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  // Extract the last segment of the path
  const endPath = pathSegments[pathSegments.length - 1];

  const handlePass = (e) => {
    e.preventDefault();

    ChangePasswordHandler(user._id, password);

    setPassword("");
    // Close the modal after submitting the password
    const modal = document.getElementById("my_modal_3");
    modal.close();
  };

  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
  };

  const userImg =
    user?.img === "" ? avatar : `http://localhost:3001/${user?.img}`;

  // if (loading) {
  //   return (
  //     <div className="w-full h-40 flex justify-center items-center">
  //       <span className="loading loading-spinner loading-lg"></span>
  //     </div>
  //   );
  // }

  return (
    <div className="px-4 pt-24 md:pt-0 md:pl-10 md:px-8 lg:px-7 xl:px-4 xxl:px-8">
      <div className="h-20 bg-white shadow-xl flex justify-between items-center mb-10 rounded-xl">
        <div className="text-[#003175] font-bold hidden md:block  md:text-lg lg:text-xl xl:text-2xl px-4 capitalize">
          {endPath}
        </div>
        <div className="flex gap-4 items-center md:gap-0 ">
          <div className="flex flex-col gap-0 justify-center items-center">
            <h1 className="text-[#003175] hidden md:block md:text-lg mr-2 md:mr-4">
              Hello,{" "}
              <span className="text-lg capitalize text-[#003175]">
                {loading ? (
                  <div className="loading loading-spinner loading-xs"></div>
                ) : (
                  user?.fName + " " + user?.lName
                )}
              </span>
            </h1>
            <p className="font-normal hidden md:block capitalize text-[#003175]">
              {loading ? (
                <div className="loading loading-spinner loading-xs"></div>
              ) : (
                user?.role
              )}
            </p>
          </div>

          <div className="flex items-center justify-center">
            <div>
              <img
                src={userImg}
                alt=""
                className="h-12 w-12 border-2 border-[#003175] rounded-full object-cover"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="dropdown md:block dropdown-end rounded-xl">
                <div
                  tabIndex={0}
                  role="div"
                  className="btn btn-ghost btn-xs text-[#003175] mt-2 md:ml-0 ml-28"
                >
                  <IoMdArrowDropdown className="text-[#003175]" size={24} />
                </div>

                <div
                  tabIndex={0}
                  className="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-64"
                >
                  <p
                    className="p-2 ml-24 md:ml-0 cursor-pointer text-base text-[#003175]"
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    Change Password
                  </p>
                  <p
                    className="p-2 ml-24 border-gray-600 md:ml-0 cursor-pointer text-base text-[#003175]"
                    onClick={handleLogout}
                  >
                    Logout
                  </p>

                  <div
                    className="p-2 ml-24 border-gray-600 md:ml-0 cursor-pointer text-base text-[#003175]"
                    onClick={() => setDrop(!drop)}
                  >
                    My Projects
                  </div>
                  {drop && (
                    <ul className="z-[1] menu p-2 shadow bg-slate-100 rounded-box w-40 md:w-52 absolute right-0 top-full">
                      {userTask?.map((item, index) => (
                        <li className="hover:bg-gray-300" key={index}>
                          <Link
                            to={`/dashboard/projects/${item._id}`}
                            className="text-[#003175]"
                          >
                            {item?.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}

                  <dialog
                    id="my_modal_3"
                    className="modal modal-bottom sm:modal-middle"
                  >
                    <div className="modal-box">
                      <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                      </form>
                      <h1 className="mb-4">Change your password</h1>
                      <div className="flex relative">
                        <input
                          type={showPass ? "password" : "text"}
                          placeholder="New Password"
                          className="input input-bordered w-full max-w-md"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                        />
                        <span
                          className="absolute right-6 top-3"
                          onClick={() => setShowPass(!showPass)}
                        >
                          {showPass ? <FaEye /> : <FaEyeSlash />}
                        </span>
                      </div>
                      <div className="modal-action">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button
                            className="btn text-white bg-black"
                            onClick={handlePass}
                          >
                            Change Password
                          </button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </div>
              </div>
              <div className="mx-2">
                <Notification />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
