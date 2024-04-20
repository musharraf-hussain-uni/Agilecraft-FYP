import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { FaProjectDiagram } from "react-icons/fa";
import { useGetUserById } from "../../hooks/get-user";
import { UserContext } from "../../context/UserContext";

const UpdateUser = ({ isOpen, setIsOpen, id }) => {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("fyp@123");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [options, setOptions] = useState("");
  const [img, setImg] = useState("");

  const { singleUser } = useGetUserById(id);
  const { UpdateUser } = useContext(UserContext);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
  };

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append("fName", fName);
    formData.append("lName", lName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phoneNumber", phoneNumber);
    formData.append("options", options);
    formData.append("img", img);

    UpdateUser(id, formData);

    setIsOpen(false);
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
            className="bg-gradient-to-br from-slate-700 to-gray-600 text-white p-6 rounded-lg w-full max-w-lg lg:max-w-xl shadow-xl cursor-default relative overflow-hidden"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                <FaProjectDiagram />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2 text-slate-300">
                Update User {id}
              </h3>

              <div className="my-4">
                <label htmlFor="fName" className="relative block w-full">
                  <input
                    type="text"
                    id="fName"
                    className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black"
                    value={fName}
                    placeholder={singleUser?.fName}
                    onChange={(e) => setFName(e.target.value)}
                  />
                  <span
                    className="absolute left-2 top-0 -translate-y-1/2
          scale-100 bg-violet-500 rounded px-0.5 text-base text-white font-medium transition-transform
          peer-focus:scale-0
          "
                  >
                    First Name
                  </span>
                </label>

                <label htmlFor="lname" className="relative block w-full">
                  <input
                    type="text"
                    id="lname"
                    className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black"
                    value={lName}
                    placeholder={singleUser?.lName}
                    onChange={(e) => setLName(e.target.value)}
                  />
                  <span
                    className="absolute left-2 top-0 -translate-y-1/2
                scale-100 bg-violet-500 rounded px-0.5 text-base text-white font-medium transition-transform
                peer-focus:scale-0
                "
                  >
                    Last Name
                  </span>
                </label>

                <div className="flex gap-2">
                  <label htmlFor="email" className="relative block w-1/2">
                    <input
                      type="text"
                      id="email"
                      className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black "
                      value={email}
                      placeholder={singleUser?.email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <span
                      className="absolute left-2 top-0 -translate-y-1/2
                scale-100 bg-violet-500 rounded px-0.5 text-base text-white font-medium transition-transform
                peer-focus:scale-0
                
                "
                    >
                      Email
                    </span>
                  </label>
                  <label htmlFor="pasword" className="relative block w-1/2">
                    <input
                      type="text"
                      id="pasword"
                      className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black "
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      className="absolute left-2 top-0 -translate-y-1/2
                scale-100 bg-violet-500 rounded px-0.5 text-base text-white font-medium transition-transform
                peer-focus:scale-0
                
                "
                    >
                      Password
                    </span>
                  </label>
                </div>
                <div className="flex gap-2">
                  <label htmlFor="email" className="relative block w-1/2">
                    <input
                      type="text"
                      id="email"
                      className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black "
                      value={phoneNumber}
                      placeholder={singleUser?.phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <span
                      className="absolute left-2 top-0 -translate-y-1/2
                scale-100 bg-violet-500 rounded px-0.5 text-base text-white font-medium transition-transform
                peer-focus:scale-0
                
                "
                    >
                      Phone Number
                    </span>
                  </label>
                  <label htmlFor="pasword" className="relative block w-1/2">
                    <select
                      className="select select-bordered w-full max-w-xs my-2 md:my-2"
                      value={options}
                      onChange={(e) => setOptions(e.target.value)}
                    >
                      <option>Select User Role</option>
                      <option value={"admin"}>Admin</option>
                      <option value={"Project manager"}>Project Manager</option>
                      <option value={"Software Q/A"}>Software Q/A</option>
                      <option value={"Developer"}>Developer</option>
                    </select>
                    <span
                      className="absolute left-2 top-0 -translate-y-1/2
                scale-100 bg-violet-500 rounded px-0.5 text-base text-white font-medium transition-transform
                peer-focus:scale-0
                
                "
                    >
                      Options
                    </span>
                  </label>
                </div>

                <div className="my-2">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                  />
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
                  Update User
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpdateUser;
