import { ScrollArea } from "@/components/scroll-area";
import { getBookmarks } from "@/lib/services/raindrop";
import { sortByProperty } from "@/old/lib/utils";
import { Suspense } from "react";
import Link from "next/link";

async function fetchData() {
  const bookmarks = await getBookmarks();
  const sortedBookmarks = sortByProperty(bookmarks, "title");
  return { bookmarks: sortedBookmarks };
}

export default async function Writing() {
  const { bookmarks } = await fetchData();

  return (
    <ScrollArea className="lg:hidden">
      <Suspense fallback={<p>...</p>}>
        {bookmarks?.map((bookmark) => {
          return (
            <Link
              key={bookmark._id}
              href={`/bookmarks/${bookmark.slug}`}
              className="flex flex-col gap-1 border-b px-4 py-3 text-sm hover:bg-gray-100"
            >
              <span className="font-medium">{bookmark.title}</span>
              <span className="text-slate-500">{bookmark.count} bookmarks</span>
            </Link>
          );
        })}
      </Suspense>
    </ScrollArea>
  );
}
