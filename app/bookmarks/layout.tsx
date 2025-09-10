import { ScreenLoadingSpinner } from '@/components/ui/loading';
import { ListItem } from '@/features/bookmarks/components/list-item';
import { SideMenu } from '@/features/bookmarks/components/sidebar';
import { getBookmarks } from '@/features/bookmarks/lib/raindrop';
import { sortByProperty } from '@/lib/utils';
import type React from 'react';
import { Suspense } from 'react';

async function fetchData() {
  const bookmarks = await getBookmarks();
  const sortedBookmarks = sortByProperty(bookmarks, 'title');
  return { bookmarks: sortedBookmarks };
}

export default async function BookmarksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { bookmarks } = await fetchData();

  return (
    <>
      <div className="flex w-full">
        <SideMenu title="Bookmarks" bookmarks={bookmarks} isInner>
          <Suspense fallback={<ScreenLoadingSpinner />}>
            <div className="flex flex-col gap-1 text-sm">
              {bookmarks?.map((bookmark: any) => {
                return (
                  <ListItem
                    key={bookmark._id}
                    path={`/bookmarks/${bookmark.slug}`}
                    title={bookmark.title}
                    description={`${bookmark.count} bookmarks`}
                  />
                );
              })}
            </div>
          </Suspense>
        </SideMenu>
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
}

export const viewport = {
  //  To fix the zoom issue on mobile for the bookmark submit form
  maximumScale: 1,
};
