import { OOF_GRAD } from "@/lib/constants"
import { getParams, getPosts, type PostParams } from "@/lib/posts"
import { BlogPostPreview } from "@/ui/BlogPostPreview"

import clsx from "clsx"
import Balancer from "react-wrap-balancer"

/**
 * Aside from our home page which lists all posts, we can further filter down
 * posts by type e.g. (post or video) and tag (e.g. react or next). We can use
 * `generateStaticParams()` to generate a static list of all possible params of
 * our filters based on our database of posts.
 */
export const generateStaticParams = () => {
  return getParams()
}

export default async function Page({ params }: { params: PostParams }) {
  const { posts } = getPosts(params)

  return (
    <>
      <div className="mt-24 mb-4 xl:!col-end-5">
        <h1 className={clsx("mt-6 text-2xl font-medium sm:text-4xl", OOF_GRAD)}>
          <Balancer>Blogs</Balancer>
        </h1>
      </div>

      {/* <div className="sticky top-6 hidden h-0 xl:!col-start-4 xl:row-start-3 xl:block">
        <div className="space-y-6">
          <div>
            <div className="mb-2.5 font-bold text-xs uppercase text-lavender-200">
              Trending
            </div>
          </div>
          <ul className="space-y-2.5 text-sm">
            {posts.map((post) => (
              <li className="truncate" key={post.slug}>
                <a
                  href={`/blog/${post.slug}`}
                  className={clsx(
                    "block text-lavender-200/50 underline-offset-2 transition-all hover:text-lavender-100 hover:underline hover:decoration-lavender-200/50 pl-3",
                  )}
                >
                  {post.title}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between">
            <ScrollProgress />
          </div>
        </div>
      </div> */}

      <div className="mt-8 space-y-10">
        {posts.map((post) => {
          if (post.type === "Post") {
            return <BlogPostPreview key={post.slug} {...post} />
          }
        })}
      </div>
    </>
  )
}
