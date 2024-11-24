import { meta } from "@/old/lib/constants";
import { getAllPosts } from "@/old/lib/crafts";
import RSS from "rss";

export async function GET() {
  const feed = new RSS({
    title: meta.name,
    description: meta.tagline,
    generator: "RSS for Node and Next.js",
    feed_url: "https://www.bucharitesh.in/blog/feed.xml",
    site_url: "https://www.bucharitesh.in",
    managingEditor: "contact@bucharitesh.in (Ritesh Bucha)",
    webMaster: "contact@bucharitesh.in (Ritesh Bucha)",
    copyright: `Copyright ${new Date().getFullYear().toString()}, Ritesh Bucha`,
    language: "en-US",
    pubDate: new Date().toUTCString(),
    ttl: 60,
  });

  const allPosts = await getAllPosts();

  allPosts.map((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `https://www.bucharitesh.in/blog/${post.slug}`,
      author: "Ritesh Bucha",
      date: post.publishedAt,
    });
  });
  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
