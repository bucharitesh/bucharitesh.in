import { OOF_GRAD } from "@/lib/constants"
import { getPosts } from "@/lib/posts"
import { BlogPostPreview } from "@/ui/blog/blog-post-preview"

import clsx from "clsx"
import Balancer from "react-wrap-balancer"
import MostViewed from "@/ui/blog/most-viewed"

/**
 * Aside from our home page which lists all posts, we can further filter down
 * posts by type e.g. (post or video) and tag (e.g. react or next). We can use
 * `generateStaticParams()` to generate a static list of all possible params of
 * our filters based on our database of posts.
 */
// export const generateStaticParams = () => {
//   return getParams()
// }

export default async function Page() {
  const { posts } = await getPosts()

  return (
    <>
      <div className="mt-24 mb-4 xl:!col-end-5">
        <h1 className={clsx("mt-6 text-2xl font-medium sm:text-4xl", OOF_GRAD)}>
          <Balancer>Blogs</Balancer>
        </h1>
      </div>

      {posts.length > 5 && (
        <div className="sticky top-6 hidden h-0 xl:!col-start-4 xl:row-start-3 xl:block">
          <MostViewed />
        </div>
      )}

      <div className="space-y-10">
        {posts.map((post) => {
          return <BlogPostPreview key={post.slug} {...post} />
        })}
      </div>
    </>
  )
}
