import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import avatarImg from "../../assets/avatar.png";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import toast from "react-hot-toast";

const AddUser = ({ isOpen, setIsOpen, mutate }) => {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("fyp@123");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [options, setOptions] = useState("");
  const [img, setImg] = useState("");
  const [showImg, setShowImg] = useState("");

  const { register } = useContext(AuthContext);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{11}$/;

  const handleSubmit = async () => {
    try {
      // Check for empty fields first
      if (
        !email.trim() ||
        !fName.trim() ||
        !lName.trim() ||
        !password.trim() ||
        !phoneNumber.trim() ||
        !options ||
        !img
      ) {
        toast.error("Please fill out all the required fields");
        return; // Exit early if required fields are empty
      }

      // Validate email in a separate check
      if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address");
        return; // Exit early for invalid email
      }

      // Validate password length in a separate check
      if (password.length < 4) {
        toast.error("Please enter a valid password with at least 8 characters");
        return; // Exit early for short password
      }

      // Validate phone number (if applicable)
      if (phoneRegex && !phoneRegex.test(phoneNumber)) {
        toast.error("Please enter a valid 11-digit phone number");
        return; // Exit early for invalid phone number
      }

      // All validations passed, proceed with form submission
      const formData = new FormData();
      formData.append("fName", fName);
      formData.append("lName", lName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phoneNumber", phoneNumber);
      formData.append("options", options);
      formData.append("img", img);

      await register(formData);
      setIsOpen(false);
      mutate();
    } catch (error) {
      setIsOpen(true);
      console.error("Error during form submission:", error); // Log the error for debugging
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setShowImg(imageUrl);
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
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-center mb-2 text-slate-300">
                Add User
              </h3>

              <div className="my-4">
                <label htmlFor="fName" className="relative block w-full">
                  <input
                    type="text"
                    id="fName"
                    className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black"
                    value={fName}
                    onChange={(e) => setFName(e.target.value)}
                  />
                  <span
                    className="absolute left-2 top-0 -translate-y-1/2
          scale-100 bg-blue-500 rounded px-0.5 text-base text-white font-medium transition-transform
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
                    onChange={(e) => setLName(e.target.value)}
                  />
                  <span
                    className="absolute left-2 top-0 -translate-y-1/2
                scale-100 bg-blue-500 rounded px-0.5 text-base text-white font-medium transition-transform
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
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <span
                      className="absolute left-2 top-0 -translate-y-1/2
                scale-100 bg-blue-500 rounded px-0.5 text-base text-white font-medium transition-transform
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
                scale-100 bg-blue-500 rounded px-0.5 text-base text-white font-medium transition-transform
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
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <span
                      className="absolute left-2 top-0 -translate-y-1/2
                scale-100 bg-blue-500 rounded px-0.5 text-base text-white font-medium transition-transform
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
                      <option value={"project manager"}>Project Manager</option>
                      <option value={"Software Q/A"}>Software Q/A</option>
                      <option value={"developer"}>Developer</option>
                    </select>
                    <span
                      className="absolute left-2 top-0 -translate-y-1/2
                scale-100 bg-blue-500 rounded px-0.5 text-base text-white font-medium transition-transform
                peer-focus:scale-0
                
                "
                    >
                      Options
                    </span>
                  </label>
                </div>

                <div className="flex my-2 justify-center items-center">
                  <img
                    src={showImg || avatarImg}
                    alt="user img"
                    name="userimg"
                    accept=".png .jpg .jpeg"
                    className="w-12 h-12 md:w-40 md:h-40 object-cover rounded-full"
                  />
                  <input
                    type="file"
                    className="file-input file-input-bordered file-input-xs w-full max-w-xs md:file-input-sm"
                    onChange={handleFileChange}
                    required
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
                  className="bg-white hover:opacity-90 transition-opacity text-blue-600 font-semibold w-full py-2 rounded"
                >
                  Add User
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddUser;
