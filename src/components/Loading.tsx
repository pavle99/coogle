import React from "react";
import { Oval } from "react-loader-spinner";

const Loading: React.FC<any> = () => {
  return (
    <div className="flex justify-center items-center">
      <Oval
        ariaLabel="loading-indicator"
        height={550}
        width={80}
        strokeWidth={5}
        color="#00BFFF"
        secondaryColor="blue"
      />
    </div>
  );
};

export default Loading;