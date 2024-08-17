import { pick } from "contentlayer/client"
import { Post, Snippets } from "contentlayer/generated"

export const allTagNames = ["Next.js", "MDX", "Next Conf", "React Conf"]
export const allTagSlugs = ["next", "mdx", "next-conf", "react-conf"]

export const formatPostPreview = (post: Post) => {
  const partialPost = pick(post, [
    "tags",
    "slug",
    "title",
    "description",
    "publishedAt",
    "publishedAtFormatted",
    "readingTime",
  ])

  return {
    ...partialPost,
    type: post.type,
    description: partialPost.description ?? null,
    tags: partialPost.tags || [],
    readingTime: partialPost.readingTime.text ?? null,
  }
}

// don't send fields we don't use to the client
// the biggest culprit is post.body.raw (the raw MDX source)
export const formatPost = (
  {
    title,
    slug,
    publishedAtFormatted,
    description,
    body,
    series,
    headings,
    readingTime,
  }: Post,
  allPosts: Post[],
) => ({
  title,
  slug,
  publishedAtFormatted,
  description: description ?? null,
  body: {
    code: body.code,
  },
  readingTime: readingTime.text,
  headings:
    (headings as { heading: number; text: string; slug: string }[]) ?? null,
  series: series
    ? {
        title: series.title,
        posts: allPosts
          .filter((p) => p.series?.title === series.title)
          .sort(
            (a, b) =>
              Number(new Date(a.series!.order)) -
              Number(new Date(b.series!.order)),
          )
          .map((p) => {
            return {
              title: p.title,
              slug: p.slug,
              status: p.status,
              isCurrent: p.slug === slug,
            }
          }),
      }
    : null,
})

export type FormattedPost = ReturnType<typeof formatPost>;

export const formatSnippetsPreview = (snippet: Snippets) => {
  const partialSnippet = pick(snippet, [
    "slug",
    "title",
    "description",
  ])

  return {
    ...partialSnippet,
    description: partialSnippet.description ?? null,
  }
}

export const formatSnippet = (
  {
    title,
    slug,
    description,
    body,
  }: Snippets
) => ({
  title,
  slug,
  description: description ?? null,
  body: {
    code: body.code,
  }
})

export type FormattedSnippet = ReturnType<typeof formatSnippet>