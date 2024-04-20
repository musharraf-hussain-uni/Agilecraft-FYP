import React, { useState } from "react";
import { MdOutlineAdd } from "react-icons/md";
import RequirementGatheringTable from "../../components/Req-gathering/Req-gathering-table";
import { requirementGatheringData } from "../../assets/data";
import AddReq from "../../components/Req-gathering/Add-Requirement";
import { useGetUser } from "../../hooks/get-user";
import { useGetAllRequirement } from "../../hooks/get-req";

const ReqGathering = () => {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useGetUser();
  const { requirements } = useGetAllRequirement();
  console.log("Requirements All: ", requirements);

  return (
    <div className="w-full h-full px-4 md:px-8 lg:px-12 xl:px-24 xxl:px-48">
      <div className="flex flex-col gap-8">
        <div className="flex justify-end">
          <div className="max-w-max px-4 py-2 bg-black text-white rounded-md text-lg">
            User: <span className="capitalize">{user?.role}</span>
          </div>
        </div>
        {/*Drop Down and Add Requirement addition*/}
        <div className="py-4 flex justify-between">
          <div className="max-w-max flex items-center gap-4">
            <select
              name=""
              id=""
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="px-4 py-2 border-black border-2 text-white bg-slate-700"
            >
              <option value="">Requirement Created By:</option>
              {requirements.map((options, index) => (
                <option value={options.module} key={index}>
                  {options.createdBy}
                </option>
              ))}
            </select>
          </div>

          <div className="max-w-max bg-slate-900 grid place-content-center">
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity"
            >
              <MdOutlineAdd />
              Add Requirement
            </button>

            <AddReq isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        </div>
        {/*Requirement Table*/}
        <div className="pb-4">
          <RequirementGatheringTable project={value} />
        </div>
      </div>
    </div>
  );
};

export default ReqGathering;
