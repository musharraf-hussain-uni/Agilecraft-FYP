import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { dateFormatter } from "../../utils";
import { RiArrowGoBackFill } from "react-icons/ri";
import { IoIosEyeOff } from "react-icons/io";
import { useGetRequirement } from "../../hooks/get-req";

const ViewRequirement = ({ isOpen, setIsOpen, id }) => {
  const { requirement, loading } = useGetRequirement(id);
  console.log(requirement);

  if (!loading) {
    return (
      <div className="w-full text-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-2xl lg:max-w-full shadow-xl cursor-default relative overflow-hidden"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              {requirement && (
                <h3 className="text-3xl font-bold text-center text-white mb-8 hidden md:hidden lg:hidden">
                  View Requirement Id: {requirement._id}
                </h3>
              )}
              {/*STARTS VIEWING REQUIREMENT*/}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-4">
                <div>
                  <h3 className="text-lg md:text-2xl text-white font-bold lg:mb-4">
                    <span className="font-bold text-slate-300 text-base">
                      Title:{" "}
                    </span>
                    {requirement?.title}
                  </h3>
                  <hr />
                  <p className="text-sm md:text-base text-white font-bold lg:mb-4">
                    <span className="text-slate-300 ">Module: </span>
                    {requirement?.module}
                  </p>
                  <hr />
                  <p className="text-sm md:text-base text-white lg:mb-4">
                    <span className="text-slate-300 ">Requirement: </span>
                    {requirement?.requirement}
                  </p>
                  <p className="text-sm md:text-base text-white lg:mb-4">
                    <span className="text-slate-300 ">Project Linked to: </span>
                    {requirement?.project?.length > 0
                      ? requirement?.project
                      : "none"}
                  </p>
                </div>
                <div>
                  <h5 className="text-bold text-lg text-white capitalize">
                    <span className="font-bold text-slate-300">Priority: </span>
                    {requirement?.priority}
                  </h5>
                  <p className="text-bold text-lg text-white capitalize">
                    <span className="font-bold text-slate-300">
                      Created By:{" "}
                    </span>
                    {requirement?.createdBy}
                  </p>
                  {requirement?.updatedAt && (
                    <p className="text-bold text-lg text-white capitalize">
                      <span className="font-bold text-slate-300">
                        Updated By:{" "}
                      </span>
                      {dateFormatter(requirement?.updatedAt)}
                    </p>
                  )}
                  <p className="text-bold text-lg text-white capitalize">
                    <span className="font-bold text-slate-300">
                      Created Date:{" "}
                    </span>
                    {dateFormatter(requirement?.createdAt)}
                  </p>
                  {requirement?.updateDate && (
                    <p className="text-bold text-lg text-white capitalize">
                      <span className="font-bold text-slate-300">
                        Updated Date:{" "}
                      </span>
                      {requirement?.UpdateDate}
                    </p>
                  )}
                </div>
              </div>
              {/*END VIEWING REQUIREMENT*/}
              <div className="flex justify-between">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-[45%] py-2 rounded flex justify-center items-center gap-2"
                >
                  <RiArrowGoBackFill />
                  Back
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-[45%] py-2 rounded flex justify-center items-center gap-2"
                >
                  <IoIosEyeOff />
                  Un-View
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ViewRequirement;
