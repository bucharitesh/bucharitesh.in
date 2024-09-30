import { allCrafts } from "contentlayer/generated"

export const getCrafts = async () => {
  let snippets: any = []

  let all = [
    ...allCrafts
      // filter out draft posts
      // .filter((p) => p.status === "published")
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