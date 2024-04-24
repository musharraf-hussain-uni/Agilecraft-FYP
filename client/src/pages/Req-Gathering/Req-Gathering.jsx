import React, { useState } from "react";
import { MdOutlineAdd } from "react-icons/md";
import RequirementGatheringTable from "../../components/Req-gathering/Req-gathering-table";
import { requirementGatheringData } from "../../assets/data";
import AddReq from "../../components/Req-gathering/Add-Requirement";
import { useGetUser } from "../../hooks/get-user";
import { useGetAllRequirement } from "../../hooks/get-req";

const ReqGathering = () => {
  const [project, setProject] = useState("");
  // const [createdBy, setCreatedBy] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useGetUser();
  const { requirements } = useGetAllRequirement();
  console.log("Requirements All: ", requirements);
  // const uniqueCreators = new Set(requirements.map((req) => req.createdBy));
  const uniqueProject = new Set(requirements.map((req) => req.project));

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
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="px-4 py-2 border-black border-2 text-white bg-slate-700"
            >
              <option value="">Filter using project</option>
              {requirements
                .filter((req) => req.project)
                .map((req, index) => (
                  <option value={req.project} key={index}>
                    {req.project}
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
          <RequirementGatheringTable project={project} />
        </div>
      </div>
    </div>
  );
};

export default ReqGathering;

// <div className="max-w-max flex items-center gap-4">
//             <select
//               name=""
//               id=""
//               value={createdBy}
//               onChange={(e) => setCreatedBy(e.target.value)}
//               className="px-4 py-2 border-black border-2 text-white bg-slate-700"
//             >
//               <option value="">Requirement Created By:</option>
//               {Array.from(uniqueCreators).map((creator, index) => (
//                 <option value={creator} key={index}>
//                   {creator}
//                 </option>
//               ))}
//             </select>
//           </div>
