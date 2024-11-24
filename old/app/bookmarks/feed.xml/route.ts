import { meta } from "@/old/lib/constants";
import { getBookmarkItems, getBookmarks } from "@/old/lib/services/raindrop";
import RSS from "rss";

export async function GET() {
  const feed = new RSS({
    title: meta.name,
    description: meta.tagline,
    generator: "RSS for Node and Next.js",
    feed_url: "https://www.bucharitesh.in/bookmarks/feed.xml",
    site_url: "https://www.bucharitesh.in",
    managingEditor: "contact@bucharitesh.in (Ritesh Bucha)",
    webMaster: "contact@bucharitesh.in (Ritesh Bucha)",
    copyright: `Copyright ${new Date().getFullYear().toString()}, Ritesh Bucha`,
    language: "en-US",
    pubDate: new Date().toUTCString(),
    ttl: 60,
  });

  const bookmarks = await getBookmarks();

  const author = {
    name: "Ritesh Bucha",
    link: "https://bucharitesh.in",
  };

  const bookmarkList: any = [];
  for (const bookmark of bookmarks) {
    const bookmarkItems = await getBookmarkItems(bookmark._id);
    const { items = [] } = bookmarkItems ?? {};

    items?.slice(0, 10).forEach((bookmark) => {
      bookmarkList.push({
        id: bookmark._id,
        guid: bookmark._id,
        title: bookmark.title,
        link: bookmark.link,
        description: bookmark.excerpt,
        content: bookmark.excerpt,
        image: bookmark.cover,
        date: new Date(bookmark.created),
        updated: new Date(bookmark.lastUpdate),
        author: [author],
        contributor: [author],
      });
    });
  }

  const sortedBookmarks = bookmarkList.sort(
    (a, b) =>
      new Date(b.updated || b.created).getTime() -
      new Date(a.updated || a.created).getTime()
  );

  sortedBookmarks.forEach((bookmark) => {
    feed.item({ ...bookmark });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
