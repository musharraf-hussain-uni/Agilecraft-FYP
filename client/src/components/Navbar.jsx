// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../images/AgileLogo.png";
import "./Navbar.css";

const Navbar = () => {
  const links = ["Home", "Services", "About", "Contact"];
  const [scrolled, setScrolled] = useState(false);

  const handleClick = () => {
    window.location.reload(true);
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`flex items-center justify-between p-2 w-full bg-white-400 border-gray-500 sticky top-0 z-50 ${
        scrolled ? "bg-white shadow-md" : null
      }`}
    >
      <div className="flex gap-4 items-center justify-center">
        <img src={logo} alt="" className="w-14 h-14 object-cover" />
        <h1
          className="font-bold text-3xl uppercase"
          style={{
            background: `-webkit-linear-gradient(#003175, #1274CA)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          E.T.M.S
        </h1>
      </div>
      <div className="flex gap-10">
        {links.map((items, index) => (
          <div key={index}>
            <a href={`#${items}`} className="text-xl text-blue-900 relative">
              {items}
              <div className="absolute bottom--1 left-0 w-0 h-0.5 bg-blue-800 transition-width duration-300 ease-out"></div>
            </a>
          </div>
        ))}
      </div>
      <div>
        <Link
          to="/login"
          className="text-xl capitalize cursor-pointer py-2.5 px-6 bg-[#003175] border-2 border-white text-white rounded-3xl hover:bg-gray-200 hover:border-[#003175] hover:text-[#003175]"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

// <nav className={scrolled ? "scrolled" : ""}>
//         <Link to="/" onClick={handleClick} className="flex items-center justify-center">
//           <img src={logo} alt="Logo" className="w-14 h-14 cursor-pointer" />
//           <h1 className="logo-text">Agile Craft</h1>
//         </Link>

//         {links.map((item, index) => (
//           <ul key={index}>
//             <li>
//               <a href={`#${item}`}>{item}</a>
//             </li>
//           </ul>
//         ))}
//         <div className="button-container">
//           <Link to="/login">
//             <button className="login-button">LogIn</button>
//           </Link>
//         </div>
//       </nav>
