'use client';

import { Progress } from '@/registry/bucharitesh/modern-progress';
import { useState } from 'react';
import { useEffect } from 'react';

const ProgressDemo = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(progress + 1);
    }, 100);
    return () => clearInterval(interval);
  }, [progress]);

  return (
    <div className="flex h-full w-full items-center justify-center p-10">
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
