import { defineCollection, defineConfig } from "@content-collections/core";
import readingTime from "reading-time";
import { generateBlurUrl } from "./lib/media";
import { compileMDX } from "@content-collections/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { codeImport } from "remark-code-import";
import remarkGfm from "remark-gfm";
import { createHighlighter } from "shiki";
import { visit } from "unist-util-visit";

import { rehypeComponent } from "./lib/rehype-component";
import { rehypeNpmCommand } from "./lib/rehype-npm-command";

const prettyCodeOptions: Options = {
  theme: "github-dark",
  getHighlighter: (options) =>
    createHighlighter({
      ...options,
    }),
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and allow empty
    // lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node) {
    if (!node.properties.className) {
      node.properties.className = [];
    }
    node.properties.className.push("line--highlighted");
  },
  onVisitHighlightedChars(node) {
    if (!node.properties.className) {
      node.properties.className = [];
    }
    node.properties.className = ["word--highlighted"];
  },
};
const crafts = defineCollection({
  name: "crafts",
  directory: "content/crafts",
  include: "**/*.mdx",
  schema: (z) => ({
    // Required fields
    title: z.string(),
    description: z.string(),
    type: z.enum(["component", "code", "none"]).default("none").optional(),
    date: z.string(),
    published: z.boolean().default(false),
    // Optional fields
    tags: z.array(z.string()).default([]),
    image: z.string(),
    video: z.string().nullable().optional(),
    theme: z.enum(["light", "dark"]).default("light"),
  }),
  transform: async (page, context) => {
    try {
      const body = await compileMDX(context, page, {
        // @ts-ignore
        remarkPlugins: [codeImport, remarkGfm],
        rehypePlugins: [
          // @ts-ignore
          rehypeSlug,
          rehypeComponent,
          () => (tree) => {
            visit(tree, (node) => {
              if (node?.type === "element" && node?.tagName === "pre") {
                const [codeEl] = node.children;
                if (codeEl.tagName !== "code") {
                  return;
                }
                if (codeEl.data?.meta) {
                  // Extract event from meta and pass it down the tree.
                  const regex = /event="([^"]*)"/;
                  const match = codeEl.data?.meta.match(regex);
                  if (match) {
                    node.__event__ = match ? match[1] : null;
                    codeEl.data.meta = codeEl.data.meta.replace(regex, "");
                  }
                }
                node.__rawString__ = codeEl.children?.[0].value;
                node.__src__ = node.properties?.__src__;
                node.__style__ = node.properties?.__style__;
              }
            });
          },
          [rehypePrettyCode, prettyCodeOptions],
          () => (tree) => {
            visit(tree, (node) => {
              if (node?.type === "element" && node?.tagName === "figure") {
                if (!("data-rehype-pretty-code-figure" in node.properties)) {
                  return;
                }

                const preElement = node.children.at(-1);
                if (preElement.tagName !== "pre") {
                  return;
                }

                preElement.properties["__withMeta__"] =
                  node.children.at(0).tagName === "div";
                preElement.properties["__rawString__"] = node.__rawString__;

                if (node.__src__) {
                  preElement.properties["__src__"] = node.__src__;
                }

                if (node.__event__) {
                  preElement.properties["__event__"] = node.__event__;
                }

                if (node.__style__) {
                  preElement.properties["__style__"] = node.__style__;
                }
              }
            });
          },
          rehypeNpmCommand,
          [
            // @ts-ignore
            rehypeAutolinkHeadings,
            {
              properties: {
                className: ["subheading-anchor"],
                ariaLabel: "Link to section",
              },
            },
          ],
        ],
      });

      // Generate blur URLs for images if they don't already exist
      let blurImage: string | null = null;
      if (page.image) {
        blurImage = await context.cache(`blur-${page.image}`, async () =>
          generateBlurUrl(page?.image ?? "")
        );
      }

      return {
        ...page,
        body: {
          raw: page.content,
          code: body,
        },
        date: new Date(page.date),
        type: page.type,
        slug: page._meta.path,
        image: page.image,
        video: page.video,
        theme: page.theme,
        blurImage,
      };
    } catch (error) {
      console.error(`Error transforming page ${page._meta.path}:`, error);
      throw error;
    }
  },
});

const posts = defineCollection({
  name: "posts",
  directory: "content/posts",
  include: "**/*.mdx",
  schema: (z) => ({
    // Required fields
    title: z.string(),
    description: z.string(),
    date: z.string(),
    is_published: z.boolean().default(false),
    // Optional fields
    tags: z.array(z.string()).default([]),
    image: z.string().nullable().optional(),
    blurImage: z.string().nullable().optional(),

    // These will be computed in transform
    readingTime: z.string().nullable().optional(),
    body: z.any().nullable().optional(),
  }),
  transform: async (page, context) => {
    try {
      // Calculate reading time for all posts, even redirects
      const calculatedReadingTime = readingTime(page.content).text;

      return {
        ...page,
        date: new Date(page.date),
        slug: page._meta.path,
        readingTime: calculatedReadingTime || null,
        // Only include image-related fields if they exist
        image: page.image || null,
        blurImage: page.blurImage || null,
      };
    } catch (error) {
      console.error(`Error transforming page ${page._meta.path}:`, error);
      throw error;
    }
  },
});

export default defineConfig({
  collections: [crafts, posts],
});
