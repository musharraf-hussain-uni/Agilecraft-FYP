import React, { Fragment, useContext, useState } from "react";
// import Box from "@mui/material/Box";
// import { DataGrid } from "@mui/x-data-grid";
// import avatar from "../../assets/avatar.png";
// import { MdDeleteOutline } from "react-icons/md";
// import { MdCalendarViewMonth } from "react-icons/md";
import axios from "axios";
import Pagination from "../Pagination/Pagination";
import { MdDelete, MdOutlineUpdate } from "react-icons/md";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 4;

const UserList = ({ data, setOpen, setId, loading, mutate }) => {
  // const [currentPage, setCurrentPage] = useState(1);
  // const indexOfLastItem = ITEMS_PER_PAGE * currentPage;
  // const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  // const onPageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  console.log(data)

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = ITEMS_PER_PAGE * currentPage;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data?.length / ITEMS_PER_PAGE);
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // const rowsWithId = users?.map((user, index) => ({ ...user, id: index + 1 }));
  // const columns = [
  //   { field: "id", headerName: "ID", width: 90 },
  //   {
  //     field: "img",
  //     headerName: "User Image",
  //     width: 100,
  //     editable: true,
  //     renderCell: (params) => {
  //       return (
  //         <img
  //           src={
  //             params.row.img == ""
  //               ? avatar
  //               : `http://localhost:3001/${params.row.img}`
  //           }
  //           width="100px"
  //           height="100px"
  //           className="w-12 h-12 object-cover rounded-xl"
  //         />
  //       );
  //     },
  //   },
  //   {
  //     field: "fName",
  //     headerName: "First name",
  //     width: 130,
  //     editable: true,
  //   },
  //   {
  //     field: "lName",
  //     headerName: "Last name",
  //     width: 130,
  //     editable: true,
  //   },
  //   {
  //     field: "email",
  //     headerName: "Email Address",
  //     width: 200,
  //     editable: true,
  //   },

  //   {
  //     field: "role",
  //     headerName: "Role",
  //     width: 150,
  //     editable: true,
  //   },
  //   {
  //     field: "phoneNumber",
  //     headerName: "Phone number",
  //     type: "number",
  //     width: 150,
  //     editable: true,
  //   },
  //   {
  //     field: "actions",
  //     headerName: "Actions",
  //     width: 100,
  //     editable: true,
  //     renderCell: (params) => {
  //       return (
  //         <div className="flex gap-4">
  //           <div
  //             className="text-green-500 cursor-pointer"
  //             onClick={() => handleUpdate(params.row._id)}
  //           >
  //             <MdCalendarViewMonth size={20} />
  //           </div>
  //           <div
  //             className="text-red-600 cursor-pointer"
  //             onClick={() => handleDelete(params.row._id)}
  //           >
  //             <MdDeleteOutline size={20} />
  //           </div>
  //         </div>
  //       );
  //     },
  //   },
  // ];

  // const handleDelete = async (id) => {
  //   const token = localStorage.getItem("access_token");
  //   try {
  //     await axios.delete(`http://localhost:3001/api/users/delete/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     const filtered = users.filter((itemId) => itemId._id !== id);
  //     setUsers(filtered);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleUpdate = (id) => {
    setOpen(true);
    setId(id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/users/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      toast.success("User Deleted Successfully!");
      mutate();
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="w-full text-center">
        <span className="loading loading-spinner bg-[#003175] loading-lg"></span>
      </div>
    );
  }

  // console.log(currentItems)

  const EditbuttonStyles =
    "bg-green-500 px-2 py-1 text-xs rounded-lg text-white cursor-pointer capitalize";

  const DeletebuttonStyles =
    "bg-red-500 px-2 py-1 text-xs rounded-lg text-white cursor-pointer capitalize";

  return (
    // <div className="p-5 mt-10">
    //   <Box sx={{ height: 400, width: "100%", backgroundColor: "#ddd" }}>
    //     <DataGrid
    //       rows={rowsWithId}
    //       columns={columns}
    //       initialState={{
    //         pagination: {
    //           paginationModel: {
    //             pageSize: 5,
    //           },
    //         },
    //       }}
    //       pageSizeOptions={[5]}
    //       checkboxSelection
    //     />
    //   </Box>
    // </div>

    <Fragment>
      <div className="overflow-x-auto bg-slate-200 rounded-xl my-6">
        <table className="table">
          {/* head */}
          <thead className="bg-blue-500 text-white">
            <tr>
              <th>
                <p className="text-white uppercase font-bold">S.NO</p>
              </th>
              <th className="text-base">First Name</th>
              <th className="text-base">Last Name</th>
              <th className="text-base">Role</th>
              <th className="text-base">Email Address</th>
              <th className="text-base">Phone No.</th>
              <th className="text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {currentItems.map((data, index) => (
              <tr
                className="border-b-2 border-b-slate-400 hover:bg-blue-300"
                key={data}
              >
                <th>
                  <p className="text-black px-2 py-1 rounded-lg text-center">
                    {indexOfFirstItem + index + 1}
                  </p>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={`http://localhost:3001/${data.img}`}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold capitalize">{data.fName}</div>
                      <div className="text-xs text-gray-600 bg-white p-1 rounded-md max-w-fit">
                        {data._id}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{data.lName}</td>
                <td>
                  <p className="capitalize text-xs p-2 bg-purple-400 text-center text-white font-bold rounded-md">
                    {data.role}
                  </p>
                </td>
                <td>
                  <p className="text-xs text-white bg-slate-700 text-center rounded-md py-2">
                    {data.email}
                  </p>
                </td>
                <td>
                  <p className={"text-sm text-black  py-2"}>
                    {data.phoneNumber}
                  </p>
                </td>
                <td>
                  <div className="flex items-center justify-center gap-2">
                    <div
                      className={DeletebuttonStyles}
                      onClick={() => handleDelete(data._id)}
                    >
                      <MdDelete size={20} />
                    </div>
                    <div
                      className={EditbuttonStyles}
                      onClick={() => handleUpdate(data._id)}
                    >
                      <MdOutlineUpdate size={20} />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Role</th>
              <th>Email Address</th>
              <th>Phone No.</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </Fragment>
  );
};

export default UserList;


