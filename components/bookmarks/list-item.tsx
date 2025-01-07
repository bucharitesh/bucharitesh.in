"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export const ListItem = ({ title, description, path, shortcutNumber }: any) => {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Link
      key={path}
      href={path}
      className={cn(
        "flex justify-between items-center rounded-lg px-4 py-2 transition-colors duration-300 [&>*]:transition-colors [&>*]:duration-300 bg-nautral-200",
        isActive && "bg-neutral-700",
        !isActive && "hover:bg-neutral-300/50",
      )}
    >
      <div className="flex flex-col gap-0">
        <span className={cn("font-medium", isActive && "text-neutral-100")}>
          {title}
        </span>
        {description && (
          <span className={cn(isActive && "text-neutral-100")}>
            {description}
          </span>
        )}
      </div>
      {shortcutNumber && (
        <span
          className={cn(
            "hidden h-5 w-5 place-content-center rounded border border-neutral-600 bg-neutral-700 text-neutral-200 group-hover:border-neutral-600 text-xs font-medium transition-colors duration-200 lg:grid",
            isActive &&
              "border-neutral-200 bg-neutral-100 text-neutral-500 group-hover:border-neutral-300",
          )}
          title={`Shortcut key: ${shortcutNumber}`}
        >
          {shortcutNumber}
        </span>
      )}
    </Link>
  );
};
