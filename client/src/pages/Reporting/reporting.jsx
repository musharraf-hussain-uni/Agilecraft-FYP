import React, { Fragment, useState } from "react";
import BasicPie from "../../components/Reporting/Reporting-Pie-Chart";
import { GetAllCodeReviews } from "../../hooks/get-code-review";
import CodeReviewTable from "../../components/Code-Reviews/Code-Review-Table";
import TestCaseTable from "../../components/Reporting/Test-Table";
import BugTable from "../../components/Reporting/Bug-Table";
import { GetAllBugTracks } from "../../hooks/get-bug-track";
import { GetAllTestCases } from "../../hooks/get-test-case";

const Reporting = () => {
  const [project, setProject] = useState("");
  const { data, loading, mutate } = GetAllCodeReviews();
  const uniqueProjects = [...new Set(data.map((req) => req.project))];
  const { data: AllBugs } = GetAllBugTracks();
  const { data: AllTest } = GetAllTestCases();

  return (
    <Fragment>
      <div className="px-4 md:px-8 lg:px-12 xl:px-24 xxl:px-48">
        {/*GRAPH CONTAINER */}
        <div className="flex items-center justify-center">
          <div className="flex flex-col gap-2 justify-center">
            <h1 className="text-2xl font-bold text-center">Chart</h1>

            <BasicPie data={project} />
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
        </div>

        <div className="pb-4">
          <h1 className="text-3xl my-4 font-bold">Code Reviews</h1>
          <CodeReviewTable
            data={project}
            loading={loading}
            mutate={mutate}
            AllCodeReviews={data}
          />
        </div>

        <div className="pb-4">
          <h1 className="text-3xl my-4 font-bold">Test Cases</h1>
          <TestCaseTable data={project} AllTest={AllTest} />
        </div>

        <div className="pb-4">
          <h1 className="text-3xl my-4 font-bold">Bug Tracking</h1>
          <BugTable data={project} AllBugs={AllBugs} />
        </div>
      </div>
    </Fragment>
  );
};

export default Reporting;
