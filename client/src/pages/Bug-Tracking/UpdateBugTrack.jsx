import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect, useContext } from "react";
import { FaProjectDiagram } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import { useGetUser } from "../../hooks/get-user";
import { useNavigate, useParams } from "react-router-dom";
import { GetBugTrack } from "../../hooks/get-bug-track";
import SelectList from "../../components/Projects/SelectList";
import UserList from "../../components/Projects/UserList";
import { BiImages } from "react-icons/bi";
import { BugTrackContext } from "../../context/BugTrackContext";

const SEVERITY = ["CRITICAL", "MAJOR", "MODERATE", "LOW"];
const PRIORIRY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];
const STATUS = ["OPEN", "STARTED", "CLOSED"];

export default function UpdateBugTrack() {
  const { id } = useParams();
  const task = "";
  const { UpdateBugTrack } = useContext(BugTrackContext);

  const { data: singleBugTrack, loading } = GetBugTrack(id);

  console.log(singleBugTrack);

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

  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    description: "",
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

  useEffect(() => {
    if (singleBugTrack) {
      // Update form data with fetched values
      setData({
        title: singleBugTrack.title,
        description: singleBugTrack.description,
        // updatedBy: fullName || "", // Add or update the 'updatedBy' field
      });

      setSeverity(singleBugTrack?.severity?.toUpperCase());
      setStatus(singleBugTrack?.status?.toUpperCase());
      setPriority(singleBugTrack?.priority?.toUpperCase());
    }
  }, [singleBugTrack]);

  //   const newData = {
  //     title: data.title,
  //     description: data.description,
  //     severity: severity.toLowerCase(),
  //     priority: priority.toLowerCase(),
  //     status: status.toLowerCase(),
  //     assignedTo: team,
  //     media: assets,
  //   };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("status", status.toLowerCase());
      formData.append("severity", severity.toLowerCase());
      formData.append("priority", priority.toLowerCase());
      //   formData.append("assignedTo", team);
      team.forEach((teamId) => {
        formData.append("assignedTo", teamId);
      });
      assets.forEach((file) => {
        formData.append("media", file);
      });

      //   console.log(newData);

      await UpdateBugTrack(id, formData);

      setData({
        title: "",
        description: "",
      });
      //   navigate("/dashboard/bug-tracking");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="w-full text-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className="mx-24 my-12
    "
      >
        <motion.div className="bg-gradient-to-br from-blue-400 to-slate-700 text-white p-6 rounded-lg w-full px-24">
          <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
          <div className="relative z-10">
            <div className="bg-white w-12 h-12 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
              <FaProjectDiagram />
            </div>
            <h3 className="text-2xl font-bold text-center mb-2 text-slate-300">
              Update Test Case
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

              <label htmlFor="module" className="relative block w-full">
                <SelectList
                  label="Current Status"
                  lists={STATUS}
                  selected={status}
                  setSelected={setStatus}
                />
              </label>
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
                <div className="relative block w-1/2">
                  <UserList setTeam={setTeam} team={team} />
                </div>

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
                onClick={() => navigate("/dashboard/testing")}
                className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
              >
                Go back
              </button>
              <button
                onClick={handleSubmit}
                className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
              >
                Update
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
