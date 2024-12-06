"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { ArrowDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BookmarkCard } from "./bookmark-card";
import { cn } from "@/lib/utils";
import { getBookmarkItemsByPageIndex } from "@/lib/actions";

export const BookmarkList = ({ initialData, id }) => {
  const [data, setData] = useState(
    initialData?.result ? initialData?.items : []
  );
  const [pageIndex, setPageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = () => {
    if (!isReachingEnd && !isLoading)
      setPageIndex((prevPageIndex) => prevPageIndex + 1);
  };

  const fetchInfiniteData = useCallback(async () => {
    setIsLoading(true);
    const newData = await getBookmarkItemsByPageIndex(id, pageIndex);
    if (newData.result) setData((prevData) => [...prevData, ...newData.items]);
    setIsLoading(false);
  }, [id, pageIndex]);

  useEffect(() => {
    if (pageIndex > 0) fetchInfiniteData();
  }, [pageIndex, fetchInfiniteData]);

  const isReachingEnd = data?.length >= initialData?.count;

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {data.map((bookmark, bookmarkIndex) => {
          return (
            <div key={`bookmark_${bookmarkIndex}`} className={cn("grid gap-4")}>
              <BookmarkCard
                key={bookmark._id}
                bookmark={bookmark}
                order={bookmarkIndex}
              />
            </div>
          );
        })}
      </div>
      {/* <div className="hidden @lg:grid @lg:grid-cols-2 @lg:gap-4">
        {chunks.map((chunk, chunkIndex) => {
          return (
            <div
              key={`chunk_${chunkIndex}`}
              className={cn(
                "grid gap-4",
              )}
            >
              {chunk.map((bookmark, bookmarkIndex) => {
                return (
                  <BookmarkCard
                    key={bookmark?._id}
                    bookmark={bookmark}
                    order={bookmarkIndex}
                  />
                );
              })}
            </div>
          );
        })}
      </div> */}
      {data.length > 0 ? (
        <div className="mt-8 flex min-h-16 items-center justify-center text-sm lg:mt-12">
          {!isReachingEnd ? (
            <>
              {isLoading ? (
                <div
                  className="inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent text-black"
                  role="status"
                  aria-label="loading"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <Button
                  variant="outline"
                  onClick={loadMore}
                  disabled={isLoading}
                  className="w-full justify-center bg-white"
                >
                  Load more
                  <ArrowDownIcon size={16} />
                </Button>
              )}
            </>
          ) : (
            <span>That's all for now. Come back later for more.</span>
          )}
        </div>
      ) : (
        <div className="mt-8 flex min-h-16 flex-col items-center justify-center lg:mt-12">
          <span>No bookmarks found.</span>
        </div>
      )}
    </div>
  );
};
