import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { TaskType } from "../../data/data";
import AllProjects from "./AllProjects";
import CreateProject from "../../components/Projects/CreateProject";

const UserPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  //   const { users, loading, error, setUsers } = useGetAllUser();

  //   console.log(users);

  //   if (loading) {
  //     return <div>Loading...</div>;
  //   }

  //   if (error) {
  //     return <div>Error...</div>;
  //   }

  return (
    <div className="mb-8 px-4 md:px-20 lg:px-20 xl:px-24 xxl:px-48 md:mt-0">
      <div className="flex justify-center items-center rounded-md">
        <div className="mr-4 md:mr-6">
          <div className=" bg-slate-900 grid place-content-center">
            <button
              onClick={() => setIsOpen(true)}
              className="flex gap-4 rounded-md items-center bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium px-4 py-2 hover:opacity-90 transition-opacity"
            >
              <IoMdAdd size={20} /> Create Project
            </button>
          </div>
          <CreateProject isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>

      {/* All Task Type Fields*/}
      <div className="flex justify-center items-center gap-10 mt-10">
        {TaskType.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-[1px] md:gap-4 py-2 px-4 bg-white border-black border-2  md:py-4 md:px-8 rounded-lg"
          >
            <div
              className={`w-2 h-2 md:w-4 md:h-4 ${item.color} rounded-xl`}
            ></div>
            <p className="text-sm">{item.name}</p>
          </div>
        ))}
      </div>

      {/* All Task Fields*/}

      <div className="my-10">
        <AllProjects />
      </div>
    </div>
  );
};

export default UserPage;
