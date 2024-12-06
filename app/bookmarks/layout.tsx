import { SideMenu } from '@/components/bookmarks/sidebar';
import { ListItem } from "@/components/bookmarks/list-item";
import { getBookmarks } from '@/lib/services/raindrop';
import { sortByProperty } from '@/old/lib/utils';
import React, { Suspense } from 'react'

// Revalidate all routes every 2 days
export const revalidate = 60 * 60 * 24 * 2 // 2 days

async function fetchData() {
  const bookmarks = await getBookmarks();
  const sortedBookmarks = sortByProperty(bookmarks, "title");
  return { bookmarks: sortedBookmarks };
}

export default async function BookmarksLayout({ children }: { children: React.ReactNode }) {
  const { bookmarks } = await fetchData();

  return (
    <div className='h-screen w-screen'>
      <div className="flex w-full h-full">
        <SideMenu title="Bookmarks" isInner rss_url="/bookmarks/feed.xml">
          <Suspense fallback={<p>...</p>}>
            <div className="flex flex-col gap-1 text-sm">
              {bookmarks?.map((bookmark) => {
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
        <div className="lg:bg-grid flex-1">{children}</div>
      </div>
    </div>
  );
}