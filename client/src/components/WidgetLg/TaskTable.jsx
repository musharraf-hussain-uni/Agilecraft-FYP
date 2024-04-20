import {
  MdDelete,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineUpdate,
} from "react-icons/md";
import { PRIOTITYSTYLES, TASK_TYPE } from "../../utils/index";
import clsx from "clsx";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { GrFormView } from "react-icons/gr";

export default function TaskTable({ tasks, loading }) {
  const navigate = useNavigate();
  const handleUpdate = (id) => {
    console.log(id);
  };

  const handleClick = (id) => {
    navigate(`/dashboard/projects/${id}`);
  };

  const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };

  if (loading) {
    return (
      <div className="w-full text-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  const TableHeader = () => (
    <thead className="border-b border-gray-300 ">
      <tr className="text-black text-left">
        <th className="py-2">Task Title</th>
        <th className="py-2">Priority</th>
        <th className="py-2 hidden md:table-cell">Created At</th>
        <th className="py-2">Actions</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className="border-b border-gray-300 text-gray-600 hover:bg-gray-300/10">
      <td className="py-2">
        <div className="flex items-center gap-2">
          <div
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
          />
          <p className="text-base text-black">{task.title}</p>
        </div>
      </td>

      <td className="py-2">
        <div className="flex gap-1 items-center">
          <span className={clsx("text-lg", PRIOTITYSTYLES[task.priority])}>
            {ICONS[task.priority]}
          </span>
          <span className="capitalize">{task.priority}</span>
        </div>
      </td>

      <td className="py-2 hidden md:table-cell">
        <span className="text-base text-gray-600">
          {moment(task?.date).fromNow()}
        </span>
      </td>

      <td className="flex py-4 items-center gap-2 md:gap-4">
        <div
          className="text-blue-400 sm:px-0 text-sm md:text-base cursor-pointer"
          onClick={() => handleClick(task._id)}
        >
          <GrFormView size={25} />
        </div>
        <div
          className="text-green-400 sm:px-0 text-sm md:text-base cursor-pointer"
          onClick={() => handleUpdate(task._id)}
        >
          <MdOutlineUpdate size={20} />
        </div>
      </td>
    </tr>
  );

  return (
    <div className="w-full md:w-2/3 bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded">
      <table className="w-full">
        <TableHeader />
        <tbody>
          {/* Check for tasks length before mapping */}
          {tasks?.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-14  ">
                No Data found.
              </td>
            </tr>
          )}
          {tasks?.map((task, id) => (
            <TableRow key={id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
