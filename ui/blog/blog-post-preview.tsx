"use client"

import { formatPostPreview } from "@/lib/contentlayer"
import { useEnabledOnFirstIntersection } from "@/lib/hooks"
import { ContentLink } from "./content-link"

export const BlogPostPreview = (post: ReturnType<typeof formatPostPreview>) => {
  const { intersectionRef } = useEnabledOnFirstIntersection()

  return (
    <div ref={intersectionRef}>
      <ContentLink key={post.slug} href={`/blog/${post.slug}`}>
        <ContentLink.Title>{post.title}</ContentLink.Title>

        <ContentLink.Meta>
          <div>{post.publishedAtFormatted}</div>
          {/* {enabled ? <Metrics slug={post.slug} /> : null} */}
        </ContentLink.Meta>

        {post.description ? (
          <ContentLink.Text>{post.description}</ContentLink.Text>
        ) : null}
      </ContentLink>
    </div>
  )
}
