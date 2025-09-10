'use client';

import { ArrowDownIcon } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { BookmarkCard } from '@/features/bookmarks/components/bookmark-card';
import { getBookmarkItemsByPageIndex } from '@/features/bookmarks/lib/actions';
import { cn } from '@/lib/utils';

export const BookmarkList = ({
  initialData,
  id,
}: { initialData: any; id: string }) => {
  const [data, setData] = useState(
    initialData?.result ? initialData?.items : []
  );
  const [pageIndex, setPageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = () => {
    if (!isReachingEnd && !isLoading) {
      setPageIndex((prevPageIndex) => prevPageIndex + 1);
    }
  };

  const fetchInfiniteData = useCallback(async () => {
    setIsLoading(true);
    const newData = await getBookmarkItemsByPageIndex(id, pageIndex);
    if (newData.result) {
      setData((prevData: any) => [...prevData, ...newData.items]);
    }
    setIsLoading(false);
  }, [id, pageIndex]);

  useEffect(() => {
    if (pageIndex > 0) {
      fetchInfiniteData();
    }
  }, [pageIndex, fetchInfiniteData]);

  const getChunks = useCallback(() => {
    const firstChunk: any[] = [];
    const lastChunk: any[] = [];
    data.forEach((element: any, index: number) => {
      if (index % 2 === 0) {
        firstChunk.push(element);
      } else {
        lastChunk.push(element);
      }
    });
    return [[...firstChunk], [...lastChunk]];
  }, [data]);

  const chunks = useMemo(() => getChunks(), [getChunks]);
  const isReachingEnd = data.length >= (initialData?.count ?? 0);

  const memoizedBookmarks = useMemo(() => {
    return data.map((bookmark: any, bookmarkIndex: number) => (
      <div
        key={`bookmark_${bookmarkIndex}`}
        className={cn('grid place-content-start gap-4')}
      >
        <BookmarkCard
          key={bookmark._id}
          bookmark={bookmark}
          order={bookmarkIndex}
        />
      </div>
    ));
  }, [data]);

  const memoizedChunks = useMemo(() => {
    return chunks.map((chunk, chunkIndex) => (
      <div
        key={`chunk_${chunkIndex}`}
        className={cn('grid place-content-start gap-4')}
      >
        {chunk.map((bookmark, bookmarkIndex) => (
          <BookmarkCard
            key={bookmark._id}
            bookmark={bookmark}
            order={bookmarkIndex}
            className=""
          />
        ))}
      </div>
    ));
  }, [chunks]);

  return (
    <div className="">
      <div className="flex flex-col gap-4 lg:hidden">{memoizedBookmarks}</div>
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-4">
        {memoizedChunks}
      </div>
      {data.length > 0 ? (
        <div className="mt-8 flex min-h-16 items-center justify-center text-sm lg:mt-12">
          {isReachingEnd ? (
            <span>That's all for now. Come back later for more.</span>
          ) : (
            <>
              {isLoading ? (
                <div
                  className="inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent text-black"
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
