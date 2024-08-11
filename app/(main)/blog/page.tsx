import { getParams, getPosts, type PostParams } from "@/lib/posts"
import { BlogPostPreview } from "@/ui/BlogPostPreview"
import YoutubeIcon from "@/ui/YoutubeIcon"

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
  const { posts } = getPosts(params);

  return (
    <div className="mt-8 space-y-10">
      {posts.map((post) => {
        if (post.type === "Post") {
          return <BlogPostPreview key={post.slug} {...post} />
        }
      })}
    </div>
  )
}
