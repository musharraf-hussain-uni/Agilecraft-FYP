import { useContext } from "react";
import "./sidebar-menu.css";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const SidebarMenu = ({
  title,
  L1,
  L2,
  L3,
  L4,
  L5,
  L6,
  L7,
  L8,
  L9,
  link1,
  link2,
  link3,
  link4,
  link5,
  link6,
  link7,
  link9,
  Icon1,
  Icon2,
  Icon3,
  Icon4,
  Icon5,
  Icon6,
  Icon7,
  Icon8,
  Icon9,
  userRole,
  setIsOpen,
  open,
}) => {
  const { pathname } = useLocation();
  const { logout } = useContext(AuthContext);

  let condition = userRole == "admin" || userRole == "Project Manager";

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="sidebar-menu">
      <h3 className="sidebar-title">{title}</h3>
      <ul className="sidebar-list">
        {L1 && (
          <li
            className={`sidebar-list-items ${
              pathname === link1 ? "bg-slate-500" : ""
            }`}
          >
            <Icon1 className="sidebar-icons" />
            <Link
              to={link1}
              className="links w-full"
              onClick={() => setIsOpen(!open)}
            >
              {L1}
            </Link>
          </li>
        )}
        {userRole === "admin" && (
          <>
            {L2 && (
              <li
                className={`sidebar-list-items ${
                  pathname === link2 ? "bg-slate-500" : ""
                }`}
                onClick={() => setIsOpen(!open)}
              >
                <Icon2 className="sidebar-icons" />
                <Link to={link2} className="links w-full">
                  {L2}
                </Link>
              </li>
            )}
          </>
        )}
        {condition && L3 && (
          <li
            onClick={() => setIsOpen(!open)}
            className={`sidebar-list-items ${
              pathname === link3 ? "bg-slate-500" : ""
            }`}
          >
            <Icon3 className="sidebar-icons" />
            <Link to={link3} className="links w-full">
              {L3}
            </Link>
          </li>
        )}
        {L4 && (
          <li
            onClick={() => setIsOpen(!open)}
            className={`sidebar-list-items ${
              pathname === link4 ? "bg-slate-500" : ""
            }`}
          >
            <Icon4 className="sidebar-icons" />
            <Link to={link4} className="links w-full">
              {L4}
            </Link>
          </li>
        )}
        {L5 && (
          <li
            onClick={() => setIsOpen(!open)}
            className={`sidebar-list-items ${
              pathname === link5 ? "bg-slate-500" : ""
            }`}
          >
            <Icon5 className="sidebar-icons" />
            <Link to={link5} className="links w-full">
              {L5}
            </Link>
          </li>
        )}
        {L6 && (
          <li
            onClick={() => setIsOpen(!open)}
            className={`sidebar-list-items ${
              pathname === link6 ? "bg-slate-500" : ""
            }`}
          >
            <Icon6 className="sidebar-icons" />
            <Link to={link6} className="links w-full">
              {L6}
            </Link>
          </li>
        )}
        {L7 && (
          <li
            onClick={() => setIsOpen(!open)}
            className={`sidebar-list-items ${
              pathname === link7 ? "bg-slate-500" : ""
            }`}
          >
            <Icon7 className="sidebar-icons" />
            <Link to={link7} className="links w-full">
              {L7}
            </Link>
          </li>
        )}
        {L9 && (
          <li
            onClick={() => setIsOpen(!open)}
            className={`sidebar-list-items ${
              pathname === link9 ? "bg-slate-500" : ""
            }`}
          >
            <Icon9 className="sidebar-icons" />
            <Link to={link9} className="links w-full">
              {L9}
            </Link>
          </li>
        )}
        {L8 && (
          <li className={`flex items-center px-2 w-full cursor-pointer`}>
            <div onClick={handleLogout} className="text-[#F2F4F7] flex gap-6">
              <Icon8 className="text-[#F2F4F7]" />
              {L8}
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SidebarMenu;
