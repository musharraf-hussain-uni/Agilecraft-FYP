import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import avatar from "../../assets/avatar.png";
import { MdDeleteOutline } from "react-icons/md";
import { MdCalendarViewMonth } from "react-icons/md";
import axios from "axios";

const UserList = ({ users, setUsers, setOpen, setId }) => {
  const rowsWithId = users?.map((user, index) => ({ ...user, id: index + 1 }));
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "img",
      headerName: "User Image",
      width: 100,
      editable: true,
      renderCell: (params) => {
        return (
          <img
            src={
              params.row.img == ""
                ? avatar
                : `http://localhost:3001/${params.row.img}`
            }
            width="100px"
            height="100px"
            className="w-12 h-12 object-cover rounded-xl"
          />
        );
      },
    },
    {
      field: "fName",
      headerName: "First name",
      width: 130,
      editable: true,
    },
    {
      field: "lName",
      headerName: "Last name",
      width: 130,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email Address",
      width: 200,
      editable: true,
    },

    {
      field: "role",
      headerName: "Role",
      width: 150,
      editable: true,
    },
    {
      field: "phoneNumber",
      headerName: "Phone number",
      type: "number",
      width: 150,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      editable: true,
      renderCell: (params) => {
        return (
          <div className="flex gap-4">
            <div
              className="text-green-500 cursor-pointer"
              onClick={() => handleUpdate(params.row._id)}
            >
              <MdCalendarViewMonth size={20} />
            </div>
            <div
              className="text-red-600 cursor-pointer"
              onClick={() => handleDelete(params.row._id)}
            >
              <MdDeleteOutline size={20} />
            </div>
          </div>
        );
      },
    },
  ];

  const handleDelete = async (id) => {
    const token = localStorage.getItem("access_token");
    try {
      await axios.delete(`http://localhost:3001/api/users/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const filtered = users.filter((itemId) => itemId._id !== id);
      setUsers(filtered);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = (id) => {
    setOpen(true);
    setId(id);
  };

  return (
    <div className="p-5 mt-10">
      <Box sx={{ height: 400, width: "100%", backgroundColor: "#ddd" }}>
        <DataGrid
          rows={rowsWithId}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
        />
      </Box>
    </div>
  );
};

export default UserList;
