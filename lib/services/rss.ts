import fs from "fs"
import { headers } from "next/headers"
import RSS from "rss"

export default async function generateRssFeed(allPosts) {
  const header = headers()

  const host = header.entries()

  const site_url =
    process.env.NODE_ENV === "production" ? `https://${host}` : `http://${host}`

  const feedOptions = {
    title: "Blog posts | RSS Feed",
    description: "Welcome to this blog posts!",
    site_url,
    feed_url: `${site_url}/rss.xml`,
    image_url: `${site_url}/logo.jpeg`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, Ritesh Bucha`,
  }

  const feed = new RSS(feedOptions)

  // Add each individual post to the feed.
  allPosts.map((post) => {
    feed.item({
      title: post.metadata.title,
      description: post.metadata.summary,
      url: `${site_url}/blog/${post.slug}`,
      date: post.metadata.publishedAt,
      tag: post.metadata.tag,
    })
  })

  // Write the RSS feed to a file as XML.
  fs.writeFileSync("./public/rss.xml", feed.xml({ indent: true }))
}
