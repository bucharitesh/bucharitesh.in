import { cache } from "react"
import "server-only"

import { formatPostPreview } from "@/lib/contentlayer"
import { allPosts } from "contentlayer/generated"

export const getAllPosts = cache(async () => {
  try {
    let posts: any = []

    let all = [
      ...allPosts
        // filter out draft posts
        .filter((p) => p.status === "published")
        .map(formatPostPreview),
    ]

     if (all.length > 0) {
       // sort posts by published date
       posts = all.sort(
         (a, b) =>
           Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)),
       )
     }

    return posts ?? []
  } catch (error) {
    console.info(error)
    return []
  }
})