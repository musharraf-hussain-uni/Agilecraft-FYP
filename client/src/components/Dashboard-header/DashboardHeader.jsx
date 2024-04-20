import React, { useContext, useState } from "react";
import avatar from "../../assets/avatar.png";
import { useGetUser, useGetUserTask } from "../../hooks/get-user";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { UserContext } from "../../context/UserContext";
import { Link, useLocation } from "react-router-dom";

const DashboardHeader = () => {
  const { user } = useGetUser();
  const [showPass, setShowPass] = useState(true);
  const { ChangePasswordHandler } = useContext(UserContext);
  const [password, setPassword] = useState("");

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

  const userImg =
    user?.img === "" ? avatar : `http://localhost:3001/${user?.img}`;

  return (
    <div className="px-4 pt-24 md:pt-0 md:pl-10 md:px-8 lg:px-7 xl:px-4 xxl:px-8">
      <div className="h-20 bg-[#020205] flex justify-between items-center mb-10 rounded-xl">
        <div className="text-white font-bold hidden md:block  md:text-lg lg:text-xl xl:text-2xl px-4 capitalize">
          {endPath}
        </div>
        <div className="flex gap-2 items-center md:gap-4 ">
          <div className="dropdown md:block dropdown-end">
            <div
              tabIndex={0}
              role="div"
              className="btn btn-ghost btn-xs text-white mt-2 md:ml-0 ml-28"
            >
              <img
                src={userImg}
                alt=""
                className="h-12 w-12 border-2 border-white rounded-full object-cover"
              />
            </div>
            <div
              tabIndex={0}
              className="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-64"
            >
              <h1 className="text-gray-700 px-2 py-1 hidden md:block  md:text-sm mr-2 md:mr-4">
                Email: <span className="underline">{user?.email}</span>
              </h1>
              <p
                className="px-2 py-1 ml-24 md:ml-0 cursor-pointer underline text-gray-700"
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
              >
                Change Password
              </p>

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

          <div className="dropdown relative">
            <div tabIndex={0} role="button" className="btn md:m-1">
              My Projects
            </div>
            <ul className="dropdown-content z-[1] menu p-2 shadow bg-black rounded-box w-40 md:w-52 absolute right-0 top-full">
              {userTask?.map((item, index) => (
                <li className="hover:bg-gray-600" key={index}>
                  <Link
                    to={`/dashboard/projects/${item._id}`}
                    className="text-white"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
