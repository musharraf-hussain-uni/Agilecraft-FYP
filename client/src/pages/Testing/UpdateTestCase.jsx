import React, { Fragment, useContext, useEffect, useState } from "react";
import { GetTestCase } from "../../hooks/get-test-case";
import { useNavigate, useParams } from "react-router-dom";
import { FaExternalLinkAlt, FaProjectDiagram } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useGetUser } from "../../hooks/get-user";
import { FiAlertCircle } from "react-icons/fi";
import { TestCaseContext } from "../../context/TestCaseContext";

export default function UpdateTestCase() {
  const { id } = useParams();
  const { user } = useGetUser();
  const { data: GetSingleTest, loading } = GetTestCase(id);
  const { UpdateTestCase } = useContext(TestCaseContext);

  console.log(GetSingleTest);

  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    description: "",
    steps: "",
    data: "",
    module: "",
    actualResult: "",
    expectedResult: "",
    createdBy: "",
  });

  const fullName = user?.fName + " " + user?.lName;

  useEffect(() => {
    if (GetSingleTest) {
      // Update form data with fetched values
      setData({
        ...GetSingleTest,
        updatedBy: fullName || "", // Add or update the 'updatedBy' field
      });
    }
  }, [GetSingleTest, fullName]);

  const handleChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;

    setData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await UpdateTestCase(id, data);
      setData({
        title: "",
        description: "",
        steps: "",
        data: "",
        module: "",
        actualResult: "",
        expectedResult: "",
      });
      navigate("/dashboard/testing");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="w-full text-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className="mx-24 my-12
      "
      >
        <motion.div className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full px-24">
          <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
          <div className="relative z-10">
            <div className="bg-white w-12 h-12 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
              <FaProjectDiagram />
            </div>
            <h3 className="text-2xl font-bold text-center mb-2 text-slate-300">
              Update Test Case
            </h3>

            <div className="my-4">
              <label htmlFor="title" className="relative block w-full">
                <input
                  type="text"
                  id="title"
                  className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black"
                  value={data.title}
                  onChange={handleChange}
                />
                <span
                  className="absolute left-2 top-0 -translate-y-1/2
scale-100 bg-violet-500 rounded px-0.5 text-base text-white font-medium transition-transform
peer-focus:scale-0
"
                >
                  Title
                </span>
              </label>

              <label htmlFor="description" className="relative block w-full">
                <textarea
                  type="text"
                  id="description"
                  cols={3}
                  rows={3}
                  className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black"
                  value={data.description}
                  onChange={handleChange}
                />
                <span
                  className="absolute left-2 top-0 -translate-y-1/2
    scale-100 bg-violet-500 rounded px-0.5 text-base text-white font-medium transition-transform
    peer-focus:scale-0
    "
                >
                  Description
                </span>
              </label>
              <label htmlFor="steps" className="relative block w-full">
                <textarea
                  type="text"
                  id="steps"
                  cols={3}
                  rows={5}
                  className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black"
                  value={data.steps}
                  onChange={handleChange}
                />
                <span
                  className="absolute left-2 top-0 -translate-y-1/2
    scale-100 bg-violet-500 rounded px-0.5 text-base text-white font-medium transition-transform
    peer-focus:scale-0
    "
                >
                  Steps
                </span>
              </label>

              <label htmlFor="module" className="relative block w-full">
                <textarea
                  type="text"
                  id="module"
                  cols={3}
                  rows={1}
                  value={data.module}
                  onChange={handleChange}
                  className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black"
                />

                <span
                  className="absolute left-2 top-0 -translate-y-1/2
    scale-100 bg-violet-500 rounded px-0.5 text-base text-white font-medium transition-transform
    peer-focus:scale-0
    "
                >
                  Module
                </span>
              </label>
              <div className="flex gap-2">
                <label htmlFor="actualResult" className="relative block w-full">
                  <textarea
                    type="text"
                    id="actualResult"
                    cols={2}
                    rows={3}
                    value={data.actualResult}
                    onChange={handleChange}
                    className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black"
                  />

                  <span
                    className="absolute left-2 top-0 -translate-y-1/2
  scale-100 bg-violet-500 rounded px-0.5 text-base text-white font-medium transition-transform
  peer-focus:scale-0
  "
                  >
                    Actual Result
                  </span>
                </label>
                <label
                  htmlFor="expectedResult"
                  className="relative block w-full"
                >
                  <textarea
                    type="text"
                    id="expectedResult"
                    cols={2}
                    rows={3}
                    value={data.expectedResult}
                    onChange={handleChange}
                    className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black"
                  />

                  <span
                    className="absolute left-2 top-0 -translate-y-1/2
  scale-100 bg-violet-500 rounded px-0.5 text-base text-white font-medium transition-transform
  peer-focus:scale-0
  "
                  >
                    Expected Result
                  </span>
                </label>
              </div>

              <div className="flex gap-2 items-center">
                <label htmlFor="data" className="relative block w-full">
                  <textarea
                    type="text"
                    id="data"
                    cols={1}
                    rows={6}
                    value={data.data}
                    onChange={handleChange}
                    className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black"
                  />

                  <span
                    className="absolute left-2 top-0 -translate-y-1/2
  scale-100 bg-violet-500 rounded px-0.5 text-base text-white font-medium transition-transform
  peer-focus:scale-0
  "
                  >
                    Data
                  </span>
                </label>
                <label htmlFor="updatedBy" className="relative block w-1/2">
                  <input
                    type="text"
                    id="updatedBy"
                    className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black "
                    value={fullName}
                    onChange={handleChange}
                  />
                  <span
                    className="absolute left-2 top-0 -translate-y-1/2
    scale-100 bg-violet-500 rounded px-0.5 text-base text-white font-medium transition-transform
    peer-focus:scale-0
    
    "
                  >
                    Updated By
                  </span>
                </label>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate("/dashboard/testing")}
                className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
              >
                Go back
              </button>
              <button
                onClick={handleSubmit}
                className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
              >
                Update
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
