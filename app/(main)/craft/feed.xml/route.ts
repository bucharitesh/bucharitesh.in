import { meta } from "@/lib/constants"
import { allCrafts } from "contentlayer/generated"
import RSS from "rss"

export async function GET() {
  const feed = new RSS({
    title: meta.name,
    description: meta.tagline,
    generator: "RSS for Node and Next.js",
    feed_url: "https://www.bucharitesh.in/craft/feed.xml",
    site_url: "https://www.bucharitesh.in",
    managingEditor: "contact@bucharitesh.in (Ritesh Bucha)",
    webMaster: "contact@bucharitesh.in (Ritesh Bucha)",
    copyright: `Copyright ${new Date().getFullYear().toString()}, Ritesh Bucha`,
    language: "en-US",
    pubDate: new Date().toUTCString(),
    ttl: 60,
  })

  allCrafts
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .map((post) => {
      feed.item({
        title: post.title,
        description: post.description,
        url: `https://www.bucharitesh.in/craft/${post.slugAsParams}`,
        author: "Ritesh Bucha",
        date: post.publishedAt,
      })
    })
  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  })
}
