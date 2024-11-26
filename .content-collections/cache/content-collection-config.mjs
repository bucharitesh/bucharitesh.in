// content-collections.ts
import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import readingTime from "reading-time";
import {
  rehypeCode,
  remarkGfm,
  remarkHeading
} from "fumadocs-core/mdx-plugins";
var rehypeCodeOptions = {
  themes: {
    light: "catppuccin-mocha",
    dark: "catppuccin-mocha"
  }
};
var posts = defineCollection({
  name: "posts",
  directory: "content/posts",
  include: "**/*.mdx",
  schema: (z) => ({
    // Required fields
    title: z.string(),
    description: z.string(),
    date: z.string(),
    is_published: z.boolean().default(false),
    type: z.enum(["none", "demo", "blog", "essay"]),
    // Optional fields
    tags: z.array(z.string()).default([]),
    video: z.string().nullable().optional(),
    image: z.string().nullable().optional(),
    blurImage: z.string().nullable().optional(),
    // These will be computed in transform
    readingTime: z.string().nullable().optional(),
    body: z.any().nullable().optional()
  }),
  transform: async (page, context) => {
    try {
      let compiledBody = null;
      if (page.type !== "none") {
        compiledBody = await context.cache(
          page.content,
          async () => compileMDX(context, page, {
            remarkPlugins: [remarkGfm, remarkHeading],
            rehypePlugins: [[rehypeCode, rehypeCodeOptions]]
          })
        );
      }
      const calculatedReadingTime = readingTime(page.content).text;
      return {
        ...page,
        body: compiledBody || null,
        date: new Date(page.date),
        slug: page._meta.path,
        readingTime: calculatedReadingTime || null,
        // Only include image-related fields if they exist
        image: page.image || null,
        blurImage: page.blurImage || null,
        video: page.video || null
      };
    } catch (error) {
      console.error(`Error transforming page ${page._meta.path}:`, error);
      throw error;
    }
  }
});
var content_collections_default = defineConfig({
  collections: [posts]
});
export {
  content_collections_default as default
};
