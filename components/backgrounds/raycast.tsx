"use client";

import { cn } from "@/lib/utils";
import UnicornScene from "unicornstudio-react";
import { useWindowSize } from "@/lib/hooks";

export const RaycastBackground = ({ className }: { className?: string }) => {
  const { width, height } = useWindowSize();

  return (
    <div className={cn("flex flex-col items-center", className)}>
        <UnicornScene 
        production={true} projectId="erpu4mAlEe8kmhaGKYe9" width={width} height={height} />
    </div>
  );
};

