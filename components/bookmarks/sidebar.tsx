"use client";

import { RadioIcon } from "lucide-react";

import { ScrollArea } from "@/components/scroll-area";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export const SideMenu = ({ children, title, isInner, rss_url }) => {
  return (
    <ScrollArea
      className={cn(
        "hidden bg-zinc-50 dark:bg-zinc-800 lg:flex lg:flex-col lg:border-r dark:lg:border-zinc-700",
        isInner ? "lg:w-80 xl:w-96" : "lg:w-60 xl:w-72"
      )}
    >
      {title && (
        <div className="sticky top-0 z-10 border-b dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-5 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold tracking-tight">
              {title}
            </span>
            <div className="flex items-center gap-2">
              {rss_url && (
                <Button variant="outline" size="xs" asChild>
                  <a
                    href={rss_url}
                    title="RSS feed"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <RadioIcon size={16} className="mr-2" />
                    RSS feed
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="bg-zinc-50 dark:bg-zinc-800 p-3">{children}</div>
    </ScrollArea>
  );
};
