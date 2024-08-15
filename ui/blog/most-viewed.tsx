"use client"

import { useTrendingPosts } from "@/lib/hooks"
import { LoadingDots } from "@/ui/loading-dots"
import { ArrowTrendingUpIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"

export default function MostViewed() {
  const {
    posts,
    isLoading: viewsIsLoading,
    isError: viewsIsError,
  } = useTrendingPosts()

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-start gap-2 mb-2.5 font-bold text-xs uppercase text-lavender-200">
          Trending
          <ArrowTrendingUpIcon className="h-4 w-4" />
        </div>
      </div>
      <ul className="space-y-2.5 text-sm">
        {viewsIsError || viewsIsLoading ? (
          <LoadingDots />
        ) : (
          posts.map((post: any) => <TrendingPost post={post} key={post.slug} />)
        )}
      </ul>
    </div>
  )
}

const TrendingPost = ({ post }: { post: any | undefined }) => {
  return (
    <a
      href={`/blog/${post.slug}`}
      className={clsx(
        "block text-lavender-200/50 underline-offset-2 transition-all hover:text-lavender-100 hover:underline hover:decoration-lavender-200/50 pl-3",
      )}
    >
      <li className="-mx-0.5 truncate animate-[mutation_2s_ease-in-out_1] rounded-md px-0.5 slashed-zero tabular-nums tracking-tight">
        {post.slug}
      </li>
    </a>
  )
}
