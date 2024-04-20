import "./sidebar.module.css";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import PersonIcon from "@mui/icons-material/Person";
import StorefrontIcon from "@mui/icons-material/Storefront";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SidebarMenu from "../Sidebar-menu/Sidebar-menu";
import avatarImg from "../../assets/avatar.png";
import { RxCrossCircled } from "react-icons/rx";
import { useGetUser } from "../../hooks/get-user";
import { useEffect, useState } from "react";

const Sidebar = ({ setOpen, isOpen }) => {
  const { user } = useGetUser();
  const [userImg, setUserImg] = useState("");

  let role = user?.role;

  useEffect(() => {
    const newUserImg =
      user?.img === "" ? avatarImg : `http://localhost:3001/${user?.img}`;
    setUserImg(newUserImg);
  }, [user]);

  return (
    <div className="sidebar">
      <div className={`sidebar-wrapper`}>
        <div
          className="absolute top-0 right-0 flex justify-end text-white cursor-pointer"
          onClick={() => setOpen(!isOpen)}
        >
          <RxCrossCircled size={30} color="white" />
        </div>

        <div className="flex m-6 items-center justify-between gap-10">
          <div>
            <img
              src={userImg}
              alt="avatar-img"
              className="w-12 h-12 rounded-full border-2 border-white object-cover"
            />
          </div>
          <h3 className="text-white antialiased text-sm capitalize">
            Hello! {role}
          </h3>
        </div>

        <SidebarMenu
          title="Dashboard"
          L1="Home"
          Icon1={LineStyleIcon}
          link1="/dashboard"
          setIsOpen={setOpen}
          open={isOpen}
        />
        <SidebarMenu
          title="Services and Projects"
          L2="Users"
          L3="Projects"
          L4="Requirement Gathering"
          L5="Testing"
          L6="Bug Tracking"
          L7="Reviews"
          Icon1={PersonIcon}
          Icon2={StorefrontIcon}
          Icon3={TrendingUpIcon}
          link2="/dashboard/user"
          link3="/dashboard/projects"
          link4="/dashboard/requirement-gathering"
          link5="/dashboard/testing"
          link6="/dashboard/bug-tracking"
          link7="/dashboard/reviews"
          userRole={role}
          setIsOpen={setOpen}
          open={isOpen}
        />
        <SidebarMenu title="Access" L8="Logout" Icon1={LineStyleIcon} />
      </div>
    </div>
  );
};

export default Sidebar;

// <div
//           className="text-center mt-20 cursor-pointer absolute"
//           onClick={() => setOpen(false)}
//         >
//           <p className="text-white">Close</p>
//         </div>
