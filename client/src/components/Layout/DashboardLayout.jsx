import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import DashboardHeader from "../Dashboard-header/DashboardHeader";
import { useGetUser } from "../../hooks/get-user";

const DashboardLayout = () => {
  const [isOpen, setOpen] = useState(false);
  const { loading, error } = useGetUser();

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg bg-[#003175]"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg">
          Error fetching user data: {error.message}
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full flex">
      <div className="absolute left-0 top-0">
        <div
          onClick={() => setOpen(!isOpen)}
          className="ml-2 transition-all mt-5 cursor-pointer xl:mt-2 lg:mt-4 fixed z-50"
        >
          {!isOpen && (
            <div className="bg-white p-2 ring-[#003175] ring-2 rounded-lg mt-2">
              <GiHamburgerMenu size={40} className="text-[#003175]" />
            </div>
          )}
        </div>
      </div>
      <div className="flex">
        <div
          className={`${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-y-0 left-0 w-70 bg-[#003175] shadow z-20 transition-transform`}
        >
          <Sidebar setOpen={setOpen} isOpen={open} />
        </div>
      </div>
      <div
        className={`${
          isOpen ? "blur-md" : null
        } transition-all w-full bg-[#F2F4F7] h-full`}
      >
        <div className="px:4 md:px-8 lg:px-12 xl:px-24 xxl:px-36">
          <DashboardHeader />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
