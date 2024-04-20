import React from "react";
import AddUser from "../../components/AddUser/AddUser";

const CreateUser = () => {
  return (
    <div className="h-screen flex flex-col gap-10 bg-[#F2F4F7] px-4 md:px-8 lg:px-12 xl:px-24 xxl:px-48">
      <h1 className="xl:text-3xl lg:text-2xl md:text-xl text-lg text-white font-bold md:pl-12 pl-16 bg-[#020205] pb-5 rounded-md p-5">
        Create User
      </h1>
      <AddUser />
    </div>
  );
};

export default CreateUser;
