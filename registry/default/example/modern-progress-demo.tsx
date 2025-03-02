"use client";

import { useState } from "react";
import { useEffect } from "react";
import { Progress } from "../bucharitesh/modern-progress";

const ProgressDemo = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(progress + 1);
    }, 100);
    return () => clearInterval(interval);
  }, [progress]);

  return (
    <div className="w-full h-full p-10 flex items-center justify-center">
      <Progress
        value={progress}
        className="border-purple-500"
        indicatorClassName="bg-purple-500"
        showText
      />
    </div>
  );
};

export default ProgressDemo;
