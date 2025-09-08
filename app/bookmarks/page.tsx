import { ScrollArea } from "@/components/ui/scroll-area";
import { getBookmarks } from "@/lib/services/raindrop";
import { sortByProperty } from "@/lib/utils";
import { Suspense } from "react";
import Link from "next/link";
import { Metadata } from "next/types";
import { ScreenLoadingSpinner } from "@/components/ui/loading";
import { FloatingHeader } from "@/components/navigation/floating-header";

export const metadata: Metadata = {
  title: "Bookmarks",
  description:
    "A curated selection of various handpicked bookmarks by Ritesh Bucha",
  alternates: {
    canonical: "/bookmarks",
  },
};

export async function generateStaticParams() {
  const bookmarks = await getBookmarks();
  return bookmarks.map((bookmark: any) => ({ slug: bookmark.slug }));
}

async function fetchData() {
  const bookmarks = await getBookmarks();
  const sortedBookmarks = sortByProperty(bookmarks, "title");
  return { bookmarks: sortedBookmarks };
}

export default async function Writing() {
  const { bookmarks } = await fetchData()

  return (
    <ScrollArea className="lg:hidden">
      <FloatingHeader title="Bookmarks" bookmarks={bookmarks} />
      <Suspense fallback={<ScreenLoadingSpinner />}>
        {/* {bookmarks?.map((bookmark) => {
          return (
            <Link
              key={bookmark._id}
              href={`/bookmarks/${bookmark.slug}`}
              className="flex flex-col gap-1 border-b px-4 py-3 text-sm hover:bg-gray-100"
            >
              <span className="font-medium">{bookmark.title}</span>
              <span className="text-slate-500">{bookmark.count} bookmarks</span>
            </Link>
          )
        })} */}
      </Suspense>
    </ScrollArea>
  )
}