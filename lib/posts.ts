// import { cache } from "react"
import "server-only"

import { formatPostPreview } from "@/lib/contentlayer"
import { allPosts } from "contentlayer/generated"

// const API_URL = `http://localhost:3000/api/posts/all`

// export async function getPostLikesAndViews(): Promise<any> {
//   const res = await fetch(API_URL)
//   if (!res.ok) {
//     throw new Error("An error occurred while fetching the data.")
//   }

//   return res.json()
// }

export const getAllPosts = (async () => {
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

// export function getActivePostsWithStats(allActive, db) {
//   return allActive.map((post) => {
//     const stats = db.find((item) => item.slug === post.slug) || {
//       likes: 0,
//       views: 0,
//     }
//     return {
//       ...post,
//       likes: stats.likes,
//       views: stats.views,
//     }
//   })
// }
