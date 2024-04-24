import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { FaProjectDiagram } from "react-icons/fa";
import { useGetUser } from "../../hooks/get-user";
import { ReqContext } from "../../context/ReqContext";
import { useGetAllProject } from "../../hooks/get-project";

const AddReq = ({ isOpen, setIsOpen }) => {
  const { user } = useGetUser();
  const { projects } = useGetAllProject();

  const [data, setData] = useState({
    title: "",
    requirement: "",
    priority: "",
    project: "",
    module: "",
    createdBy: "",
  });

  const fullName = user?.fName + " " + user?.lName;

  const { AddRequirement } = useContext(ReqContext);

  useEffect(() => {
    if (user) {
      setData((prevData) => ({
        ...prevData,
        createdBy: fullName || "",
      }));
    }
  }, [user, fullName]);

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
      console.log(data);
      await AddRequirement(data);
      setData({
        title: "",
        requirement: "",
        project: "",
        priority: "",
        module: "",
      });
      setIsOpen(false);
    } catch (error) {
      console.log(error);
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
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg lg:max-w-xl shadow-xl cursor-default relative overflow-hidden"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                <FaProjectDiagram />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2 text-slate-300">
                Add Project Requirement
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

                <label htmlFor="requirement" className="relative block w-full">
                  <textarea
                    type="text"
                    id="requirement"
                    cols={3}
                    rows={4}
                    className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black"
                    value={data.requirement}
                    onChange={handleChange}
                  />
                  <span
                    className="absolute left-2 top-0 -translate-y-1/2
                scale-100 bg-violet-500 rounded px-0.5 text-base text-white font-medium transition-transform
                peer-focus:scale-0
                "
                  >
                    Requirement
                  </span>
                </label>
                <label htmlFor="" className="relative block w">
                  <select
                    id=""
                    value={data.project}
                    onChange={(e) =>
                      setData({ ...data, project: e.target.value })
                    }
                    className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black pb-4"
                  >
                    <option value="">Select Project</option>
                    {projects.map((project, index) => (
                      <option key={index} value={project.title}>
                        {project.title}
                      </option>
                    ))}
                  </select>
                  <span
                    className="absolute left-2 top-0 -translate-y-1/2
                scale-100 bg-violet-500 rounded px-0.5 text-base text-white font-medium transition-transform
                peer-focus:scale-0
                "
                  >
                    Specific Project
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
                  <label htmlFor="createdby" className="relative block w-1/2">
                    <input
                      type="text"
                      id="createdby"
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
                      Created By
                    </span>
                  </label>
                  <label htmlFor="" className="relative block w-1/2">
                    <select
                      id=""
                      value={data.priority}
                      onChange={(e) =>
                        setData({ ...data, priority: e.target.value })
                      }
                      className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black pb-4"
                    >
                      <option value="">Select Priority</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                    <span
                      className="absolute left-2 top-0 -translate-y-1/2
                scale-100 bg-violet-500 rounded px-0.5 text-base text-white font-medium transition-transform
                peer-focus:scale-0
                "
                    >
                      Priority
                    </span>
                  </label>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                >
                  Go back
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                >
                  Add
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddReq;
