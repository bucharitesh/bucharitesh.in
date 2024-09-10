import { defineDocumentType } from "contentlayer/source-files"
import readingTime from "reading-time"
import { formatShortDate } from "../formatShortDate"
import GithubSlugger from "github-slugger"

export const Snippets = defineDocumentType(() => ({
  name: "Snippets",
  filePathPattern: "snippets/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string" },
    logo: { type: "string", required: true },
    publishedAt: { type: "string", required: true },
    status: { type: "enum", options: ["draft", "published"], required: true },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) =>
        doc._raw.sourceFileName
          // hello-world.mdx => hello-world
          .replace(/\.mdx$/, ""),
    },
    readingTime: {
      type: "json",
      resolve: (doc) => readingTime(doc.body.raw),
    },
    publishedAtFormatted: {
      type: "string",
      resolve: (doc) => {
        return formatShortDate(doc.publishedAt)
      },
    },
    headings: {
      type: "json",
      resolve: async (doc) => {
        // use same package as rehypeSlug so table of contents and sluggified
        // headings match
        // https://github.com/rehypejs/rehype-slug/blob/main/package.json#L36
        const slugger = new GithubSlugger()

        // https://stackoverflow.com/a/70802303
        // @ts-ignore
        const regXHeader = /\n\n(?<flag>#{1,6})\s+(?<content>.+)/g

        const headings = Array.from(doc.body.raw.matchAll(regXHeader)).map(
          ({ groups }) => {
            const flag = groups?.flag
            const content = groups?.content
            return {
              heading: flag?.length,
              text: content,
              slug: content ? slugger.slug(content) : undefined,
            }
          },
        )

        return headings
      },
    },
  },
}))
