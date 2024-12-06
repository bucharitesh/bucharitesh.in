import { getBookmarkItems, getBookmarks } from "@/old/lib/services/raindrop";
import { cn, sortByProperty } from "@/lib/utils";
import { notFound } from "next/navigation";
import { BookmarkList } from "./bookmark-list";
import Sidebar from "./sidebar";
import Balancer from "react-wrap-balancer";
import { OOF_GRAD } from "@/old/lib/constants";
// import Back from "@/old/ui/back-button";

export async function generateStaticParams() {
  const bookmarks = await getBookmarks();
  return bookmarks.map((bookmark) => ({ slug: bookmark.slug }));
}

async function fetchData(slug) {
  const bookmarks = await getBookmarks();
  const currentBookmark = bookmarks.find((bookmark) => bookmark.slug === slug);
  if (!currentBookmark) notFound();

  const sortedBookmarks = sortByProperty(bookmarks, "title");
  const bookmarkItems = await getBookmarkItems(currentBookmark._id);

  return {
    bookmarks: sortedBookmarks,
    currentBookmark,
    bookmarkItems,
  };
}

export default async function CollectionPage({ params }) {
  const { slug } = params;

  const { bookmarks, currentBookmark, bookmarkItems } = await fetchData(slug);

  return (
    <>
      <div className="mt-24 mb-4 xl:!col-end-5">
        {/* <Back href={"/bookmarks"} /> */}

        <h1 className={cn("mt-6 text-2xl font-medium sm:text-4xl", OOF_GRAD)}>
          <Balancer>{currentBookmark?.title}</Balancer>
        </h1>

        <div className="mt-4 flex space-x-2 text-primary/50">
          <div>{currentBookmark?.count} Bookmarks</div>
          {/* <div className="text-primary/30">&middot;</div>
          <div>100 views</div> */}
        </div>
      </div>

      <div className="sticky top-6 hidden h-0 xl:!col-start-4 xl:row-start-3 xl:block">
        <Sidebar bookmarks={bookmarks} slug={slug} />
      </div>

      <BookmarkList id={currentBookmark._id} initialData={bookmarkItems} />
    </>
  );
}
