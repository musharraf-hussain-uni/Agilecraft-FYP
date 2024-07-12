import React, { Fragment, useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import { MdDelete, MdOutlineUpdate } from "react-icons/md";
import { GrFormView } from "react-icons/gr";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 4;

export default function TestCaseTable({ data, loading, mutate, filter }) {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = ITEMS_PER_PAGE * currentPage;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const navigate = useNavigate();

  const filteredData =
    filter.length > 0
      ? data.filter((item) => item.project === filter)
      : currentItems;

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const ViewbuttonStyles =
    "bg-blue-500 px-2 py-1 text-xs rounded-lg text-white cursor-pointer capitalize";

  const EditbuttonStyles =
    "bg-green-500 px-2 py-1 text-xs rounded-lg text-white cursor-pointer capitalize";

  const DeletebuttonStyles =
    "bg-red-500 px-2 py-1 text-xs rounded-lg text-white cursor-pointer capitalize";

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3001/api/test/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (res.status == 200) {
        toast.success("Test Case Deleted Successfully!");
        mutate();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleView = (id) => {
    navigate(`/dashboard/testing/${id}`);
  };

  const handleUpdate = (id) => {
    navigate(`/dashboard/testing/update/${id}`);
  };

  if (loading) {
    return (
      <div className="w-full text-center">
        <span className="loading loading-spinner bg-[#003175] loading-lg"></span>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="overflow-x-auto bg-slate-200 rounded-xl">
        <table className="table">
          {/* head */}
          <thead className="bg-blue-500 text-white">
            <tr>
              <th>
                <p className="text-white uppercase font-bold">S.NO</p>
              </th>
              <th className="text-base">Title/(project)</th>
              <th className="text-base">Description</th>
              <th className="text-base">Module</th>
              <th className="text-base">Created By</th>
              <th className="text-base">Updated By</th>
              <th className="text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {filteredData.map((data, index) => (
              <tr
                className="border-b-2 border-b-slate-400 hover:bg-blue-300"
                key={data}
              >
                <th>
                  <p className="text-black px-2 py-1 rounded-lg text-center">
                    {indexOfFirstItem + index + 1}
                  </p>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold capitalize">{data.title}</div>
                      <div className="text-xs text-gray-600 bg-white p-1 rounded-md max-w-fit">
                        {data.project}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="text-slate-700">
                    {data.description.slice(0, 100)}...
                    <br />
                    <span className="badge badge-ghost badge-sm hidden lg:block">
                      {data.steps.length > 0
                        ? "Yes! Steps Provided"
                        : "No Steps Provided"}
                    </span>
                  </p>
                </td>
                <td>
                  <p className="capitalize text-xs p-2 bg-purple-400 text-center text-white font-bold rounded-md">
                    {data.module}
                  </p>
                </td>
                <td>
                  <p className="text-xs text-white bg-slate-700 text-center rounded-md py-2">
                    {data.createdBy}
                  </p>
                </td>
                <td>
                  <p
                    className={
                      data.updatedBy?.length > 0 &&
                      "text-xs text-white bg-slate-700 text-center rounded-md py-2"
                    }
                  >
                    {data.updatedBy?.length === 0 ? " " : data.updatedBy}
                  </p>
                </td>
                <td>
                  <div className="flex items-center justify-center gap-2">
                    <div
                      className={ViewbuttonStyles}
                      onClick={() => handleView(data._id)}
                    >
                      <GrFormView size={20} />
                    </div>
                    <div
                      className={DeletebuttonStyles}
                      onClick={() => handleDelete(data._id)}
                    >
                      <MdDelete size={20} />
                    </div>
                    <div
                      className={EditbuttonStyles}
                      onClick={() => handleUpdate(data._id)}
                    >
                      <MdOutlineUpdate size={20} />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Description</th>
              <th>Module</th>
              <th>Created By</th>
              <th>Updated By</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </Fragment>
  );
}
