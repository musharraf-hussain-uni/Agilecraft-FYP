import React from "react";
import { GetAllTestCases, GetTestCase } from "../../hooks/get-test-case";

const Testing = () => {
  const { data, loading, error } = GetAllTestCases();

  const { data: singleTest } = GetTestCase("666a4ad4621d877fec59f9cb");

  console.log(data);

  console.log("Single Data", singleTest);
  return <div>Testing</div>;
};

export default Testing;
