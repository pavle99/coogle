import React from "react";
import { useLocation } from "react-router-dom";

import { useResultContext } from "../contexts/ResultContextProvider";

import Loading from "./Loading";

const Results = () => {
  const { result, isLoading, getResults, searchTerm } = useResultContext();
  const location = useLocation();

  if (isLoading) return <Loading/>

  return (
    <div>

    </div>
  );
};

export default Results;