import React, { useContext, useState } from "react";
import { MdOutlineUpdate, MdDelete } from "react-icons/md";
import { GrFormView } from "react-icons/gr";
import { getInitials } from "../../utils";
import Pagination from "../Pagination/Pagination";
import UpdateRequirement from "./Update-Requirement";
import ViewRequirement from "./View-Requirement";
import { useGetAllRequirement } from "../../hooks/get-req";
import { ReqContext } from "../../context/ReqContext";

const ITEMS_PER_PAGE = 4;

const RequirementGatheringTable = ({ project }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [id, setId] = useState(null);
  const [viewId, setViewId] = useState(null);

  const { requirements } = useGetAllRequirement();
  const { DeleteRequirement } = useContext(ReqContext);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = requirements.slice(indexOfFirstItem, indexOfLastItem);

  const filteredProject = project
    ? requirements.filter((item) => item.project === project)
    : currentItems;

  const totalPages = Math.ceil(requirements.length / ITEMS_PER_PAGE);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (id) => {
    try {
      await DeleteRequirement(id);
    } catch (error) {
      console.log(error);
    }
  };

  const TableHeader = () => (
    <thead className="border-b bg-slate-800 border-gray-300">
      <tr className="text-white text-left">
        <th className="p-2 w-[5%]">S.NO</th>
        <th className="p-2 w-1/3">Title</th>
        <th className="p-2 w-1/3">Requirements</th>
        <th className="p-2 w-1/6">Created By</th>
        <th className="p-2 w-1/3">Updated By</th>
        <th className="p-2 w-1/6">Actions</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className="border-b border-gray-200 text-white bg-black ">
      <td className="p-2">
        <p className="text-white">{task._id}</p>
      </td>

      <td className="p-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <p className="text-white">{task.title}</p>
          </div>
        </div>
      </td>
      <td className="p-2">
        <div className="flex items-center gap-2">
          <p className="text-white">{task.requirement.slice(0, 90)}</p>
        </div>
      </td>

      <td className="p-2">
        <div className="flex items-center gap-2 pl-6">
          <p className=" w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full">
            {getInitials(task.createdBy)}
          </p>
        </div>
      </td>

      <td className="p-2">
        <div className="flex items-center gap-2 pl-6">
          {task.updatedBy?.length > 0 ? (
            <p className=" w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full">
              {getInitials(task.updatedBy)}
            </p>
          ) : (
            <p className="text-center capitalize">Not updated</p>
          )}
        </div>
      </td>

      <td className="flex py-4 items-center gap-2 md:gap-4">
        <div
          className="text-blue-400 sm:px-0 text-sm md:text-base cursor-pointer"
          onClick={() => setViewId(task._id)}
        >
          <GrFormView size={25} />
        </div>
        <div
          className="text-green-400 sm:px-0 text-sm md:text-base cursor-pointer"
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

      {viewId === task._id && (
        <ViewRequirement
          isOpen={viewId === task._id}
          setIsOpen={setViewId}
          id={task._id}
        />
      )}

      {id === task._id && (
        <UpdateRequirement
          isOpen={id === task._id}
          setIsOpen={setId}
          id={task._id}
        />
      )}
    </tr>
  );

  return (
    <div className="overflow-x-auto">
      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <TableHeader />
          <tbody>
            {requirements?.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-20">
                  No Data found.
                </td>
              </tr>
            )}
            {filteredProject?.map((item, index) => (
              <TableRow key={index} task={item} />
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default RequirementGatheringTable;
