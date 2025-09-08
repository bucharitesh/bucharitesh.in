import dayjs from "dayjs";
import { MetadataRoute } from "next";
import { ENABLE_BUDDY } from "@/config/site";
import { getAllCrafts } from "@/features/craft/data/posts";
import { addPathToBaseURL, getDomain } from "@/lib/url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
  ].concat(ENABLE_BUDDY ? ["/buddy"] : []);

  let routesArray = await routes.map(async (route) => ({
    url: await addPathToBaseURL(route),
    lastModified: dayjs().toISOString(),
  }));

  const crafts = await getAllCrafts().map(async (post) => ({
    url: await addPathToBaseURL(`/craft/${post.slug}`),
    lastModified: dayjs(post.metadata.date).toISOString(),
  }));

  const craftsResolved = await Promise.all(crafts);
  const routesArrayResolved = await Promise.all(routesArray);

  return [...routesArrayResolved, ...craftsResolved];
}
