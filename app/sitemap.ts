import { getBookmarks } from "@/lib/services/raindrop";
import { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = headers();
  let domain = headersList.get("host") as string;

  if (domain === "localhost:8888" || domain.endsWith(".vercel.app")) {
    // for local development and preview URLs
    domain = "bucharitesh.in";
  }

  const addPathToBaseURL = (path: string) => `https://${domain}${path}`;

  // const crafts = allCrafts.map((post) => ({
  //   url: addPathToBaseURL(`/craft/${post.slug}`),
  //   lastModified: post.publishedAt, // date format should be YYYY-MM
  // }));

  // const blogs = allPosts.map((post) => ({
  //   url: addPathToBaseURL(`/blog/${post.slug}`),
  //   lastModified: post.publishedAt, // date format should be YYYY-MM-DD
  // }));

  const allBookmarks = await getBookmarks();

  const bookmarks = allBookmarks.map((post) => ({
    url: addPathToBaseURL(`/bookmarks/${post.slug}`),
    lastModified: post.lastUpdate, // date format should be YYYY-MM
  }));

  const routes = [
    "/",
    "/cal",
    "/guestbook",
    "/bookmarks",
    // "/blog",
    "/craft",
    //  "/project",
    // "/design-inspiration",
    // "/uses",
  ].map((route) => ({
    url: addPathToBaseURL(route),
    lastModified: new Date(),
  }));

  return [...routes, ...bookmarks];
}
