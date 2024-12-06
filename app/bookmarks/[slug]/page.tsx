import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getBookmarkItems, getBookmarks } from "@/lib/services/raindrop";
import { cn, sortByProperty } from "@/old/lib/utils";
import { ScrollArea } from "@/components/scroll-area";
import Balancer from "react-wrap-balancer";
import { BookmarkList } from "@/components/bookmarks/bookmark-list";
import { FloatingHeader } from "@/components/floating-header";

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
    <ScrollArea className="bg-grid" useScrollAreaId>
      {/* <FloatingHeader
        scrollTitle={currentBookmark.title}
        goBackLink="/bookmarks"
      /> */}
      <div className="content-wrapper">
        <div className="content container">
          <div className={cn("mb-6 text-xl font-medium")}>
            <Balancer as="h1">{currentBookmark.title}</Balancer>
          </div>
          <Suspense fallback={<p>...</p>}>
            <BookmarkList
              id={currentBookmark._id}
              initialData={bookmarkItems}
            />
          </Suspense>
        </div>
      </div>
    </ScrollArea>
  );
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const bookmarks = await getBookmarks();
  const currentBookmark = bookmarks.find((bookmark) => bookmark.slug === slug);
  if (!currentBookmark) return null;

  const siteUrl = `/bookmarks/${currentBookmark.slug}`;
  const seoTitle = `${currentBookmark.title} | Bookmarks`;
  const seoDescription = `A curated selection of various handpicked ${currentBookmark.title.toLowerCase()} bookmarks by Onur Şuyalçınkaya`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: [
      currentBookmark.title,
      "bookmarks",
      `${currentBookmark.title} bookmarks`,
      "collection",
      `${currentBookmark.title} collection`,
    ],
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: siteUrl,
      images: siteUrl + "/og.png",
    },
    alternates: {
      canonical: siteUrl,
    },
  };
}
