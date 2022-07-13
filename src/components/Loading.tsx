import React from "react";
import { Rings } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <Rings
        ariaLabel="loading-indicator"
        height={550}
        width={80}
        color="#00BFFF"
      />
    </div>
  );
};

export default Loading;
