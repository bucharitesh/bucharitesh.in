import React from "react";
import { MouseSparkles } from "../bucharitesh/magical-mouse/magical-mouse";

const MagicalMouseDemo = () => {
  return (
    <div
      className="w-full h-[400px] bg-white rounded-xl overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg, rgb(119, 46, 195), rgb(58, 18, 153))",
      }}
    >
      <MouseSparkles />
    </div>
  );
};

export default MagicalMouseDemo;
