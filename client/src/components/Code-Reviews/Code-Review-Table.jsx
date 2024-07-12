import React, { Fragment, useContext, useState } from "react";
import { GrFormView } from "react-icons/gr";
import { MdDelete, MdOutlineUpdate } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import CodeReviewView from "./Code-Review-View";
import { CodeReviewContext } from "../../context/CodeReviewContext";

const ITEMS_PER_PAGE = 4;

export default function CodeReviewTable({
  data,
  loading,
  mutate,
  AllCodeReviews,
}) {
  // GET ALL DATA
  const [viewId, setViewId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  console.log(AllCodeReviews);
  // console.log(AllCodeReviews);
  console.log(data);

  // CONTEXT (GLOBAL STATE MANAGEMENT)

  const { DeleteReview } = useContext(CodeReviewContext);
  //PAGINATION

  const indexOfLastItem = ITEMS_PER_PAGE * currentPage;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  // const currentItems = AllCodeReviews.slice(indexOfFirstItem, indexOfLastItem);

  const filteredReviews = data
    ? AllCodeReviews?.filter((item) => item.project === data)
    : [];

  console.log(filteredReviews);
  // const totalPages = Math.ceil(filteredReviews?.length / ITEMS_PER_PAGE);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // PAGINATION ENDS HERE

  // NAVIGATION

  const navigate = useNavigate();

  // BUTTON STYLING

  const ViewbuttonStyles =
    "bg-blue-500 px-2 py-1 text-xs rounded-lg text-white cursor-pointer capitalize";

  // const EditbuttonStyles =
  //   "bg-green-500 px-2 py-1 text-xs rounded-lg text-white cursor-pointer capitalize";

  const DeletebuttonStyles =
    "bg-red-500 px-2 py-1 text-xs rounded-lg text-white cursor-pointer capitalize";

  // DELETING FUNCTION

  const handleDelete = async (id) => {
    try {
      await DeleteReview(id);
      mutate();
      navigate("/dashboard/reviews");
    } catch (error) {
      console.log(error);
    }
  };

  // LOADING FUNCTION

  // if (loading) {
  //   return (
  //     <div className="w-full text-center">
  //       <span className="loading loading-dots loading-lg"></span>
  //     </div>
  //   );
  // }

  // MAPPING THE SELECTED DATA

  // const selectedReviews = data
  //   ? currentItems?.filter((item) => item.project === data)
  //   : [];

  // // console.log(selectedReviews);

  // if (!selectedReviews) {
  //   return (
  //     <div className="w-full text-center">
  //       <span className="">No Data Found!</span>
  //     </div>
  //   );
  // }

  // VIEWING CONDITIONS

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
              <th className="text-base">Title)</th>
              <th className="text-base">Description/(Project)</th>
              <th className="text-base">Comments</th>
              <th className="text-base">Status</th>
              <th className="text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {filteredReviews?.map((data, index) => (
              <>
                <tr
                  className="border-b-2 text-white border-b-slate-400 hover:bg-blue-300"
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
                    {data.description.slice(0, 100)}...
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {data.project}
                    </span>
                  </td>
                  <td>
                    <div className="flex justify-center items-center">
                      <p className="h-full p-2 text-center w-56 max-w-fit text-xs text-white bg-slate-700  rounded-md py-2">
                        {data.comment.slice(0, 100)}
                      </p>
                    </div>
                  </td>
                  <td>
                    <p
                      className={`capitalize text-xs p-2 ${
                        data.status === "open"
                          ? "bg-yellow-400"
                          : data.status === "approved"
                          ? "bg-green-500"
                          : data.status === "rejected" && "bg-red-500"
                      } text-center text-white font-bold rounded-md`}
                    >
                      {data.status}
                    </p>
                  </td>

                  <td>
                    <div className="flex items-center justify-center gap-2">
                      {data.status == "approved" ||
                      data.status == "rejected" ? null : (
                        <div
                          className={ViewbuttonStyles}
                          onClick={() => setViewId(data._id)}
                        >
                          <GrFormView size={20} />
                        </div>
                      )}
                      <div
                        className={DeletebuttonStyles}
                        onClick={() => handleDelete(data._id)}
                      >
                        <MdDelete size={20} />
                      </div>
                    </div>
                  </td>

                  <td>
                    {!filteredReviews?.length && (
                      <div className="text-center">
                        <p>No Records Found After Filtering!</p>
                      </div>
                    )}
                  </td>
                </tr>
                {viewId === data._id && (
                  <CodeReviewView
                    isOpen={viewId === data._id}
                    setIsOpen={setViewId}
                    reviewId={data._id}
                    mutate={mutate}
                  />
                )}
              </>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Description/(project)</th>
              <th>comment</th>
              <th>status</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </Fragment>
  );
}
