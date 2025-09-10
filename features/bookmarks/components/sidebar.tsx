'use client';

import { RadioIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading';
import { ScrollArea } from '@/components/ui/scroll-area';

const SubmitBookmarkDialog = dynamic(
  () =>
    import('@/features/bookmarks/components/submit-bookmark/dialog').then(
      (mod) => mod.SubmitBookmarkDialog
    ),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  }
);

import { cn } from '@/lib/utils';

export const SideMenu = ({
  children,
  title,
  bookmarks = [],
  isInner,
}: {
  children: React.ReactNode;
  title: string;
  bookmarks: any[];
  isInner: boolean;
}) => {
  const pathname = usePathname();
  const isBookmarksPath = pathname.startsWith('/bookmarks');
  const currentBookmark = bookmarks.find(
    (bookmark: any) => `/bookmarks/${bookmark.slug}` === pathname
  );

  const memoizedScrollArea = useMemo(
    () => (
      <ScrollArea
        className={cn(
          'hidden bg-background lg:flex lg:flex-col lg:border-r',
          isInner ? 'lg:w-80 xl:w-96' : 'lg:w-60 xl:w-72'
        )}
      >
        {title && (
          <div className="sticky top-0 z-10 border-b bg-background px-5 py-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm tracking-tight">
                {title}
              </span>
              <div className="flex items-center gap-2">
                {isBookmarksPath && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={'/bookmarks/feed.xml'}
                      title="RSS feed"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <RadioIcon size={16} />
                      RSS feed
                    </a>
                  </Button>
                )}
                {isBookmarksPath && (
                  <SubmitBookmarkDialog
                    bookmarks={bookmarks}
                    currentBookmark={currentBookmark}
                  />
                )}
              </div>
            </div>
          </div>
        )}
        <div className="bg-background p-3">{children}</div>
      </ScrollArea>
    ),
    [isInner, title, isBookmarksPath, bookmarks, currentBookmark, children]
  );

  return memoizedScrollArea;
};
