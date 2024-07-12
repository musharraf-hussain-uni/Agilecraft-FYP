import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetUserTask } from "../../hooks/get-user";
import { useEffect, useState } from "react";

const countPriorities = (data) => {
  const priorityCounts = {
    high: 0,
    medium: 0,
    normal: 0,
    low: 0,
  };

  data.forEach((project) => {
    priorityCounts[project.priority]++;
  });

  return [
    { name: "High", total: priorityCounts.high },
    { name: "Medium", total: priorityCounts.medium },
    { name: "Normal", total: priorityCounts.normal },
    { name: "Low", total: priorityCounts.low },
  ];
};

export const Charts = ({ tasks, loading }) => {
  if (loading)
    return (
      <div className="w-full text-center">
        <span className="loading loading-spinner bg-[#003175] loading-lg"></span>
      </div>
    );
  // if (error) return <p>Error fetching data: {error.message}</p>;

  if (!tasks || tasks.length === 0) {
    return (
      <div className="w-full text-center">
        <p className="text-base">No project data available.</p>
      </div>
    );
  }

  const dynamicChartData = countPriorities(tasks);

  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <BarChart width={150} height={40} data={dynamicChartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="total" fill="#003175" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Charts;
