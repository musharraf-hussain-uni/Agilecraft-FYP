import React from "react";
import { GetAllBugTracks, GetBugTrack } from "../../hooks/get-bug-track";

const BugTracking = () => {
  const { data, loading } = GetAllBugTracks();

  const { data: singleBug } = GetBugTrack("666acce27c0b5653a3f90cf4");

  console.log("Single Bug Track", singleBug);

  console.log(data);
  return <div>BugTracking</div>;
};

export default BugTracking;
