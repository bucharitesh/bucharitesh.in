import { OOF_GRAD } from "@/old/lib/constants";
import { cn } from "@/old/lib/utils";
import React from "react";

export const Caption = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={cn("mt-2 border-l-2 border-primary/5 pl-3 text-sm", OOF_GRAD)}
    >
      {children}
    </div>
  );
};
