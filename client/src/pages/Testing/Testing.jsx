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

  return (
    <Fragment>
      <div className="space-y-4 flex-1 h-full">
        <div className="mx-24 flex justify-between items-center">
          <h1 className="text-3xl font-bold">All Test Cases</h1>
          <div
            className="bg-purple-500 text-center p-2 cursor-pointer"
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
        <div className="border-2 border-gray-700 mx-24 py-8 px-4 rounded-md">
          <TestCaseTable data={data} loading={loading} mutate={mutate} />
        </div>
      </div>
    </Fragment>
  );
};

export default Testing;
