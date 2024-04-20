// Login.jsx
import { useState, useContext } from "react";
import "./SignUp.css"; // Import the CSS file for styling
import { Link } from "react-router-dom";
import vectorSignUp from "./vectorSignUp.png"; // Adjust the path based on your actual file structure
import { AuthContext } from "../../context/AuthContext";
const SignUp = () => {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [options, setOptions] = useState("");

  const { register } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    register(fName, lName, email, password, phoneNumber, options);
  };

  return (
    <>
      <div className="login-container">
        {/* Left Panel */}
        <div className="left-panel">
          <img src={vectorSignUp} alt="" />
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          <div className="right-panel-content">
            <img src="" alt="logo" className="logo" />
            <h1>AGILE CRAFT</h1>
            <h3>Welcome to AgileCraft!! 🌟</h3>
            <p>
              Please sign-in to your account and start the <br />
              journey
            </p>

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="input"
                placeholder="First Name"
                value={fName}
                onChange={(e) => setFName(e.target.value)}
              />
              <input
                type="text"
                className="input"
                placeholder="Last Name"
                value={lName}
                onChange={(e) => setLName(e.target.value)}
              />
              <input
                type="email"
                className="input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="number"
                className="input"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <input type="password" className="input" placeholder="Password" />
              <input
                type="password"
                className="input"
                placeholder="Confirm Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <select
                name="userType"
                id="userType"
                className="input"
                value={options}
                onChange={(e) => setOptions(e.target.value)}
              >
                <option value="Choose the role">Choose the role</option>
                <option value="admin">Admin</option>
                <option value="client">Client</option>
              </select>

              <div className="remember-forgot">
                <div className="remember-me">
                  <input type="checkbox" />
                  <label>Remember me</label>
                </div>
                <aside>Forgot password?</aside>
              </div>
              <button
                type="submit"
                className="bg-[#003175] p-2 text-white hover:bg-blue-700"
              >
                Sign Up
              </button>
              <div className="create-account">
                <p>Already have an account?</p>
                <Link to="/login">LogIn</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
