"use client"

import { formatPostPreview } from "@/lib/contentlayer"
import { ContentLink } from "./content-link"
// import { InlineMetric } from "./inline-metric";

export const BlogPostPreview = (post: ReturnType<typeof formatPostPreview>) => {
  return (
    <div>
      <ContentLink key={post.slug} href={`/blog/${post.slug}`}>
        <ContentLink.Title>{post.title}</ContentLink.Title>

        <ContentLink.Meta>
          <div>{post.publishedAtFormatted}</div>
          <div className="text-primary-100/30">&middot;</div>
          <div>{post.readingTime}</div>
          {/* <div className="text-primary-100/30">&middot;</div>
          <div>
            <InlineMetric key={post.views} stat={post.views} /> views
          </div>
          <div className="text-primary-100/30">&middot;</div>
          <div>
            <InlineMetric key={post.likes} stat={post.likes} /> likes
          </div> */}
        </ContentLink.Meta>

        {post.description ? (
          <ContentLink.Text>{post.description}</ContentLink.Text>
        ) : null}
      </ContentLink>
    </div>
  )
}
