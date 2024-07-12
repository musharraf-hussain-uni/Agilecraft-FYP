import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import UserList from "./UserList";
import SelectList from "./SelectList";
import { BiImages } from "react-icons/bi";

import Textbox from "./Textbox";
import { ProjectContext } from "../../context/ProjectContext";
import { FiAlertCircle } from "react-icons/fi";
import { NotificationContext } from "../../context/Notification-Context";

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORIRY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const CreateProject = ({ isOpen, setIsOpen, mutate }) => {
  const { fetchAllNotifications: Notify } = useContext(NotificationContext);
  const task = "";

  const { AddProject } = useContext(ProjectContext);

  const [data, setData] = useState({
    title: "",
    description: "",
    date: "",
  });

  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const [team, setTeam] = useState(task?.team || []);
  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [priority, setPriority] = useState(
    task?.priority?.toUpperCase() || PRIORIRY[2]
  );

  const errorMessage = (
    <div className="toast toast-bottom transition-all ease-in-out z-50">
      <div className="alert alert-error text-white">
        <span>Title or Description or Deadline Date not added.</span>
      </div>
    </div>
  );

  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleSelect = (e) => {
    const selectedFiles = Array.from(e.target.files); // Convert FileList to array
    setAssets(selectedFiles);
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      if (
        data.title.length <= 0 ||
        data.description.length <= 0 ||
        data.date <= 0
      ) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 1250);
      } else {
        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("date", data.date);
        formData.append("stage", stage);
        formData.append("priority", priority);
        assets.forEach((file) => {
          formData.append("assets", file);
        });

        team.forEach((teamId) => {
          formData.append("team", teamId);
        });

        AddProject(formData);
        mutate();
        Notify();
        setPriority(PRIORIRY[0]);
        setStage(LISTS[0]);
        setTeam([]);
        setAssets([]);
        setTimeout(() => {
          setUploading(false);
          setIsOpen(false);
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll lg:overflow-hidden cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-blue-400 to-slate-700 text-white p-6 rounded-lg w-full max-w-lg lg:max-w-xl shadow-xl cursor-default relative overflow-hidden"
          >
            <div className="relative z-10">
              <h3 className="text-white text-center">Create a new Project</h3>
              <div className="mt-2 flex flex-col gap-4 md:gap-5">
                <Textbox
                  placeholder="Project title"
                  type="text"
                  name="title"
                  label="Task Title"
                  value={data.title}
                  onChange={handleChange}
                  className="w-full rounded"
                />

                <textarea
                  placeholder="Project description"
                  name="description"
                  value={data.description}
                  onChange={handleChange}
                  className="w-full rounded resize-none outline-none bg-transparent border border-gray-200 placeholder:text-gray-300 p-2" // Prevent resizing
                  rows={4} // Adjust as needed
                />

                <UserList setTeam={setTeam} team={team} />

                <div className="flex gap-4">
                  <SelectList
                    label="Task Stage"
                    lists={LISTS}
                    selected={stage}
                    setSelected={setStage}
                  />

                  <div className="w-full">
                    <SelectList
                      label="Priority Level"
                      lists={PRIORIRY}
                      selected={priority}
                      setSelected={setPriority}
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Textbox
                    placeholder="Date"
                    type="date"
                    name="date"
                    label="Deadline Date"
                    className="w-full rounded"
                    value={data.date}
                    onChange={handleChange}
                  />

                  <div className="w-full flex items-center justify-center mt-4">
                    <label
                      className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4"
                      htmlFor="imgUpload"
                    >
                      <input
                        type="file"
                        className="hidden text-slate-200"
                        id="imgUpload"
                        onChange={(e) => handleSelect(e)}
                        accept=".jpg, .png, .jpeg"
                        multiple={true}
                      />
                      <BiImages color="white" />
                      <span className="text-slate-200">Add Assets</span>
                    </label>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                  >
                    Go back
                  </button>
                  <button
                    onClick={submitHandler}
                    className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateProject;
