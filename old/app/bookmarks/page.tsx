import Link from "next/link";

import { getBookmarks } from "@/old/lib/services/raindrop";
import { sortByProperty } from "@/lib/utils";
// import PageWrapper from "@/old/ui/layout/page-wrapper";
// import { Button } from "@/old/ui/button";
import { Rss } from "lucide-react";

// Revalidate all routes every 2 days
export const revalidate = 60 * 60 * 24 * 2; // 2 days

async function fetchData() {
  const bookmarks = await getBookmarks();
  const sortedBookmarks = sortByProperty(bookmarks, "title");
  return { bookmarks: sortedBookmarks };
}

export default async function Bookmarks() {
  const { bookmarks } = await fetchData();

  return (
    // <PageWrapper
    //   title={"Bookmarks"}
    //   action={
    //     <Button variant={"outline"} className="rounded-full h-8 w-8">
    //       <Link href="/bookmarks/feed.xml">
    //         <Rss className="h-4 w-4" />
    //       </Link>
    //     </Button>
    //   }
    // >
    //   <div className="grid grid-cols-2 gap-4">
    //     {bookmarks?.map((bookmark) => {
    //       return (
    //         <Link
    //           key={bookmark._id}
    //           href={`/bookmarks/${bookmark.slug}`}
    //           className="flex flex-col gap-1 border-b py-8 px-4 text-primary-400 text-sm bg-primary rounded-xl"
    //         >
    //           <span className="font-medium">{bookmark.title}</span>
    //           <span className="text-slate-500">{bookmark.count} bookmarks</span>
    //         </Link>
    //       );
    //     })}
    //   </div>
    // </PageWrapper>
    <></>
  );
}
