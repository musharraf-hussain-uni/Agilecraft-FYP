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

  const { data, loading, mutate } = useGetAllUser();

  if (loading) {
    return (
      <div className="w-full h-full text-center">
        <span className="loading loading-spinner bg-[#003175] loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="mb-8 px-4 md:px-20 lg:px-20 xl:px-24 xxl:px-48 mt-24 md:mt-0">
      <div className="flex justify-between items-center rounded-md">
        <h1 className="xl:text-3xl lg:text-2xl md:text-xl text-lg text-[#003175] font-bold md:pl-12 pl-16">
          User
        </h1>

        <div className="mr-4 md:mr-6">
          <button
            className="btn text-lg md:text-md lg:text-lg xl:text-xl bg-gradient-to-tr from-blue-600 to-gray-600 text-white rounded-lg"
            onClick={() => setOpenAdd(!openAdd)}
          >
            <IoMdAdd /> Add User
          </button>

          <div>
            <AddUser isOpen={openAdd} setIsOpen={setOpenAdd} mutate={mutate} />
          </div>
        </div>
      </div>

      {/* All User Data Fields*/}
      <div>
        <UserList
          data={data}
          isOpen={isOpen}
          setOpen={setIsOpen}
          setId={setId}
          loading={loading}
          mutate={mutate}
        />
      </div>

      <div>
        <UpdateUser
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          id={id}
          mutate={mutate}
        />
      </div>
    </div>
  );
};

export default UserPage;
