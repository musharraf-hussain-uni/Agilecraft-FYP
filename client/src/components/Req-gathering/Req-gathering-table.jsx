import React, { Fragment, useContext, useState } from "react";
import { MdOutlineUpdate, MdDelete } from "react-icons/md";
import { GrFormView } from "react-icons/gr";
import { getInitials } from "../../utils";
import Pagination from "../Pagination/Pagination";
import UpdateRequirement from "./Update-Requirement";
import ViewRequirement from "./View-Requirement";
// import { useGetAllRequirement } from "../../hooks/get-req";
import { ReqContext } from "../../context/ReqContext";

const ITEMS_PER_PAGE = 4;

const RequirementGatheringTable = ({
  project,
  requirements,
  mutate,
  loading,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [updateId, setUpdateId] = useState(null);
  const [viewId, setViewId] = useState(null);

  const { DeleteRequirement } = useContext(ReqContext);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = requirements.slice(indexOfFirstItem, indexOfLastItem);

  const filteredProject = project
    ? requirements.filter((item) => item.project === project)
    : currentItems;

  // console.log("filter", filteredProject);
  const totalPages = Math.ceil(requirements.length / ITEMS_PER_PAGE);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (id) => {
    try {
      await DeleteRequirement(id);
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const ViewbuttonStyles =
    "bg-blue-500 px-2 py-1 text-xs rounded-lg text-white cursor-pointer capitalize";

  const EditbuttonStyles =
    "bg-green-500 px-2 py-1 text-xs rounded-lg text-white cursor-pointer capitalize";

  const DeletebuttonStyles =
    "bg-red-500 px-2 py-1 text-xs rounded-lg text-white cursor-pointer capitalize";

  if (loading) {
    return (
      <div className="w-full text-center">
        <span className="loading loading-spinner bg-[#003175] loading-lg"></span>
      </div>
    );
  }

  const TableHeader = () => (
    // <thead className="border-b bg-slate-800 border-gray-300">
    //   <tr className="text-white text-left">
    //     <th className="p-2 w-[5%] text-xs lg:text-base text-center lg:text-left">
    //       Id
    //     </th>
    //     <th className="p-2 w-1/3 text-xs lg:text-base text-center lg:text-left">
    //       Title
    //     </th>
    //     <th className="p-2 w-1/3 text-xs lg:text-base text-center lg:text-left">
    //       Requirements
    //     </th>
    //     <th className="p-2 w-1/6 text-xs lg:text-base text-center lg:text-left">
    //       Created By
    //     </th>
    //     <th className="p-2 w-1/3 text-xs lg:text-base text-center lg:text-left">
    //       Updated By
    //     </th>
    //     <th className="p-2 w-1/6 text-xs lg:text-base text-center lg:text-left">
    //       Actions
    //     </th>
    //   </tr>
    // </thead>

    <thead className="bg-blue-500 text-white">
      <tr>
        <th>
          <p className="text-white uppercase font-bold">S.NO</p>
        </th>
        <th className="text-base">Title/(Project)</th>
        <th className="text-base">Requirements</th>
        <th className="text-base">Created By</th>
        <th className="text-base">Updated By</th>
        <th className="text-base">Actions</th>
      </tr>
    </thead>
  );

  const TableRow = ({ id, task }) => (
    <>
      <tr className="border-b-2 text-white border-b-slate-400 hover:bg-blue-300">
        <th>
          <p className="text-black">{indexOfFirstItem + id + 1}</p>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div>
              <div className="font-bold capitalize text-slate-700">
                {task.title}
              </div>
              <div className="text-xs text-gray-600 bg-white p-1 rounded-md max-w-fit">
                {task.project}
              </div>
            </div>
          </div>
        </td>
        <td className="text-slate-700 font-medium capitalize">
          {task.requirement.slice(0, 80)}...
          <br />
        </td>
        <td>
          <p className="capitalize text-xs p-2 text-center text-white font-bold rounded-md">
            <span className="p-4 bg-blue-600 text-white rounded-full">
              {getInitials(task.createdBy)}
            </span>
          </p>
        </td>
        <td>
          <p className="text-xs text-white text-center rounded-md py-2">
            {task.updatedBy?.length > 0 ? (
              <span className="p-4 bg-blue-600 text-white rounded-full">
                {getInitials(task.updatedBy)}
              </span>
            ) : (
              <span className="text-xs text-gray-100 bg-slate-700 p-2 rounded-lg">
                Not updated
              </span>
            )}
          </p>
        </td>
        <td>
          {/* <div
            className="text-blue-400 sm:px-0 text-sm md:text-base cursor-pointer"
            onClick={() => setViewId(task._id)}
          >
            <GrFormView size={25} />
          </div>
          <div
            className="text-green-400 sm:px-0 text-sm md:text-base cursor-pointer"
            onClick={() => setUpdateId(task._id)}
          >
            <MdOutlineUpdate size={20} />
          </div>
          <div
            className="text-red-400 sm:px-0 text-sm md:text-base cursor-pointer"
            onClick={() => handleDelete(task._id)}
          >
            <MdDelete size={20} />
          </div> */}

          <div className="flex items-center justify-center gap-2">
            <div
              className={ViewbuttonStyles}
              onClick={() => setViewId(task._id)}
            >
              <GrFormView size={20} />
            </div>
            <div
              className={DeletebuttonStyles}
              onClick={() => handleDelete(task._id)}
            >
              <MdDelete size={20} />
            </div>
            <div
              className={EditbuttonStyles}
              onClick={() => setUpdateId(task._id)}
            >
              <MdOutlineUpdate size={20} />
            </div>
          </div>
        </td>
      </tr>

      {viewId === task._id && (
        <ViewRequirement
          isOpen={viewId === task._id}
          setIsOpen={setViewId}
          id={task._id}
        />
      )}

      {updateId === task._id && (
        <UpdateRequirement
          isOpen={updateId === task._id}
          setIsOpen={setUpdateId}
          id={task._id}
          mutate={mutate}
        />
      )}
    </>
  );

  return (
    <Fragment>
      <div className="overflow-x-auto bg-slate-200 rounded-xl">
        <table className="table">
          <TableHeader />
          <tbody>
            {filteredProject.map((item, index) => (
              <TableRow key={index} id={index} task={item} />
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
    </Fragment>
  );
};

export default RequirementGatheringTable;

{
  /* <tr className="border-b border-gray-200 text-white bg-black ">
      <td className="p-2">
        <p className="text-white">{id + 1}</p>
      </td>

      <td className="p-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <p className="text-white text-xs lg:text-base antialiased">
              {task.title}
            </p>
          </div>
        </div>
      </td>
      <td className="p-2">
        <div className="flex items-center gap-2">
          <p className="text-white text-xs lg:text-base antialiased">
            {task.requirement.slice(0, 50)}
          </p>
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
          onClick={() => setUpdateId(task._id)}
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

      {updateId === task._id && (
        <UpdateRequirement
          isOpen={updateId === task._id}
          setIsOpen={setUpdateId}
          id={task._id}
        />
      )}
    </tr>

<tr
className="border-b-2 text-white border-b-slate-400 hover:bg-blue-300"
key={data}
>
<th>
  <p className="text-black">{indexOfFirstItem + index + 1}</p>
</th>
<td>
  <div className="flex items-center gap-3">
    <div className="avatar">
      <div className="mask mask-squircle w-12 h-12">
        <img
          src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
          alt="Avatar Tailwind CSS Component"
        />
      </div>
    </div>
    <div>
      <div className="font-bold capitalize text-slate-700">
        {data.title}
      </div>
      <div className="text-xs text-gray-600 bg-white p-1 rounded-md">
        {data._id}
      </div>
    </div>
  </div>
</td> */
}
