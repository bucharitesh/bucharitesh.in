import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getBookmarkItems, getBookmarks } from "@/features/bookmarks/lib/raindrop";
import { cn, sortByProperty } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import Balancer from "react-wrap-balancer";
import { BookmarkList } from "@/features/bookmarks/components/bookmark-list";
import { createOgImage } from "@/lib/createOgImage";
import { USER } from "@/config/user";
import { FloatingHeader } from "@/components/navigation/floating-header";
import { Heading } from "@/components/ui/typography";

export async function generateStaticParams() {
  const bookmarks = await getBookmarks();
  return bookmarks.map((bookmark: any) => ({ slug: bookmark.slug }));
}

async function fetchData(slug: string) {
  const bookmarks = await getBookmarks();
  const currentBookmark = bookmarks.find((bookmark: any) => bookmark.slug === slug);
  if (!currentBookmark) notFound();

  const sortedBookmarks = sortByProperty(bookmarks, "title");
  const bookmarkItems = await getBookmarkItems(currentBookmark._id);

  return {
    bookmarks: sortedBookmarks,
    currentBookmark,
    bookmarkItems,
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { currentBookmark, bookmarkItems } = await fetchData(slug);

  return (
    <ScrollArea className="bg-grid" useScrollAreaId={true}>
      <FloatingHeader scrollTitle={currentBookmark.title} />
      <div className="content-wrapper">
        <div className="content container">
          <div
            className={cn(
              "mb-6 text-4xl font-bold tracking-widest",
            )}
          >
            <Balancer><Heading as="h2">{currentBookmark.title}</Heading></Balancer>
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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bookmarks = await getBookmarks();

  const currentBookmark = bookmarks.find((bookmark: any) => bookmark.slug === slug);
  if (!currentBookmark) return null;

  const siteUrl = `/bookmarks/${currentBookmark.slug}`;
  const seoTitle = `${currentBookmark.title} | Bookmarks`;
  const seoDescription = `A curated selection of various handpicked ${currentBookmark.title.toLowerCase()} bookmarks by ${USER.name}`;

  const ogImage = createOgImage({
    title: seoTitle,
    meta: seoDescription,
  });

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
      images: [{ url: ogImage, width: 1600, height: 836, alt: seoTitle }],
    },
    alternates: {
      canonical: siteUrl,
    },
  };
}