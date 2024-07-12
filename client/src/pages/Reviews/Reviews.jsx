import React, { useState } from "react";
import { useGetUser } from "../../hooks/get-user";
import { MdOutlineAdd } from "react-icons/md";
import { GetAllCodeReviews } from "../../hooks/get-code-review";
import CodeReviewTable from "../../components/Code-Reviews/Code-Review-Table";
import CodeReviewsCreation from "../../components/Code-Reviews/Code-Reviews-Creation";
import CodeReviewLineChart from "../../components/Code-Review-LineChart/Code-Review-LineChart";

const Reviews = () => {
  const { user } = useGetUser();
  const [isOpen, setIsOpen] = useState(false);
  const [project, setProject] = useState("");
  const { data, loading, mutate } = GetAllCodeReviews();

  const uniqueProjects = [...new Set(data.map((req) => req.project))];

  return (
    <div className="px-4 md:px-8 lg:px-12 xl:px-24 xxl:px-48">
      <div className="flex flex-col gap-8">
        {/*USER ROLE CONTAINER */}
        <div className="flex justify-end">
          <div className="max-w-max px-4 py-2 bg-white shadow-2xl text-[#003175] rounded-md text-lg">
            User: <span className="capitalize font-bold">{user?.role}</span>
          </div>
        </div>
        {/*GRAPH CONTAINER */}
        <div className="flex items-center justify-center">
          <div className="flex flex-col gap-2 justify-center">
            <h1 className="text-2xl font-bold">Graph</h1>

            <CodeReviewLineChart reviewData={data} />
          </div>
        </div>
        {/*FILTER AND ADD CODE REVIEWS CONTAINER */}
        <div className="py-4 flex justify-between">
          {/* FILTERED BUTTON */}
          <div className="max-w-max flex items-center gap-4">
            <select
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="px-4 py-2 text-white bg-[#003175] rounded-xl shadow-md bg outline-none"
            >
              <option value="">Filter</option>
              {uniqueProjects.map((project, index) => (
                <option value={project} key={index}>
                  {project}
                </option>
              ))}
            </select>
          </div>
          {/* ADD REVIEWS BUTTON */}
          <div className="max-w-max bg-slate-900 grid place-content-center">
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center bg-gradient-to-r from-blue-600 to-gray-600 text-white shadow-md font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity"
            >
              <MdOutlineAdd />
              Add Reviews
            </button>

            <CodeReviewsCreation
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              mutate={mutate}
            />
          </div>
        </div>
        {/*CODE REVIEWS TABLE*/}
        <div className="pb-4">
          <CodeReviewTable
            data={project}
            loading={loading}
            mutate={mutate}
            AllCodeReviews={data}
          />
        </div>
      </div>
    </div>
  );
};

export default Reviews;
