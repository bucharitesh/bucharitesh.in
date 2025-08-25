import dayjs from "dayjs";
import { MetadataRoute } from "next";
import { headers } from "next/headers";
import { allCrafts } from "content-collections";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  let domain = headersList.get("host") as string;

  if (domain === "localhost:6969" || domain.endsWith(".vercel.app")) {
    // for local development and preview URLs
    domain = "bucharitesh.in";
  }

  const addPathToBaseURL = (path: string) => `https://${domain}${path}`;

  const crafts = allCrafts.map((post) => ({
    url: addPathToBaseURL(`/craft/${post.slug}`),
    lastModified: dayjs(post.date).toISOString(), // date format should be YYYY-MM-DD
  }));

  // const blogs = allPosts.map((post) => ({
  //   url: addPathToBaseURL(`/blog/${post.slug}`),
  //   lastModified: post.publishedAt, // date format should be YYYY-MM-DD
  // }));

  // const allBookmarks = await getBookmarks();

  // const bookmarks = allBookmarks.map((post) => ({
  //   url: addPathToBaseURL(`/bookmarks/${post.slug}`),
  //   lastModified: post.lastUpdate, // date format should be YYYY-MM
  // }));

  const routes = [
    "/",
    "/cal",
    "/guestbook",
    "/craft",
    // "/bookmarks",
    // "/blog",
    //  "/project",
    // "/design-inspiration",
    // "/uses",
  ].map((route) => ({
    url: addPathToBaseURL(route),
    lastModified: dayjs().toISOString(),
  }));

  return [...routes, ...crafts];
}
