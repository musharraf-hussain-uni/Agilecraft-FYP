import React, { Fragment, useState } from "react";
import Pagination from "../Pagination/Pagination";
const ITEMS_PER_PAGE = 4;

export default function BugTable({ data, AllBugs }) {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = ITEMS_PER_PAGE * currentPage;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  // const currentItems = AllBugs.slice(indexOfFirstItem, indexOfLastItem);

  // const totalPages = Math.ceil(AllBugs.length / ITEMS_PER_PAGE);

  const filteredReviews = data
    ? AllBugs.filter((item) => item.project === data)
    : [];

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Fragment>
      <div className="overflow-x-auto bg-slate-200 rounded-xl">
        <table className="table">
          {/* Head */}
          <thead className="bg-blue-500 text-white">
            <tr>
              <th>
                <p className="text-white uppercase font-bold">S.NO</p>
              </th>
              <th className="text-base">Title/(Project)</th>
              <th className="text-base">Description</th>
              <th className="text-base">Project</th>
              <th className="text-base">Status</th>
              <th className="text-base">Priority</th>
            </tr>
          </thead>
          <tbody>
            {/* Body */}
            {filteredReviews?.map((data, index) => (
              <tr
                key={data._id} // Use unique identifier for key
                className="border-b-2 text-white border-b-slate-400 hover:bg-blue-300"
              >
                <th>
                  <p className="text-black px-2 py-1 rounded-lg text-center">
                    {indexOfFirstItem + index + 1}
                  </p>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold capitalize text-slate-700">
                        {data.title}
                      </div>
                      <div className="text-xs text-gray-600 bg-white p-1 rounded-md">
                        {data.project}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="text-slate-700">
                  {data.description.slice(0, 70)}...
                  <br />
                </td>
                {data.project && ( // Check if priority exists before accessing
                  <td className="text-xs text-center rounded-md py-2">
                    <p className="text-white bg-slate-700 p-2 rounded-xl">
                      {data.project}
                    </p>
                  </td>
                )}
                {data.status && ( // Check if comment exists before accessing
                  <td className="text-sm capitalize text-slate-700">
                    {data.status}
                  </td>
                )}

                <td className="text-xs text-center rounded-md py-2">
                  <p className="text-slate-100 font-medium p-2 bg-purple-500 rounded-xl">
                    {data.priority}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
          {/* Footer (optional, remove if not needed) */}
          <tfoot>
            <tr>
              <th></th>
              <th>Title/(Project)</th>
              <th>Description</th>
              <th>Project</th>
              <th>Status</th>
              <th>Priority</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </Fragment>
  );
}
