import { FloatingHeader } from '@/components/navigation/floating-header';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Heading } from '@/components/ui/typography';
import { USER } from '@/config/user';
import { BookmarkList } from '@/features/bookmarks/components/bookmark-list';
import {
  getBookmarkItems,
  getBookmarks,
} from '@/features/bookmarks/lib/raindrop';
import { createOgImage } from '@/lib/createOgImage';
import { createMetadata } from '@/lib/seo/metadata';
import { cn, sortByProperty } from '@/lib/utils';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Balancer from 'react-wrap-balancer';

export async function generateStaticParams() {
  const bookmarks = await getBookmarks();
  return bookmarks.map((bookmark: any) => ({ slug: bookmark.slug }));
}

async function fetchData(slug: string) {
  const bookmarks = await getBookmarks();
  const currentBookmark = bookmarks.find(
    (bookmark: any) => bookmark.slug === slug
  );

  if (!currentBookmark) {
    notFound();
  }

  const sortedBookmarks = sortByProperty(bookmarks, 'title');
  const bookmarkItems = await getBookmarkItems(currentBookmark._id);

  return {
    bookmarks: sortedBookmarks,
    currentBookmark,
    bookmarkItems,
  };
}

export default async function CollectionPage({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { currentBookmark, bookmarkItems } = await fetchData(slug);

  return (
    <ScrollArea className="bg-grid" useScrollAreaId={true}>
      <FloatingHeader scrollTitle={currentBookmark.title} />
      <div className="content-wrapper">
        <div className="content container">
          <div className={cn('mb-6 font-bold text-4xl tracking-widest')}>
            <Balancer>
              <Heading as="h2">{currentBookmark.title}</Heading>
            </Balancer>
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

export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bookmarks = await getBookmarks();

  const currentBookmark = bookmarks.find(
    (bookmark: any) => bookmark.slug === slug
  );
  if (!currentBookmark) {
    return null;
  }

  const seoTitle = `${currentBookmark.title} | Bookmarks`;
  const seoDescription = `A curated selection of various handpicked ${currentBookmark.title.toLowerCase()} bookmarks by ${USER.name}`;

  const ogImage = createOgImage({
    title: seoTitle,
    meta: seoDescription,
  });

  return createMetadata({
    title: seoTitle,
    description: seoDescription,
    keywords: [
      currentBookmark.title,
      'bookmarks',
      `${currentBookmark.title} bookmarks`,
      'collection',
      `${currentBookmark.title} collection`,
    ],
    image: ogImage,
  });
}
