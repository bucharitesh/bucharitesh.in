"use client"

import { useTrendingPosts } from "@/lib/hooks"
import { LoadingDots } from "@/ui/loading-dots"
import { cn } from "@/lib/utils"
import { ZapIcon } from "../icons"

export default function MostViewed() {
  const {
    posts,
    isLoading: viewsIsLoading,
    isError: viewsIsError,
  } = useTrendingPosts()

  return (
    <div className="space-y-6 bg-primary-300/10 p-4 rounded-xl">
      <div>
        <div className="flex items-start gap-2 mb-2.5 font-bold text-xs uppercase text-primary-200">
          Trending
          <ZapIcon />
        </div>
      </div>
      <ul className="space-y-2.5 text-sm list-outside list-decimal">
        {viewsIsError || viewsIsLoading ? (
          <LoadingDots />
        ) : (
          posts.map((post: any, index: number) => (
            <TrendingPostItem post={post} index={index} key={post.slug} />
          ))
        )}
      </ul>
    </div>
  )
}

const TrendingPostItem = ({
  post,
  index,
}: {
  post: any | undefined
  index: number
}) => {
  return (
    <a
      href={`/blog/${post.slug}`}
      className={cn(
        "block text-primary-200/50 transition-all hover:text-primary-100 pl-3",
      )}
    >
      <li className="-mx-0.5 animate-[mutation_2s_ease-in-out_1] rounded-md px-0.5 slashed-zero tabular-nums tracking-tight text-xs">
        {post.title}
      </li>
    </a>
  )
}
