import { usePostViews, usePostLikes } from "@/lib/hooks"
import { InlineMetric } from "@/ui/blog/inline-metric"
import { LoadingDots } from "@/ui/loading-dots"

const Metrics = ({ slug }: { slug: string }) => {
  const {
    views,
    isLoading: viewsIsLoading,
    isError: viewsIsError,
  } = usePostViews(slug)

  const {
    likes,
    isLoading: likesIsLoading,
    isError: likesIsError,
  } = usePostLikes(slug)

  return (
    <>
      <div className="text-primary-100/30">&middot;</div>

      <div>
        {viewsIsError || viewsIsLoading ? (
          <LoadingDots />
        ) : (
          <InlineMetric key={views} stat={views} />
        )}{" "}
        views
      </div>

      <div className="text-primary-100/30">&middot;</div>

      <div>
        {likesIsError || likesIsLoading ? (
          <LoadingDots />
        ) : (
          <InlineMetric key={likes} stat={likes} />
        )}{" "}
        likes
      </div>
    </>
  )
}
