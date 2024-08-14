"use client"

import { usePollIfInView } from "@/lib/hooks"
import { usePostViews, usePostLikes } from "@/lib/hooks"
import { InlineMetric } from "@/ui/InlineMetric"
import { LoadingDots } from "@/ui/LoadingDots"
import React from "react"

export const PostMetrics = ({ slug }: { slug: string }) => {
  const interval = 5000
  const { shouldPoll, intersectionRef } = usePollIfInView(interval)

  const {
    views,
    isLoading: viewsIsLoading,
    isError: viewsIsError,
    increment: incrementViews,
  } = usePostViews(slug, {
    // Avoid fetching view count we *know* is stale since increment() mutation
    // returns view count
    revalidateOnMount: false,
    // Only poll when in view
    refreshInterval: shouldPoll ? interval : 0,
    // Override `usePostViews` default dedupingInterval for the polling usecase
    // (refresh interval can never be faster than deduping interval)
    dedupingInterval: interval,
  })

  const {
    likes,
    isLoading: likesIsLoading,
    isError: likesIsError,
  } = usePostLikes(slug, {
    // only poll when in view
    refreshInterval: shouldPoll ? interval : 0,
  })

  console.log("xxxx", likes)

  React.useEffect(() => {
    incrementViews()
  }, [])

  return (
    <>
      <div ref={intersectionRef}>
        {viewsIsError || viewsIsLoading ? (
          <LoadingDots />
        ) : (
          <InlineMetric key={views} stat={views} />
        )}{" "}
        views
      </div>

      <div className="text-lavender-100/30">&middot;</div>

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
