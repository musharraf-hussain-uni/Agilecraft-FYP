import React, { useContext, useState } from "react";
import clsx from "clsx";
import { BGS, PRIOTITYSTYLES, TASK_TYPE, formatDate } from "../../utils";
import {
  MdAttachFile,
  MdDelete,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineUpdate,
  MdOutlineAirlineSeatLegroomNormal,
} from "react-icons/md";
import { BiMessageAltDetail } from "react-icons/bi";
import UserInfo from "../UserInfo/UserInfo";
import { useNavigate } from "react-router-dom";
import { GrFormView } from "react-icons/gr";
import { ProjectContext } from "../../context/ProjectContext";
import UpdateProject from "./UpdateProject";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
  normal: <MdOutlineAirlineSeatLegroomNormal />,
};

const Table = ({ tasks, loading }) => {
  const navigate = useNavigate();
  const { DeleteProject } = useContext(ProjectContext);
  const [id, setId] = useState(null);

  const handleDelete = async (id) => {
    try {
      DeleteProject(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (id) => {
    navigate(`/dashboard/projects/${id}`);
  };

  if (loading) {
    return (
      <div className="w-full text-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }
  const TableHeader = () => (
    <thead className="w-full border-b border-gray-300 dark:border-gray-600">
      <tr className="w-full text-black dark:text-white text-left">
        <th className="py-2 text-xs lg:text-base text-center lg:text-left	">
          Id
        </th>
        <th className="py-2 text-xs lg:text-base text-center lg:text-left">
          Project Name
        </th>
        <th className="py-2 text-xs lg:text-base text-center lg:text-left">
          Priority
        </th>
        <th className="py-2 text-xs lg:text-base hidden lg:block text-center lg:text-left">
          Created At
        </th>
        <th className="py-2 text-xs lg:text-base text-center lg:text-left">
          Assets
        </th>
        <th className="py-2 text-xs lg:text-base text-center lg:text-left">
          Team
        </th>
        <th className="py-2 text-xs lg:text-base text-center lg:text-left">
          Actions
        </th>
      </tr>
    </thead>
  );

  const TableRow = ({ task, sno }) => (
    <tr className="border-b space-x-4 border-gray-200 text-gray-600 hover:bg-gray-300/10">
      <td className="py-2">
        <p className="w-full line-clamp-2 text-xs lg:text-base text-white">
          {sno + 1}
        </p>
      </td>
      <td className="py-2">
        <div className="flex items-center gap-2">
          <div
            className={clsx(
              "w-4 h-4 rounded-full opacity-0 md:opacity-100",
              TASK_TYPE[task.stage]
            )}
          />
          <p className="w-full line-clamp-2 text-xs lg:text-base antialiased text-white">
            {task?.title}
          </p>
        </div>
      </td>

      <td className="py-2">
        <div className={"flex gap-1 items-center"}>
          <span className={clsx("text-lg", PRIOTITYSTYLES[task?.priority])}>
            {ICONS[task?.priority]}
          </span>
          <span className="capitalize text-xs lg:text-base antialiased line-clamp-1 text-white">
            {task?.priority}
          </span>
        </div>
      </td>

      <td className="py-2 hidden lg:block">
        <span className="text-sm text-gray-300">
          {formatDate(new Date(task?.date))}
        </span>
      </td>

      <td className="py-2">
        <div className="flex items-center gap-1 md:gap-3">
          <div className="flex gap-1 items-center text-sm text-gray-200">
            <BiMessageAltDetail />
            <span>{task?.activities?.length}</span>
          </div>
          <div className="flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400">
            <MdAttachFile />
            <span>{task?.assets?.length}</span>
          </div>
        </div>
      </td>

      <td className="py-2">
        <div className="flex">
          {task?.team?.map((m, index) => (
            <div
              key={m._id}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                BGS[index % BGS.length]
              )}
            >
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td>
      <td className="flex py-4 items-center gap-0 md:gap-4">
        <div
          className="text-blue-400 sm:px-0 text-xs md:text-base cursor-pointer"
          onClick={() => handleClick(task._id)}
        >
          <GrFormView size={25} />
        </div>
        <div
          className="text-green-400 sm:px-0 text-xs md:text-base cursor-pointer"
          onClick={() => setId(task._id)}
        >
          <MdOutlineUpdate size={20} />
        </div>

        <div
          className="text-red-400 sm:px-0 text-sm md:text-base cursor-pointer"
          onClick={() => handleDelete(task._id)}
        >
          <MdDelete size={20} />
        </div>
      </td>

      {id === task._id && (
        <UpdateProject
          isOpen={id === task._id}
          setIsOpen={setId}
          id={task._id}
        />
      )}
    </tr>
  );

  return (
    <>
      <div className="bg-black px-2 md:px-4 pt-2 pb-6 shadow-md rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <TableHeader />
            <tbody>
              {tasks.map((item, index) => (
                <TableRow key={index} sno={index} task={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Table;
