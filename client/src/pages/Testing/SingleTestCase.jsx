import React, { Fragment } from "react";
import { useLocation, useParams } from "react-router-dom";
import { GetTestCase } from "../../hooks/get-test-case";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function SingleTestCase() {
  const { id } = useParams();

  const { data, loading } = GetTestCase(id);

  if (loading) {
    return (
      <div className="w-full text-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }
  return (
    <Fragment>
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-semibold text-center mb-4">
          Test Case Details
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Side */}
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold text-gray-800">Title</h2>
              <FaExternalLinkAlt className="ml-2 text-blue-500" />
            </div>
            <p className="text-gray-700">{data?.title}</p>

            <hr className="my-2" />

            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Description
              </h2>
              <p className="text-gray-700">{data?.description}</p>
            </div>

            <hr className="my-2" />

            <div>
              <h2 className="text-xl font-semibold text-gray-800">Steps</h2>
              <p className="text-gray-700">{data?.steps}</p>
            </div>

            <hr className="my-2" />

            <div>
              <h2 className="text-xl font-semibold text-gray-800">Module</h2>
              <p className="text-gray-700 capitalize">{data?.module}</p>
            </div>
          </div>

          {/* Right Side */}
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Data</h2>
              <p className="text-gray-700">{data?.data}</p>
            </div>

            <hr className="my-2" />

            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Actual Result
              </h2>
              <p className="text-gray-700">{data?.actualResult}</p>
            </div>

            <hr className="my-2" />

            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Expected Result
              </h2>
              <p className="text-gray-700">{data?.expectedResult}</p>
            </div>

            <hr className="my-2" />

            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Created By
              </h2>
              <p className="text-gray-700">{data?.createdBy}</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
