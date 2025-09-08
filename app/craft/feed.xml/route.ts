import { getAllPosts } from "@/features/craft/data/posts";
import { USER } from "@/config/user";
import RSS from "rss";

export async function GET() {
  const allPosts = getAllPosts();

  const feed = new RSS({
    title: USER.name,
    description: USER.tagline,
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

  allPosts.map((post) => {
    feed.item({
      title: post.metadata.title,
      description: post.metadata.description,
      url: `https://www.bucharitesh.in/craft/${post.slug}`,
      author: "Ritesh Bucha",
      date: new Date(post.metadata.date),
    });
  });
  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
