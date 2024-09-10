import { pick } from "contentlayer/client"
import { Post, Snippets } from "contentlayer/generated"

export const formatPostPreview = (post: Post) => {
  const partialPost = pick(post, [
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
    headings,
    readingTime,
  }: Post,
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
})

export type FormattedPost = ReturnType<typeof formatPost>;

export const formatSnippetsPreview = (snippet: Snippets) => {
  const partialSnippet = pick(snippet, [
    "slug",
    "title",
    "description",
    "logo",
    "publishedAt",
    "publishedAtFormatted",
    "readingTime",
  ])

  return {
    ...partialSnippet,
    description: partialSnippet.description ?? null,
    logo: `/images/snippets/${partialSnippet.logo}` ?? null,
    readingTime: partialSnippet.readingTime.text ?? null,
  }
}

export const formatSnippet = ({
  title,
  slug,
  description,
  body,
  publishedAtFormatted,
  logo,
  readingTime,
  headings,
}: Snippets) => ({
  title,
  slug,
  description: description ?? null,
  body: {
    code: body.code,
  },
  logo: `/images/snippets/${logo}` ?? null,
  publishedAtFormatted,
  readingTime: readingTime.text,
  headings:
    (headings as { heading: number; text: string; slug: string }[]) ?? null,
})

export type FormattedSnippet = ReturnType<typeof formatSnippet>