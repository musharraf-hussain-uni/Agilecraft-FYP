import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { GetAllCodeReviews } from "../../hooks/get-code-review";
import { GetAllTestCases } from "../../hooks/get-test-case";
import { GetAllBugTracks } from "../../hooks/get-bug-track";

export default function BasicPie({ data }) {
  const { data: AllTestCase } = GetAllTestCases();
  const { data: AllBugs } = GetAllBugTracks();
  const { data: AllReviews } = GetAllCodeReviews();

  const selectedTest = data
    ? AllTestCase.filter((item) => item.project === data)
    : [];

  const selectedBug = data
    ? AllBugs.filter((item) => item.project === data)
    : [];
  const selectedReviews = data
    ? AllReviews.filter((item) => item.project === data)
    : [];

  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: selectedReviews.length, label: "Code Reviews" },
            { id: 1, value: selectedTest.length, label: "Test Cases" },
            { id: 2, value: selectedBug.length, label: "Bug Tracks" },
          ],
        },
      ]}
      width={500}
      height={300}
    />
  );
}
