import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="join grid grid-cols-2 m-auto mt-10 w-1/3 border-2 border-black">
      <button
        className="join-item btn btn-outline disabled:text-slate-700"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1} // Set disabled to true if currentPage is 1
      >
        Previous page
      </button>

      <button
        className="join-item btn btn-outline disabled:text-slate-700"
        onClick={() => onPageChange(currentPage + 1)} // Wrap inside arrow function and use curly braces
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
