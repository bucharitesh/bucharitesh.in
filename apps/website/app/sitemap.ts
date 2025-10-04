import { ENABLE_BUDDY } from '@/config/site';
import { getBookmarks } from '@/features/bookmarks/lib/raindrop';
import { getAllCrafts } from '@/features/craft/data/posts';
import { addPathToBaseURL } from '@/lib/url';
import dayjs from 'dayjs';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    '/',
    '/cal',
    '/guestbook',
    '/craft',
    '/bookmarks',
    // "/blog",
    //  "/project",
    // "/design-inspiration",
    // "/uses",
  ].concat(ENABLE_BUDDY ? ['/buddy'] : []);

  const routesArray = await routes.map(async (route) => ({
    url: await addPathToBaseURL(route),
    lastModified: dayjs().toISOString(),
  }));

  const crafts = await getAllCrafts().map(async (post) => ({
    url: await addPathToBaseURL(`/craft/${post.slug}`),
    lastModified: dayjs(post.metadata.date).toISOString(),
  }));

  const craftsResolved = await Promise.all(crafts);
  const routesArrayResolved = await Promise.all(routesArray);

  const [bookmarks] = await Promise.all([getBookmarks()]);

  const mappedBookmarks = bookmarks.map(async (bookmark: any) => {
    return {
      url: await addPathToBaseURL(`/bookmarks/${bookmark.slug}`),
      lastModified: dayjs().toISOString(),
      changeFrequency: 'daily',
      priority: 1,
    };
  });

  const mappedBookmarksResolved = await Promise.all(mappedBookmarks);

  return [
    ...routesArrayResolved,
    ...craftsResolved,
    ...mappedBookmarksResolved,
  ];
}
