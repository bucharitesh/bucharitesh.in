import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import readingTime from "reading-time";
import {
  type RehypeCodeOptions,
  rehypeCode,
  remarkGfm,
  remarkHeading,
} from "fumadocs-core/mdx-plugins";

const rehypeCodeOptions: RehypeCodeOptions = {
  themes: {
    light: "catppuccin-mocha",
    dark: "catppuccin-mocha",
  },
};

// Define the post types as a union type
type PostType = "demo" | "blog" | "essay";

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
    image: z.string().nullable().optional(),
    blurImage: z.string().nullable().optional(),
    video: z.string().nullable().optional(),
  }),
  transform: async (page, context) => {
    try {
      // Only compile MDX if the post is not a redirect type
      let compiledBody: string | null = null;
      if (page.type !== "none") {
        compiledBody = await context.cache(page.content, async () =>
          compileMDX(context, page, {
            remarkPlugins: [remarkGfm, remarkHeading],
            rehypePlugins: [[rehypeCode, rehypeCodeOptions]],
          })
        );
      }
      // Calculate reading time for all posts, even redirects
      const calculatedReadingTime = readingTime(page.content).text;

      return {
        ...page,
        body: compiledBody || null,
        date: new Date(page.date),
        type: page.type,
        slug: page._meta.path,
        readingTime: calculatedReadingTime || null,
        // Only include image-related fields if they exist
        image: page.image || null,
        video: page.video || null,
        blurImage: page.blurImage || null,
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
      // Only compile MDX if the post is not a redirect type
      let compiledBody = await context.cache(page.content, async () =>
        compileMDX(context, page, {
          remarkPlugins: [remarkGfm, remarkHeading],
          rehypePlugins: [[rehypeCode, rehypeCodeOptions]],
        })
      );

      // Calculate reading time for all posts, even redirects
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

// Type definitions for better TypeScript support
export type Post = {
  title: string;
  description: string;
  date: Date;
  is_published: boolean;
  type: PostType;
  tags: string[];
  readingTime: string | null;
  body: any | null;
  video: string | null;
  image: string | null;
  blurImage: string | null;
  slug: string;
};
