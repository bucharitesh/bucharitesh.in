import { getPosts } from "@/lib/posts"
import { BlogItem } from "@/ui/blog/blog-item"
import { BlogPostPreview } from "@/ui/blog/blog-post-preview"

import MostViewed from "@/ui/blog/most-viewed"
import { Button } from "@/ui/button"
import PageWrapper from "@/ui/layout/page-wrapper"
import { Rss } from "lucide-react"
import Link from "next/link"
import { Metadata } from "next/types"

/**
 * Aside from our home page which lists all posts, we can further filter down
 * posts by type e.g. (post or video) and tag (e.g. react or next). We can use
 * `generateStaticParams()` to generate a static list of all possible params of
 * our filters based on our database of posts.
 */

export const metadata: Metadata = {
  title: "Blog",
  description: "Read my thoughts on software development, design, and more.",
  alternates: {
    canonical: "/blog",
  },
}

export default async function Page() {
  const { posts } = await getPosts()

  return (
    <PageWrapper
      title="Blogs"
      description="Read my thoughts on software development, design, and more."
      action={
        <Button variant={"secondary"} className="py-5">
          <Link href="/blog/feed.xml">
            <Rss className="h-4 w-4" />
          </Link>
        </Button>
      }
    >
      {posts && (
        <div className="sticky top-6 hidden h-0 xl:!col-start-4 xl:row-start-3 xl:block">
          <MostViewed />
        </div>
      )}

      <div>
        {posts.map((post) => {
          return <BlogItem key={post.slug} {...post} />
        })}
      </div>
    </PageWrapper>
  )
}
