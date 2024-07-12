import React, { useState } from "react";
import Activity from "./Activity";
import { CiViewTimeline } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";
import {
  PRIOTITYSTYLES,
  BGS,
  dateFormatter,
  PRIOTITYSTYLESBG,
} from "../../utils";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import UserInfo from "../../components/UserInfo/UserInfo";
import clsx from "clsx";
import { useGetSingleProject } from "../../hooks/get-project";
import { useGetUser } from "../../hooks/get-user";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp size={20} />,
  medium: <MdKeyboardArrowUp size={20} />,
  low: <MdKeyboardArrowDown size={20} />,
};

const SingleProject = () => {
  const [selected, setSelected] = useState(0);
  const { id } = useParams();
  const { user } = useGetUser();
  const { data, loading, mutate } = useGetSingleProject(id);

  // console.log(user._id);
  // console.log(data);

  const authorized = user && data?.team?.some((t) => t._id === user?._id);

  // console.log(user?._id)
  // console.log(authorized);

  if (loading) {
    return (
      <div className="w-full text-center">
        <span className="loading loading-spinner bg-[#003175] loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="px-4 md:px-8 lg:px-12 xl:px-24 xxl:px-48">
      <div className="bg-white h-full py-5">
        {/*Tabs*/}
        <div className="lg:w-full flex items-center m-5">
          <div role="tablist" className="tabs tabs-boxed ">
            <a
              role="tab"
              className={`flex gap-2 tab ${
                selected === 0 ? "tab-active" : null
              }`}
              onClick={() => setSelected(0)}
            >
              <CiViewTimeline size={20} />
              <span className="text-base">View Details</span>
            </a>
            {authorized ? (
              <a
                role="tab"
                className={`flex gap-2 tab ${
                  selected === 1 ? "tab-active" : null
                }`}
                onClick={() => setSelected(1)}
              >
                <FaEdit size={20} />
                <span className="text-base">Activities/Timeline</span>
              </a>
            ) : (
              <a role="tab" className="flex gap-2 tab">
                <FaEdit size={20} />
                <span className="text-base">
                  You are not the part of this project. Can&apos;t view
                  conversion.
                </span>
              </a>
            )}
          </div>
        </div>
        {/*Main Content*/}
        {/*View project*/}
        {selected === 0 && (
          <div className="m-5">
            <div className="flex">
              <div className="flex-1 space-x-8">
                <div>
                  <h2 className="text-xl font-semibold mb-3">
                    <span className="text-xl font-bold">Project Name:</span>{" "}
                    <span className="underline">{data.title}</span>
                  </h2>
                  <div className="flex gap-4 py-2 flex-wrap">
                    <p className="text-gray-700 mb-3 font-bold">
                      <span className="text-base">Created On: </span>
                      {dateFormatter(data.createdAt)}
                    </p>
                    <p className="text-gray-700 mb-3 font-bold">
                      <span className="text-base">Updated On: </span>
                      {dateFormatter(data.updatedAt)}
                    </p>
                    <p className="text-gray-700 mb-3 font-bold">
                      <span className="text-base">Deadline On: </span>
                      {dateFormatter(data.date)}
                    </p>
                  </div>
                  <p className="text-gray-700 mb-3 flex gap-4 text-lg items-center">
                    <span>Priority: </span>
                    <span
                      className={`flex items-center gap-4 ${
                        PRIOTITYSTYLES[data.priority]
                      } ${
                        PRIOTITYSTYLESBG[data.priority]
                      } px-4 py-2 rounded-lg capitalize`}
                    >
                      {ICONS[data.priority]}
                      {data.priority}
                    </span>
                  </p>
                  {/*Assets length*/}
                  <div className="my-5">
                    <hr className="border-gray-500 py-2" />
                    <div className="space-x-8">
                      <span className="text-sm">
                        Assets: {data.assets?.length}
                      </span>
                    </div>
                  </div>
                  {/*Team Members*/}
                  <div className="my-5">
                    <hr className="py-2 border-gray-500" />
                    <h1 className="pb-4">Project Team Members</h1>

                    {data.team?.map((m, index) => (
                      <div key={index}>
                        <div className="flex items-center gap-8 mb-2">
                          <div
                            className={clsx(
                              "w-4 h-4 md:w-7 md:h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                              BGS[index % BGS.length]
                            )}
                          >
                            <UserInfo user={m} />
                          </div>
                          <div className="">
                            <h3 className="text-base text-gray-700">
                              {m.fName}
                            </h3>
                            <p className="text-sm">{m.role}</p>
                          </div>
                        </div>
                        <hr className="py-2 border-gray-500" />
                      </div>
                    ))}
                  </div>
                  {/*Subtask*/}
                  {/*
                  <div>
                    <h1 className="pb-2">Subtasks</h1>
                    <div className="flex flex-wrap gap-2">
                      {task.subTasks.map((m, index) => (
                        <div
                          key={index}
                          className="flex flex-col bg-purple-300 max-w-fit px-4 py-2 rounded-lg items-center gap-2"
                        >
                          <h3 className="text-base text-purple-600">
                            {m.title}
                          </h3>
                          <p className="text-white">{m.tag}</p>
                        </div>
                      ))}
                    </div>
                  </div>*/}
                </div>
              </div>
              <div className="flex-1 px-4 md:px-8">
                <div>
                  <h1 className="text-xl pb-4 font-bold">Assets</h1>
                  <div className="flex flex-wrap gap-4">
                    {data &&
                      data?.assets.map((m, index) => (
                        <div key={index} className="cursor-pointer">
                          <img
                            src={`http://localhost:3001/${m}`}
                            alt=""
                            className="w-32 h-32 transition-all ease-in-out hover:w-80 hover:h-80 object-cover border border-gray-500"
                          />
                        </div>
                      ))}
                    {data.assets.length === 0 && <p>No Image Added</p>}
                  </div>

                  <div className="text-lg text-balance font-normal my-4">
                    Description:{" "}
                    <span className="text-base">{data.description}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/*Update Project*/}
        {selected === 1 && (
          <div className="m-5">
            <Activity
              activities={data?.activities}
              mutate={mutate}
              id={data?._id}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProject;
