// Login.jsx
import { useContext, useState } from "react";
import "./Login.css"; // Import the CSS file for styling
import { Link } from "react-router-dom";
import vectorLogin from "./vectorLogin.png"; // Adjust the path based on your actual file structure
import { AuthContext } from "../../context/AuthContext";
import logo from "./AgileLogo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    login(email, password);
  };

  return (
    <>
      <div className="login-container">
        {/* Left Panel */}
        <div className="left-panel">
          {/* Add your vector image and other content for the left panel */}
          <img src={vectorLogin} alt="" />
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          <div className="right-panel-content">
            <img src={logo} alt="logo" className="logo" />
            <h1>Enhance Tasks Management System</h1>
            <h3>Welcome to ETMS!! 🌟</h3>
            <p>
              Please sign-in to your account and start the <br />
              journey
            </p>

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                className="input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                className="input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="remember-forgot">
                <div className="remember-me">
                  <input type="checkbox" />
                  <label>Remember me</label>
                </div>
                <aside>Forgot password?</aside>
              </div>

              <button
                onClick={handleSubmit}
                type="submit"
                className="bg-[#003175] text-white cursor-pointer p-2 hover:bg-blue-500"
              >
                Log In
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

// {}
