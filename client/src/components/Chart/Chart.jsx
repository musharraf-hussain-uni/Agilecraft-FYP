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

const countPriorities = (data) => {
  const priorityCounts = {
    high: 0,
    medium: 0,
    normal: 0,
    low: 0,
  };

  data.forEach((project) => {
    priorityCounts[project.priority]++; // Increment count based on priority
  });

  return [
    { name: "High", total: priorityCounts.high },
    { name: "Medium", total: priorityCounts.medium },
    { name: "Normal", total: priorityCounts.normal },
    { name: "Low", total: priorityCounts.low },
  ];
};

export const Charts = () => {
  const { userTask, loading, error } = useGetUserTask();

  if (loading)
    return (
      <div className="w-full text-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  if (error) return <p>Error fetching data: {error.message}</p>;

  if (!userTask || userTask.length === 0) {
    return (
      <div className="w-full text-center">
        <p className="text-base">No project data available.</p>
      </div>
    );
  }

  const dynamicChartData = countPriorities(userTask);

  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <BarChart width={150} height={40} data={dynamicChartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="total" fill="#000" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Charts;
