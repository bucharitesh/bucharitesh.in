"use client";

import { useState, useCallback, useMemo } from "react";

import { cn } from "@/old/lib/utils";
import { BookmarkCard } from "./bookmark-card";

export const BookmarkList = ({ initialData, id }) => {
  const [data] = useState(initialData?.result ? initialData?.items : []);

  const getChunks = useCallback(() => {
    const firstChunk: any = [];
    const lastChunk: any = [];
    data.forEach((element, index) => {
      if (index % 2 === 0) {
        firstChunk.push(element);
      } else {
        lastChunk.push(element);
      }
    });
    return [[...firstChunk], [...lastChunk]];
  }, [data]);

  const chunks = useMemo(() => getChunks(), [getChunks]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {chunks.map((chunk, chunkIndex) => {
          return (
            <div
              key={`chunk_${chunkIndex}`}
              className={cn(
                "grid gap-4",
                // isTweetCollection ? "h-fit" : "place-content-start",
                "h-fit"
              )}
            >
              {chunk.map((bookmark: any, bookmarkIndex) => {
                return (
                  <BookmarkCard
                    key={bookmark._id}
                    bookmark={bookmark}
                    order={bookmarkIndex}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      {data.length === 0 && (
        <div className="mt-8 flex min-h-16 flex-col items-center justify-center lg:mt-12">
          <span>No bookmarks found.</span>
        </div>
      )}
    </div>
  );
};
