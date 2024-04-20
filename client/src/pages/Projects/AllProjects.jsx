import React, { useState } from "react";
import Table from "../../components/Projects/Table";
// import { tasks } from "../../assets/data";
import Pagination from "../../components/Pagination/Pagination";
import { useGetAllProject } from "../../hooks/get-project";

const ITEMS_PER_PAGE = 4;

const AllProjects = () => {
  const { projects, loading } = useGetAllProject();
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = ITEMS_PER_PAGE * currentPage;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = projects.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full">
      <Table
        tasks={currentItems}
        setOpenDialog={setOpenDialog}
        openDialog={openDialog}
        selected={selected}
        setSelected={setSelected}
        loading={loading}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default AllProjects;
