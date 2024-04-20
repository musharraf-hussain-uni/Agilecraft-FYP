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
  link1,
  link2,
  link3,
  link4,
  link5,
  link6,
  link7,
  Icon1,
  Icon2,
  Icon3,
  userRole,
  setIsOpen,
  open,
}) => {
  const { pathname } = useLocation();
  const { logout } = useContext(AuthContext);

  let conditon = userRole == "admin" || userRole == "Project Manager";

  return (
    <div className="sidebar-menu">
      <h3 className="sidebar-title">{title}</h3>
      <ul className="sidebar-list">
        {L1 && (
          <li
            className={`sidebar-list-items ${
              pathname === link1 ? "active" : ""
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
                  pathname === link2 ? "active" : ""
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
        {conditon && L3 && (
          <li
            onClick={() => setIsOpen(!open)}
            className={`sidebar-list-items ${
              pathname === link3 ? "active" : ""
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
              pathname === link4 ? "active" : ""
            }`}
          >
            <Icon1 className="sidebar-icons" />
            <Link to={link4} className="links w-full">
              {L4}
            </Link>
          </li>
        )}
        {L5 && (
          <li
            onClick={() => setIsOpen(!open)}
            className={`sidebar-list-items ${
              pathname === link5 ? "active" : ""
            }`}
          >
            <Icon1 className="sidebar-icons" />
            <Link to={link5} className="links w-full">
              {L5}
            </Link>
          </li>
        )}
        {L6 && (
          <li
            onClick={() => setIsOpen(!open)}
            className={`sidebar-list-items ${
              pathname === link6 ? "active" : ""
            }`}
          >
            <Icon1 className="sidebar-icons" />
            <Link to={link6} className="links w-full">
              {L6}
            </Link>
          </li>
        )}
        {L7 && (
          <li
            onClick={() => setIsOpen(!open)}
            className={`sidebar-list-items ${
              pathname === link7 ? "active" : ""
            }`}
          >
            <Icon1 className="sidebar-icons" />
            <Link to={link7} className="links w-full">
              {L7}
            </Link>
          </li>
        )}
        {L8 && (
          <li className={`flex items-center px-2 w-full cursor-pointer`}>
            <div onClick={logout} className="text-[#F2F4F7] flex gap-6">
              <Icon1 className="text-[#F2F4F7]" />
              {L8}
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SidebarMenu;
