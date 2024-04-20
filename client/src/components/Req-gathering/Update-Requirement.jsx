import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaUserEdit } from "react-icons/fa";
import { useGetAllRequirement } from "../../hooks/get-req";
import { useGetUser } from "../../hooks/get-user";
import { ReqContext } from "../../context/ReqContext";

const UpdateRequirement = ({ isOpen, setIsOpen, id }) => {
  const { requirements } = useGetAllRequirement();
  const { user } = useGetUser();
  const { UpdateRequirement } = useContext(ReqContext);
  const foundedtask = requirements.find((item) => item._id == id);
  const [data, setData] = useState({
    title: "",
    requirement: "",
    priority: "",
    module: "",
    updatedBy: "",
  });

  const fullName = user?.fName + " " + user?.lName;
  useEffect(() => {
    if (user) {
      setData((prevData) => ({
        ...prevData,
        updatedBy: fullName || "", // Set createdBy when user changes
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
      await UpdateRequirement(data, id);
      setIsOpen(false);
      setData({
        title: "",
        requirement: "",
        priority: "",
        module: "",
      });
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
            <FaUserEdit className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                <FaUserEdit />
              </div>
              <h3 className="text-3xl text-white font-bold text-center mb-2">
                Updated Requirement
              </h3>
              <div className="my-4">
                <label htmlFor="title" className="relative block w-full">
                  <input
                    type="text"
                    id="title"
                    placeholder={foundedtask?.title}
                    className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black placeholder:text-slate-500"
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
                    placeholder={foundedtask?.requirement}
                    cols={3}
                    rows={5}
                    className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none placeholder:text-slate-500"
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
                <label htmlFor="module" className="relative block w-full">
                  <textarea
                    type="text"
                    id="module"
                    placeholder={foundedtask?.module}
                    cols={3}
                    rows={1}
                    value={data.module}
                    onChange={handleChange}
                    className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none placeholder:text-slate-500"
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
                  <label htmlFor="updateBy" className="relative block w-1/2">
                    <input
                      type="text"
                      id="updateBy"
                      className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-slate-600 placeholder:text-slate-500"
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
                  <label
                    htmlFor="updatePriority"
                    className="relative block w-1/2"
                  >
                    <select
                      id="updatePriority"
                      value={data?.priority}
                      onChange={(e) =>
                        setData({ ...data, priority: e.target.value })
                      }
                      className="px-2 peer w-full rounded border border-neutral-400 p-6 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-slate-600 pb-2 placeholder:text-slate-500"
                    >
                      <option value="">{foundedtask?.priority}</option>
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
                  Update
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpdateRequirement;
