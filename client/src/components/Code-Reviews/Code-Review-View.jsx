import React, { useEffect, createRef, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; // Choose your theme
import { GetSingleCodeReview } from "../../hooks/get-code-review";
import { CodeReviewContext } from "../../context/CodeReviewContext";
import toast from "react-hot-toast";

export default function CodeReviewView({
  isOpen,
  setIsOpen,
  reviewId,
  mutate,
}) {
  const codeRef = createRef();
  const { UpdateReview } = useContext(CodeReviewContext);

  console.log(reviewId);

  const { data, loading } = GetSingleCodeReview(reviewId);

  console.log(data);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="w-full text-center">
        <div className="loading loading-spinner bg-[#fff] loading-lg"></div>
      </div>
    );
  }

  const label =
    "w-24 px-4 py-2 bg-white rounded-lg text-gray-600 font-medium text-center";

  const ApprovedHandler = (e) => {
    e.preventDefault();

    // Extract ID from data (assuming it's accessible)
    const reviewId = data?._id;

    if (!reviewId) {
      console.error("Missing review ID for update.");
      toast.error("Failed to update review: Missing review ID.");
      return;
    }

    UpdateReview(reviewId, { status: "approved" });
    setIsOpen(false);
    mutate(); // Assuming this triggers a data refresh
  };

  const RejectededHandler = (e) => {
    e.preventDefault();

    // Extract ID from data (assuming it's accessible)
    const reviewId = data?._id;

    if (!reviewId) {
      console.error("Missing review ID for update.");
      toast.error("Failed to update review: Missing review ID.");
      return;
    }

    UpdateReview(reviewId, { status: "rejected" });
    setIsOpen(false);
    mutate(); // Assuming this triggers a data refresh
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/80 backdrop-blur-sm p-8 fixed inset-0 z-50 grid place-items-center cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0.95, rotate: "2deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0.95, rotate: "-2deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-blue-500 to-slate-800 text-white p-8 rounded-lg w-full max-w-4xl shadow-2xl cursor-default relative overflow-hidden"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[200px] absolute z-0 top-10 left-10" />
            <div className="relative z-10 space-y-8 max-h-[80vh] overflow-y-auto p-4">
              <div className="flex gap-4 items-center">
                <span className={label}>Title</span>
                <h3 className="text-3xl text-slate-100 capitalize">
                  {data?.title}
                </h3>
              </div>
              <div className="flex gap-4 items-center">
                <span className={label}>Description</span>
                <p className="text-lg text-slate-100">{data?.description}</p>
              </div>
              <div className="flex gap-4 items-start">
                <span className={label}>Code</span>
                <pre
                  ref={codeRef}
                  className="bg-gray-900 text-white rounded-lg py-4 px-6 overflow-auto"
                >
                  <code className="language-javascript">{data?.code}</code>
                </pre>
              </div>
              <div className="flex gap-4 items-center">
                <span className={label}>Comment</span>
                <p className="text-base text-slate-100">{data?.comment}</p>
              </div>
              <div className="flex justify-end gap-2">
                {data?.status !== "open" && (
                  <button className="bg-yellow-500 transition-colors text-white font-semibold py-2 px-4 rounded hover:opacity-90">
                    Open
                  </button>
                )}
                <button
                  className="bg-green-500 transition-colors text-white font-semibold py-2 px-4 rounded hover:opacity-90"
                  onClick={ApprovedHandler}
                >
                  Approved
                </button>
                <button
                  className="bg-red-500 transition-colors text-white font-semibold py-2 px-4 rounded hover:opacity-90"
                  onClick={RejectededHandler}
                >
                  Rejected
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
