import React, { useContext, useState } from "react";
import { IoIosChatbubbles } from "react-icons/io";
import { dateFormatter } from "../../utils";
import { ProjectContext } from "../../context/ProjectContext";

const Activity = ({ activities, id }) => {
  const [type, setType] = useState();
  const [activity, setActivity] = useState("");

  const { PostActivity } = useContext(ProjectContext);

  const CheckboxData = [
    { name: "Started" },
    { name: "In Progress" },
    { name: "Completed" },
    { name: "Commented" },
    { name: "Bug" },
    { name: "Assigned" },
  ];

  console.log(activities, id);
  const handleChange = (e) => {
    const { value } = e.target;
    setType(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newData = {
        type,
        activity,
      };
      await PostActivity(newData, id);
      console.log(newData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {/* Activities Separator */}
      <div className="flex flex-col lg:flex-row">
        {/* Activities Details */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Activities Heading */}
          <div>
            <h1 className="text-base font-bold">Activities</h1>
          </div>
          {/* Activities Data */}
          {activities.map((m, index) => (
            <div className="my-2 flex gap-4" key={index}>
              <div>
                <IoIosChatbubbles size={30} />
              </div>
              <div className="chat-bubble">
                <h3 className="text-base text-gray-600">{m.by.fName}</h3>
                <h5 className="text-sm capitalize bg-black p-2 text-white max-w-fit rounded-md">
                  {m.type}
                </h5>
                <time className="text-gray-400 text-sm font-normal">
                  Commented on {dateFormatter(m.date)}
                </time>
                <p className="text-sm text-gray-700 ">{m.activity}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Activities Addition */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="lg:hidden my-2">
            <h1 className="text-base text-gray-700">Enter Activity: </h1>
          </div>
          {/* Activities CheckList */}
          <div className="md:w-1/2 lg:w-[60%] flex flex-wrap items-center gap-4 mb-4">
            {CheckboxData.map((m, index) => (
              <div key={index}>
                <label className="flex items-center cursor-pointer">
                  <span className="label-text pr-2 text-sm">{m.name}</span>
                  <input
                    type="radio" // Change to radio buttons
                    className="checkbox checkbox-success"
                    onChange={handleChange}
                    value={m.name}
                    checked={type === m.name}
                  />
                </label>
              </div>
            ))}
          </div>
          {/* Activities Text-Input */}
          <div className="">
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="border-gray-600 outline-none border-[1px] w-full p-2"
              placeholder="Type your message here..."
              onChange={(e) => setActivity(e.target.value)}
              value={activity}
            ></textarea>
          </div>
          {/* Activities Submission */}
          <div className="max-w-fit">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-400 text-gray-100 border-0 rounded-none hover:bg-blue-300"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
