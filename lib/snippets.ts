import { formatSnippetsPreview } from "@/lib/contentlayer"
import { allSnippets } from "contentlayer/generated"

export const getSnippets = async () => {
  let snippets: any = []

  let all = [
    ...allSnippets
      // filter out draft posts
      // .filter((p) => p.status === "published")
      .map(formatSnippetsPreview),
  ]

  // const posts_db = await getPostLikesAndViews();

  // if (posts_db.length > 0) {
  //   posts = getActivePostsWithStats(all, posts_db);
  // }

  if (all.length > 0) {
    // sort posts by published date
    snippets = all
  }

  return { snippets }
}