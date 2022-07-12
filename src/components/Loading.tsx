import React from "react";
import { Oval } from "react-loader-spinner";

const Loading: React.FC<any> = () => {
  return (
    <div className="flex justify-center items-center">
      <Oval color="00BFFF" height={550} width={80} />
    </div>
  );
};

export default Loading;