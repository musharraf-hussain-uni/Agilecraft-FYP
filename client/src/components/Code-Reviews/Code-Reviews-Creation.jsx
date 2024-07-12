import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { FaProjectDiagram } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import { useGetAllProject } from "../../hooks/get-project";
import { useGetUser } from "../../hooks/get-user";
import { CodeReviewContext } from "../../context/CodeReviewContext";

export default function CodeReviewsCreation({ isOpen, setIsOpen, mutate }) {
  const { projects } = useGetAllProject();

  const { AddReviews } = useContext(CodeReviewContext);

  const [data, setData] = useState({
    title: "",
    description: "",
    code: "",
    comment: "",
    status: "",
    project: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (status) => {
    try {
      const updatedData = { ...data, status };
      // Add your submission logic here, e.g., API call
      console.log(updatedData);
      await AddReviews(updatedData);

      // Optionally, reset the form or close the modal
      setData({
        title: "",
        description: "",
        code: "",
        comment: "",
        status: "",
        project: "",
      });
      setIsOpen(false);
      // Call mutate to update data if necessary
      mutate();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll lg:overflow-hidden cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-blue-400 to-slate-700 text-white p-6 rounded-lg w-full max-w-lg lg:max-w-xl shadow-xl cursor-default relative overflow-hidden"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              {/* <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                <FaProjectDiagram />
              </div> */}
              <h3 className="text-3xl font-bold text-center mb-2 text-slate-300 capitalize">
                Add Code Reviews
              </h3>

              <div className="my-4">
                {/* TITLE SECTION */}
                <label htmlFor="title" className="relative block w-full">
                  <input
                    type="text"
                    id="title"
                    className="px-2 peer w-full rounded border border-neutral-400 p-2 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black"
                    value={data.title}
                    onChange={handleChange}
                  />
                  <span
                    className="absolute left-2 top-0 -translate-y-1/2
          scale-100 bg-blue-500 rounded px-0.5 text-base text-white font-medium transition-transform
          peer-focus:scale-0
          "
                  >
                    Title
                  </span>
                </label>
                {/* DESCRIPTION SECTION */}
                <label htmlFor="description" className="relative block w-full">
                  <textarea
                    type="text"
                    id="description"
                    cols={3}
                    rows={2}
                    className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black"
                    value={data.description}
                    onChange={handleChange}
                  />
                  <span
                    className="absolute left-2 top-0 -translate-y-1/2
                scale-100 bg-blue-500 rounded px-0.5 text-base text-white font-medium transition-transform
                peer-focus:scale-0
                "
                  >
                    Description
                  </span>
                </label>

                {/* CODE SECTION */}
                <label htmlFor="code" className="relative block w-full">
                  <textarea
                    type="text"
                    id="code"
                    cols={3}
                    rows={4}
                    className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black"
                    value={data.code}
                    onChange={handleChange}
                  />
                  <span
                    className="absolute left-2 top-0 -translate-y-1/2
                scale-100 bg-blue-500 rounded px-0.5 text-base text-white font-medium transition-transform
                peer-focus:scale-0
                "
                  >
                    Code
                  </span>
                </label>
                {/* COMMENTS SECTION */}
                <label htmlFor="comment" className="relative block w-full">
                  <textarea
                    type="text"
                    id="comment"
                    cols={2}
                    rows={2}
                    className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black"
                    value={data.comment}
                    onChange={handleChange}
                  />
                  <span
                    className="absolute left-2 top-0 -translate-y-1/2
                scale-100 bg-blue-500 rounded px-0.5 text-base text-white font-medium transition-transform
                peer-focus:scale-0
                "
                  >
                    Comments
                  </span>
                </label>
                {/* PROJECT SECTION */}
                <label htmlFor="" className="relative block">
                  <select
                    id=""
                    value={data.project}
                    onChange={(e) =>
                      setData({ ...data, project: e.target.value })
                    }
                    className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black pb-4"
                  >
                    <option value="">Choose Project</option>
                    {projects.map((project, index) => (
                      <option key={index} value={project.title}>
                        {project.title}
                      </option>
                    ))}
                  </select>
                  <span
                    className="absolute left-2 top-0 -translate-y-1/2
                scale-100 bg-blue-500 rounded px-0.5 text-base text-white font-medium transition-transform
                peer-focus:scale-0
                "
                  >
                    Choose Project
                  </span>
                </label>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleSubmit("open")}
                className="bg-yellow-500 transition-colors text-white font-semibold w-full py-2 rounded"
              >
                Open
              </button>
              <button
                onClick={() => handleSubmit("approved")}
                className="bg-green-500 hover:opacity-90 transition-opacity text-white font-semibold w-full py-2 rounded"
              >
                Approved
              </button>
              <button
                onClick={() => handleSubmit("rejected")}
                className="bg-red-500 hover:opacity-90 transition-opacity text-white font-semibold w-full py-2 rounded"
              >
                Rejected
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
