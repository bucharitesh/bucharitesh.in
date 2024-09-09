import { OOF_GRAD } from "@/lib/constants"
import { FormattedPost } from "@/lib/contentlayer"
import { components } from "@/ui/mdx"
import { LikeButton2 } from "@/ui/like-button-2"
import MostViewed from "@/ui/blog/most-viewed"
import { PostMetrics } from "@/ui/blog/post-metrics"
import { PostTableOfContents } from "@/ui/post-table-of-contents"
import { ScrollToTop } from "@/ui/ScrollToTop"
import { cn } from "@/lib/utils"
import { useMDXComponent } from "next-contentlayer/hooks"
import Link from "next/link"
import Balancer from "react-wrap-balancer"
import { ChevronLeft } from "lucide-react"

export default function Post({ post }: { post: FormattedPost }) {
  const MDXContent = useMDXComponent(post.body.code)

  return (
    <>
      <div className="mt-24 mb-4 xl:!col-end-5">
        <Link href="/blog" className="group inline-flex items-center space-x-2">
          <div className="transition rounded-full bg-primary-200/10 p-1 text-primary-200/80 group-hover:bg-primary-200/25 group-hover:text-primary-200">
            <ChevronLeft className="w-4 h-4 group-hover:scale-125 transition-transform group-active:scale-110" />
          </div>
          <div className="mt-0.5 text-primary-200/70 group-hover:text-primary-200/90 transition">
            All Posts
          </div>
        </Link>

        <h1 className={cn("mt-6 text-2xl font-medium sm:text-4xl", OOF_GRAD)}>
          <Balancer>{post.title}</Balancer>
        </h1>

        <div className="mt-4 flex space-x-2 text-primary-200/50">
          <div>{post.publishedAtFormatted}</div>
          <div className="text-primary-200/30">&middot;</div>
          <div>{post.readingTime}</div>
          <div className="text-primary-200/30">&middot;</div>
          <PostMetrics slug={post.slug} />
        </div>
      </div>

      <div className="sticky top-6 hidden h-0 xl:!col-start-4 xl:row-start-3 xl:block space-y-8">
        <div className="space-y-6">
          {post.headings ? (
            <>
              <PostTableOfContents headings={post.headings} />
              <div className="border-t-2 border-primary-200/5"></div>
            </>
          ) : null}

          <MostViewed />

          <div className="flex items-center justify-between">
            <LikeButton2 slug={post.slug} />
            {/* TODO: Wire this up: <ScrollProgress /> */}

            <ScrollToTop>Back to top</ScrollToTop>
          </div>
        </div>
      </div>

      <MDXContent components={components} />

      <div className="mt-16">
        <LikeButton2 slug={post.slug} />
      </div>
    </>
  )
}
