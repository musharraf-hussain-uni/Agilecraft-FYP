import React, { Fragment, useState } from "react";

const ITEMS_PER_PAGE = 4;

export default function TestCaseTable({ data, AllTest }) {
  const [currentPage, setCurrentPage] = useState(1);

  // console.log(data);

  const indexOfLastItem = ITEMS_PER_PAGE * currentPage;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  // const currentItems = AllTest.slice(indexOfFirstItem, indexOfLastItem);

  const selectedReviews = data
    ? AllTest.filter((item) => item.project === data)
    : [];

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
              <th className="text-base">Title</th>
              <th className="text-base">Description</th>
              <th className="text-base">Project</th>
              <th className="text-base">Module</th>
            </tr>
          </thead>
          <tbody>
            {/* Body */}
            {selectedReviews?.map((data, index) => (
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
                        {data._id}
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
                {data.module && ( // Check if comment exists before accessing
                  <td className="text-xs text-slate-700">{data.module}</td>
                )}
              </tr>
            ))}
          </tbody>
          {/* Footer (optional, remove if not needed) */}
          <tfoot>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Description</th>
              <th>Project</th>
              <th>Module</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </Fragment>
  );
}
