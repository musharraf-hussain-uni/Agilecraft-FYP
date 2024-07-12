import React, { Fragment, useState } from "react";
// import { GetAllTestCases, GetTestCase } from "../../hooks/get-test-case";
import TestCaseTable from "../../components/Test-Case/Test-Case-Table";
import { MdAdd } from "react-icons/md";
import TestCaseCreation from "../../components/Test-Case/Test-Case-Creation-Modal";
import { GetAllTest } from "../../../../backend/controllers/TestController";
import { GetAllTestCases } from "../../hooks/get-test-case";

const Testing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, loading, mutate } = GetAllTestCases();
  const [filter, setFilter] = useState("");

  const uniqueProjects = [...new Set(data.map((req) => req.project))];

  return (
    <Fragment>
      <div className="px-4 md:px-8 lg:px-12 xl:px-24 xxl:px-48">
        <div className="space-y-4 flex-1 h-full">
          <div className="flex justify-between items-center">
            {/* <h1 className="text-3xl font-bold">All Test Cases</h1> */}
            {/*Drop Down and Add Requirement addition*/}

            <div className="max-w-max flex items-center gap-4">
              <select
                name=""
                id=""
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 text-white bg-[#003175] rounded-xl shadow-md bg outline-none"
              >
                <option value="">Filter using project name</option>
                {uniqueProjects.map((project, index) => (
                  <option value={project} key={index}>
                    {project}
                  </option>
                ))}
              </select>
            </div>
            <div
              className="bg-gradient-to-tr from-blue-600 to-gray-600 text-center p-2 cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <p className="text-white font-bold flex gap-2">
                <span>
                  <MdAdd size={20} />
                </span>
                Create A New Test Case
              </p>
            </div>

            <TestCaseCreation
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              mutate={mutate}
            />
          </div>
          <div className="py-8 px-4">
            <TestCaseTable
              data={data}
              loading={loading}
              mutate={mutate}
              filter={filter}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Testing;
