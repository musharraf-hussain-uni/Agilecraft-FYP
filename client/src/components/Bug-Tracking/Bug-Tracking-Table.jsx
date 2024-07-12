import React, { Fragment, useState } from "react";
import Pagination from "../Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import { GrFormView } from "react-icons/gr";
import { MdDelete, MdOutlineUpdate } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";

const ITEMS_PER_PAGE = 4;

export default function BugTrackingTable({ data, loading, mutate, filter }) {
  // console.log(data);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = ITEMS_PER_PAGE * currentPage;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data?.length / ITEMS_PER_PAGE);

  const navigate = useNavigate();

  const filteredData =
    filter.length > 0
      ? data.filter((item) => item.project === filter)
      : currentItems;

  const ViewbuttonStyles =
    "bg-blue-500 px-2 py-1 text-xs rounded-lg text-white cursor-pointer capitalize";

  const EditbuttonStyles =
    "bg-green-500 px-2 py-1 text-xs rounded-lg text-white cursor-pointer capitalize";

  const DeletebuttonStyles =
    "bg-red-500 px-2 py-1 text-xs rounded-lg text-white cursor-pointer capitalize";

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3001/api/bug-tracking/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (res.status == 200) {
        toast.success("Bug Record was Deleted Successfully!");
        mutate();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Viewing function

  const handleView = (id) => {
    navigate(`/dashboard/bug-tracking/${id}`);
  };

  // Update function

  const handleUpdate = (id) => {
    navigate(`/dashboard/bug-tracking/update/${id}`);
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
              <th className="text-base">Title/(Project)</th>
              <th className="text-base">Description/(Severity-Levels)</th>
              <th className="text-base">Priority</th>
              <th className="text-base">Reported By</th>
              <th className="text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {filteredData.map((data, index) => (
              <tr
                className="border-b-2 text-white border-b-slate-400 hover:bg-blue-300"
                key={data}
              >
                <th>
                  <p className="text-black">{indexOfFirstItem + index + 1}</p>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold capitalize text-slate-700">
                        {data.title}
                      </div>
                      <div className="text-xs text-gray-600 bg-white p-1 rounded-md max-w-fit">
                        {data.project}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="text-slate-700">
                  {data.description.slice(0, 200)}...
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {data.severity == "critical"
                      ? "Critical"
                      : data.severity == "major"
                      ? "Major"
                      : data.severity == "moderate"
                      ? "Moderate"
                      : data.severity == "low" && "Low"}
                  </span>
                </td>
                <td>
                  <p className="capitalize text-xs p-2 bg-purple-400 text-center text-white font-bold rounded-md">
                    {data.priority}
                  </p>
                </td>
                <td>
                  <p className="text-xs text-white bg-slate-700 text-center rounded-md py-2">
                    {data.reportedBy}
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
              <th>Title/(Project)</th>
              <th>Description/(Severity-Levels)</th>
              <th>Priority</th>
              <th>Reported By</th>
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
