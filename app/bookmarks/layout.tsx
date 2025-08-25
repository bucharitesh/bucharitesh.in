import { SideMenu } from "@/components/bookmarks/sidebar";
import { ListItem } from "@/components/bookmarks/list-item";
import { getBookmarks } from "@/lib/services/raindrop";
import { sortByProperty } from "@/lib/utils";
import React, { Suspense } from "react";

// Revalidate all routes every 2 days
// export const revalidate = 60 * 60 * 24 * 2; // 2 days

async function fetchData() {
  const bookmarks = await getBookmarks();
  const sortedBookmarks = sortByProperty(bookmarks, "title");
  return { bookmarks: sortedBookmarks };
}

export default async function BookmarksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { bookmarks } = await fetchData();

  const routeMapping = bookmarks.reduce((acc, bookmark, bookmarkIndex) => {
    acc[`Digit${bookmarkIndex + 1}`] = `/bookmarks/${bookmark.slug}`;
    return acc;
  }, {});

  return (
    <div className="h-screen w-screen">
      <div className="flex w-full h-full">
        <SideMenu
          title="Bookmarks"
          isInner
          rss_url="/bookmarks/feed.xml"
          routeMapping={routeMapping}
        >
          <Suspense fallback={<p>...</p>}>
            <div className="flex flex-col gap-1 text-sm">
              {bookmarks?.map((bookmark, bookmarkIndex) => {
                return (
                  <ListItem
                    key={bookmark._id}
                    path={`/bookmarks/${bookmark.slug}`}
                    title={bookmark.title}
                    description={`${bookmark.count} bookmarks`}
                    shortcutNumber={bookmarkIndex + 1}
                  />
                );
              })}
            </div>
          </Suspense>
        </SideMenu>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
