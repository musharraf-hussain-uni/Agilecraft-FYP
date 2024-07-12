import { MdAdminPanelSettings } from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import { FaNewspaper } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import "./featuredinfo.css";
import { useGetUserTask } from "../../hooks/get-user";
import { useEffect, useState } from "react";

const FeaturedInfo = ({ tasks, loading }) => {
  const [stats, setStats] = useState([]); // Initialize stats as an empty array

  // Calculate task counts only after userTask is available
  useEffect(() => {
    if (tasks) {
      const taskCounts = {
        completed: 0,
        todo: 0,
        inProgress: 0,
        medium: 0,
        normal: 0,
      };

      tasks.forEach((task) => {
        taskCounts.completed += task.stage === "completed" ? 1 : 0;
        taskCounts.todo += task.stage === "todo" ? 1 : 0;
        taskCounts.inProgress += task.stage === "in progress" ? 1 : 0; // Assuming a space in "in progress"
        taskCounts.medium += task.priority === "medium" ? 1 : 0;
        taskCounts.normal += task.priority === "normal" ? 1 : 0;
      });

      const updatedStats = [
        {
          _id: "1",
          label: "TOTAL TASK",
          total: tasks.length,
          icon: <FaNewspaper />,
          bg: "bg-[#1d4ed8]",
        },
        {
          _id: "2",
          label: "COMPLTED TASK",
          total: taskCounts.completed,
          icon: <MdAdminPanelSettings />,
          bg: "bg-[#0f766e]",
        },
        {
          _id: "3",
          label: "TASK IN PROGRESS ",
          total: taskCounts.inProgress,
          icon: <LuClipboardEdit />,
          bg: "bg-[#f59e0b]",
        },
        {
          _id: "4",
          label: "TODOS",
          total: taskCounts.todo,
          icon: <FaArrowsToDot />,
          bg: "bg-[#be185d]",
        },
      ];

      setStats(updatedStats);
    }
  }, [tasks]);
  return (
    <div className="featured">
      {loading ? (
        <span className="loading loading-spinner loading-lg bg-[#003175]"></span>
      ) : (
        stats.map((card, index) => (
          <div className="featured-items bg-white shadow-2xl" key={index}>
            <span className={`featured-title lg:text-2xl text-[#003175] `}>
              {card.label}
            </span>
            <div className="featured-money-container">
              <span className={`featured-money lg:text-sm text-[#003175]`}>
                {card.total}
              </span>
              <span className="featured-moneyRate bg-[#003175]">
                {card.icon}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FeaturedInfo;
