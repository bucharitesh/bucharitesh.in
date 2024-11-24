"use client";

import { cn } from "@/old/lib/utils";
import { Link, useTransitionRouter } from "next-view-transitions";
import React from "react";

const Sidebar = ({ slug, bookmarks }: { slug: string; bookmarks: any }) => {
  const router = useTransitionRouter();

  return (
    <div className="space-y-4">
      <div>
        <div className="mb-1 text-xs uppercase text-primary">Categories</div>
      </div>
      <ul className="space-y-1 text-sm">
        {bookmarks?.map((bookmark) => {
          return (
            <li key={bookmark._id}>
              <Link
                href={`/bookmarks/${bookmark.slug}`}
                replace
                className={cn(
                  "block text-primary/50 p-2 rounded-md pl-3 transition-all hover:text-primary",
                  {
                    "text-white bg-primary/40 font-bold":
                      slug === bookmark.slug,
                  }
                )}
              >
                {bookmark.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
