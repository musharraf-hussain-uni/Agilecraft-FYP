import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BugTrackContext } from "../../context/BugTrackContext";
import { useGetUser } from "../../hooks/get-user";
import { AnimatePresence, motion } from "framer-motion";
import { FaProjectDiagram } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import SelectList from "../Projects/SelectList";
import UserList from "../Projects/UserList";
import { BiImages } from "react-icons/bi";
import { useGetAllProject } from "../../hooks/get-project";

const SEVERITY = ["CRITICAL", "MAJOR", "MODERATE", "LOW"];
const PRIORIRY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];
const STATUS = ["OPEN", "STARTED", "CLOSED"];

export default function BugTrackingCreation({ isOpen, setIsOpen, mutate }) {
  const task = "";

  const { user } = useGetUser();

  const { CreateBugTrack } = useContext(BugTrackContext);

  const [team, setTeam] = useState(task?.team || []);
  const [severity, setSeverity] = useState(
    task?.stage?.toUpperCase() || SEVERITY[0]
  );
  const [status, setStatus] = useState(
    task?.status?.toUpperCase() || STATUS[1]
  );
  const [priority, setPriority] = useState(
    task?.priority?.toUpperCase() || PRIORIRY[2]
  );

  const { projects } = useGetAllProject();

  const [data, setData] = useState({
    title: "",
    description: "",
    reportedBy: "",
    project: "",
  });

  const [assets, setAssets] = useState([]);

  const handleSelect = (e) => {
    const selectedFiles = Array.from(e.target.files); // Convert FileList to array
    setAssets(selectedFiles);
  };
  const handleChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;

    setData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const fullName = user?.fName + " " + user?.lName;

  useEffect(() => {
    if (user) {
      setData((prevData) => ({
        ...prevData,
        reportedBy: fullName || "",
      }));
    }
  }, [user, fullName]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("status", status.toLowerCase());
      formData.append("severity", severity.toLowerCase());
      formData.append("priority", priority.toLowerCase());
      formData.append("project", data.project);
      team.forEach((teamId) => {
        formData.append("assignedTo", teamId);
      });
      assets.forEach((file) => {
        formData.append("media", file);
      });
      formData.append("reportedBy", data.reportedBy);

      await CreateBugTrack(formData);

      setData({
        title: "",
        description: "",
        project: "",
      });
      setTeam([]);
      setAssets([]);
      setIsOpen(false);
      mutate();
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
            className="bg-gradient-to-br from-blue-400 to-slate-700 text-white p-6 rounded-lg w-full max-w-xl lg:max-w-2xl shadow-xl cursor-default relative overflow-hidden"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-center mb-2 text-slate-300">
                Create A New Bug
              </h3>

              <div className="my-4">
                <label htmlFor="title" className="relative block w-full">
                  <input
                    type="text"
                    id="title"
                    className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black"
                    value={data.title}
                    onChange={handleChange}
                  />
                  <span
                    className="absolute left-2 top-0 -translate-y-1/2
scale-100 bg-blue-500 rounded px-0.5 text-base text-white font-medium transition-transform
peer-focus:scale-0
"
                  >
                    Title
                  </span>
                </label>

                <label htmlFor="description" className="relative block w-full">
                  <textarea
                    type="text"
                    id="description"
                    cols={3}
                    rows={3}
                    className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black"
                    value={data.description}
                    onChange={handleChange}
                  />
                  <span
                    className="absolute left-2 top-0 -translate-y-1/2
  scale-100 bg-blue-500 rounded px-0.5 text-base text-white font-medium transition-transform
  peer-focus:scale-0
  "
                  >
                    Description
                  </span>
                </label>

                <label htmlFor="" className="relative block">
                  <select
                    id=""
                    value={data.project}
                    onChange={(e) =>
                      setData({ ...data, project: e.target.value })
                    }
                    className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black pb-4"
                  >
                    <option value="">Choose Project</option>
                    {projects.map((project, index) => (
                      <option key={index} value={project.title}>
                        {project.title}
                      </option>
                    ))}
                  </select>
                  <span
                    className="absolute left-2 top-0 -translate-y-1/2
                scale-100 bg-blue-500 rounded px-0.5 text-base text-white font-medium transition-transform
                peer-focus:scale-0
                "
                  >
                    Choose Project
                  </span>
                </label>

                <div className="flex items-center gap-4">
                  <label htmlFor="module" className="relative block w-1/2">
                    <SelectList
                      label="Current Status"
                      lists={STATUS}
                      selected={status}
                      setSelected={setStatus}
                    />
                  </label>
                  <div className="relative block w-1/2 mt-2">
                    <UserList setTeam={setTeam} team={team} />
                  </div>
                </div>
                <div className="flex gap-4">
                  <SelectList
                    label="Task Stage"
                    lists={SEVERITY}
                    selected={severity}
                    setSelected={setSeverity}
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

                <div className="flex gap-2 items-center">
                  <label
                    htmlFor="createdby"
                    className="relative block w-1/2 mt-10"
                  >
                    <input
                      type="text"
                      id="createdby"
                      className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black "
                      value={fullName}
                      onChange={handleChange}
                    />
                    <span
                      className="absolute left-2 top-0 -translate-y-1/2
        scale-100 bg-blue-500 rounded px-0.5 text-base text-white font-medium transition-transform
        peer-focus:scale-0
        
        "
                    >
                      Created By
                    </span>
                  </label>

                  <div className="flex-1 flex items-center justify-center mt-4">
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
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                >
                  Go back
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                >
                  Create
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
