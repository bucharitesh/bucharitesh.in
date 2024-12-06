import { OOF_GRAD } from "@/old/lib/constants";
import { cn } from "@/lib/utils";
import React from "react";

export const Aside = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) => {
  return (
    <div className="z-10 border-l-2 border-primary/5 pl-3">
      {title ? (
        <div className="mb-2 text-base italic text-opacity-100">{title}</div>
      ) : null}

      <div
        className={cn(
          "[&>span[data-rehype-pretty-code-fragment]]:!text-[11px] text-sm",
          OOF_GRAD
        )}
      >
        {children}
      </div>
    </div>
  );
};
