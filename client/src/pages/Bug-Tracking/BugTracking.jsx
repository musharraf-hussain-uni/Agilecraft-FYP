import React, { Fragment, useState } from "react";
import { GetAllBugTracks } from "../../hooks/get-bug-track";
import { MdAdd } from "react-icons/md";
import BugTrackingTable from "../../components/Bug-Tracking/Bug-Tracking-Table";
import BugTrackingCreation from "../../components/Bug-Tracking/Bug-Tracking-Creation-Modal";

const BugTracking = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data, loading, mutate } = GetAllBugTracks();

  const [filter, setFilter] = useState("");

  const uniqueProjects = [...new Set(data.map((req) => req.project))];

  return (
    <Fragment>
      <div className="px-4 md:px-8 lg:px-12 xl:px-24 xxl:px-48">
        <div className="space-y-4 flex-1 h-full">
          <div className="flex justify-between items-center">
            <div className="max-w-max flex items-center gap-4">
              <select
                name=""
                id=""
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 text-white bg-[#003175] rounded-xl shadow-md bg outline-none"
              >
                <option value="">Filter using project name</option>
                {uniqueProjects.map((project, index) => (
                  <option value={project} key={index}>
                    {project}
                  </option>
                ))}
              </select>
            </div>
            <div
              className="bg-gradient-to-tr from-blue-600 to-gray-600 text-center p-2 cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <p className="text-white font-bold flex gap-2">
                <span>
                  <MdAdd size={20} />
                </span>
                Create A New Bug Track
              </p>
            </div>
            <BugTrackingCreation
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              mutate={mutate}
            />
          </div>
          <div className="py-8 px-4">
            <BugTrackingTable
              data={data}
              loading={loading}
              mutate={mutate}
              filter={filter}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BugTracking;
