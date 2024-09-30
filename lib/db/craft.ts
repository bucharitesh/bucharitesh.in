import { defineDocumentType, defineNestedType } from "contentlayer/source-files"
import GithubSlugger from "github-slugger"
// esbuild doesn't support module aliases 😤🤌
// https://github.com/evanw/esbuild/issues/394
// https://github.com/contentlayerdev/contentlayer/issues/238
import { formatShortDate } from "../formatShortDate"

const LinksProperties = defineNestedType(() => ({
  name: "LinksProperties",
  fields: {
    doc: {
      type: "string",
    },
    api: {
      type: "string",
    },
  },
}))

export const Craft = defineDocumentType(() => ({
  name: "Craft",
  filePathPattern: "craft/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    publishedAt: { type: "string", required: true },
    logo: { type: "string", required: false },
    published: {
      type: "boolean",
      default: true,
    },
    links: {
      type: "nested",
      of: LinksProperties,
    },
    featured: {
      type: "boolean",
      default: false,
      required: false,
    },
    toc: { type: "boolean", default: true, required: false },
    author: { type: "string", required: false },
    video: { type: "string", required: false },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc: any) => `/${doc._raw.flattenedPath}`,
    },
    slugAsParams: {
      type: "string",
      resolve: (doc: any) =>
        doc._raw.flattenedPath.split("/").slice(1).join("/"),
    },
    url: {
      type: "string",
      resolve: (post: any) => `/${post._raw.flattenedPath}`,
    },
    publishedAtFormatted: {
      type: "string",
      resolve: (doc) => {
        return formatShortDate(doc.publishedAt as string)
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
