import React, { useState } from "react";
import UserList from "../../components/user-list/UserList";
import { useGetAllUser } from "../../hooks/get-user";
import AddUser from "../../components/AddUser/AddUser";
import { IoMdAdd } from "react-icons/io";
import UpdateUser from "../../components/AddUser/UpdateUser";

const UserPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [id, setId] = useState(null);

  const { allUsers, loading, error, setAllUsers } = useGetAllUser();

  if (loading) {
    return (
      <div className="h-dvh text-center">
        <span className="loading loading-spinner text-black"></span>
      </div>
    );
  }

  // if (error) {
  //   return <div>Error...</div>;
  // }

  // console.log(error);

  return (
    <div className="bg-[#F2F4F7] mb-8 px-4 md:px-20 lg:px-20 xl:px-24 xxl:px-48 mt-24 md:mt-0">
      <div className="flex justify-between items-center rounded-md">
        <h1 className="xl:text-3xl lg:text-2xl md:text-xl text-lg text-black font-bold md:pl-12 pl-16">
          User
        </h1>

        <div className="mr-4 md:mr-6">
          <button
            className="btn text-lg md:text-md lg:text-lg xl:text-xl bg-gray-300 rounded-lg"
            onClick={() => setOpenAdd(!openAdd)}
          >
            <IoMdAdd /> Add User
          </button>

          <div>
            <AddUser isOpen={openAdd} setIsOpen={setOpenAdd} />
          </div>
        </div>
      </div>

      {/* All User Data Fields*/}
      <div>
        <UserList
          users={allUsers}
          setUsers={setAllUsers}
          isOpen={isOpen}
          setOpen={setIsOpen}
          setId={setId}
        />
      </div>

      <div>
        <UpdateUser isOpen={isOpen} setIsOpen={setIsOpen} id={id} />
      </div>
    </div>
  );
};

export default UserPage;
