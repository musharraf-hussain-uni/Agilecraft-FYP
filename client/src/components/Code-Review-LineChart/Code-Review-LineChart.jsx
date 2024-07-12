import React, { useState, useEffect, Fragment } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const CodeReviewLineChart = ({ reviewData }) => {
  const [chartData, setChartData] = useState([]);
  // console.log(selected);

  useEffect(() => {
    // Process the data to group reviews by status and count them
    const processedData = reviewData.reduce((acc, review) => {
      const existing = acc.find((item) => item.status === review.status);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ status: review.status, count: 1 });
      }
      return acc;
    }, []);

    setChartData(processedData);
  }, [reviewData]);

  return (
    <div className="my-5">
      <LineChart width={500} height={300} data={chartData}>
        <XAxis dataKey="status" tickFormatter={formatStatus} />
        <YAxis tickFormatter={formatCount} />
        <Line
          type="bump"
          dataKey="count"
          strokeWidth={3}
          // stroke="#f7458b" // Maintain a consistent line color
          activeDot={{ r: 5 }}
          dot={{ r: 6 }}
        />
        <Tooltip />
      </LineChart>
    </div>
  );
};

// Optional formatting functions (adjust as needed)
const formatStatus = (value) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const formatCount = (value) => {
  return value.toLocaleString();
};

export default CodeReviewLineChart;
