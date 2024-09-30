import { makeSource } from "contentlayer/source-files"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
// esbuild doesn't support module aliases 😤🤌
// https://github.com/evanw/esbuild/issues/394
// https://github.com/contentlayerdev/contentlayer/issues/238
import { Post } from "./lib/db/post"
import { Snippets } from "./lib/db/snippets"
import { UseItem, UseCategory } from "./lib/db/uses"
import { DesignInspirationItem } from "./lib/db/design-inspiraion"

import { visit } from "unist-util-visit"
import { rehypePrettyCodeClasses, rehypePrettyCodeOptions } from "./lib/rehyePrettyCode"
import { HEADING_LINK_ANCHOR } from "./lib/constants"

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post, Snippets, UseItem, UseCategory, DesignInspirationItem],
  mdx: {
    esbuildOptions(options) {
      options.target = "esnext"
      return options
    },
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "pre") {
            const [codeEl] = node.children
            if (codeEl.tagName !== "code") {
              return
            }

            if (codeEl.data?.meta) {
              // Extract event from meta and pass it down the tree.
              const regex = /event="([^"]*)"/
              const match = codeEl.data?.meta.match(regex)
              if (match) {
                node.__event__ = match ? match[1] : null
                codeEl.data.meta = codeEl.data.meta.replace(regex, "")
              }
            }

            node.__rawString__ = codeEl.children?.[0].value
            node.__style__ = node.properties?.__style__
          }
        })
      },
      [rehypePrettyCode, rehypePrettyCodeOptions],
      [rehypePrettyCodeClasses],
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "div") {
            if (!("data-rehype-pretty-code-fragment" in node.properties)) {
              return
            }

            const preElement = node.children.at(-1)
            if (preElement.tagName !== "pre") {
              return
            }

            preElement.properties["__withMeta__"] =
              node.children.at(0).tagName === "div"
            preElement.properties["__rawString__"] = node.__rawString__

            if (node.__src__) {
              preElement.properties["__src__"] = node.__src__
            }

            if (node.__event__) {
              preElement.properties["__event__"] = node.__event__
            }

            if (node.__style__) {
              preElement.properties["__style__"] = node.__style__
            }
          }
        })
      },
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["anchor"],
            ariaLabel: "Link to section",
          },
        },
        {
          behavior: "wrap",
          properties: {
            className: [HEADING_LINK_ANCHOR],
          },
        },
      ],
    ],
  },
})
