// content-collections.ts
import { defineCollection, defineConfig } from "@content-collections/core";
import readingTime from "reading-time";

// lib/media.ts
import { getPlaiceholder } from "plaiceholder";
import path from "path";
import fs from "fs/promises";
async function generateBlurUrl(mediaPath, config = { quality: 10, size: { width: 8, height: 8 } }) {
  try {
    let buffer;
    if (mediaPath.startsWith("http")) {
      const res = await fetch(mediaPath);
      buffer = Buffer.from(await res.arrayBuffer());
    } else {
      const fullPath = path.join(process.cwd(), "public", mediaPath);
      buffer = await fs.readFile(fullPath);
    }
    const { base64: blurDataURL } = await getPlaiceholder(buffer, {
      size: config.size?.width
    });
    return blurDataURL;
  } catch (error) {
    console.error(`Error generating blur URL for ${mediaPath}:`, error);
    return null;
  }
}

// content-collections.ts
import { compileMDX } from "@content-collections/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { codeImport } from "remark-code-import";
import remarkGfm from "remark-gfm";
import { createHighlighter } from "shiki";
import { visit as visit3 } from "unist-util-visit";

// lib/rehype-component.tsx
import fs2 from "fs";
import path2 from "path";
import { u } from "unist-builder";
import { visit } from "unist-util-visit";

// __registry__/index.tsx
import * as React from "react";
var Index = {
  "default": {
    "pixel-icon": {
      name: "pixel-icon",
      type: "registry:ui",
      registryDependencies: void 0,
      files: ["registry/default/bucharitesh/pixel-icon.tsx"],
      component: React.lazy(() => import("@/registry/default/bucharitesh/pixel-icon.tsx")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "split-text-effect": {
      name: "split-text-effect",
      type: "registry:ui",
      registryDependencies: void 0,
      files: ["registry/default/bucharitesh/split-text-effect.tsx"],
      component: React.lazy(() => import("@/registry/default/bucharitesh/split-text-effect.tsx")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "pixel-icon-demo": {
      name: "pixel-icon-demo",
      type: "registry:example",
      registryDependencies: ["pixel-icon"],
      files: ["registry/default/example/pixel-icon-demo.tsx"],
      component: React.lazy(() => import("@/registry/default/example/pixel-icon-demo.tsx")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "split-text-effect-demo": {
      name: "split-text-effect-demo",
      type: "registry:example",
      registryDependencies: ["split-text-effect"],
      files: ["registry/default/example/split-text-effect-demo.tsx"],
      component: React.lazy(() => import("@/registry/default/example/split-text-effect-demo.tsx")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "split-text-effect-demo-2": {
      name: "split-text-effect-demo-2",
      type: "registry:example",
      registryDependencies: ["split-text-effect"],
      files: ["registry/default/example/split-text-effect-demo-2.tsx"],
      component: React.lazy(() => import("@/registry/default/example/split-text-effect-demo-2.tsx")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "split-text-effect-demo-3": {
      name: "split-text-effect-demo-3",
      type: "registry:example",
      registryDependencies: ["split-text-effect"],
      files: ["registry/default/example/split-text-effect-demo-3.tsx"],
      component: React.lazy(() => import("@/registry/default/example/split-text-effect-demo-3.tsx")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "utils": {
      name: "utils",
      type: "registry:lib",
      registryDependencies: void 0,
      files: ["registry/default/lib/utils.ts"],
      component: React.lazy(() => import("@/registry/default/lib/utils.ts")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    }
  }
};

// registry/registry-styles.ts
var styles = [
  {
    name: "default",
    label: "Default"
  }
];

// lib/rehype-component.tsx
function rehypeComponent() {
  return async (tree) => {
    visit(tree, (node) => {
      const { value: srcPath } = getNodeAttributeByName(node, "src") || {};
      if (node.name === "ComponentSource") {
        const name = getNodeAttributeByName(node, "name")?.value;
        const fileName = getNodeAttributeByName(node, "fileName")?.value;
        if (!name && !srcPath) {
          return null;
        }
        try {
          for (const style of styles) {
            let src;
            if (srcPath) {
              src = srcPath;
            } else {
              const component = Index[style.name][name];
              src = fileName ? component.files.find((file) => {
                return file.endsWith(`${fileName}.tsx`) || file.endsWith(`${fileName}.ts`);
              }) || component.files[0] : component.files[0];
            }
            const filePath = path2.join(process.cwd(), src);
            let source = fs2.readFileSync(filePath, "utf8");
            source = source.replaceAll(
              `@/registry/${style.name}/`,
              "@/components/"
            );
            source = source.replaceAll("export default", "export");
            node.children?.push(
              u("element", {
                tagName: "pre",
                properties: {
                  __src__: src
                },
                attributes: [
                  {
                    name: "styleName",
                    type: "mdxJsxAttribute",
                    value: style.name
                  }
                ],
                children: [
                  u("element", {
                    tagName: "code",
                    properties: {
                      className: ["language-tsx"]
                    },
                    data: {
                      meta: `event="copy_source_code"`
                    },
                    children: [
                      {
                        type: "text",
                        value: source
                      }
                    ]
                  })
                ]
              })
            );
          }
        } catch (error) {
          console.error(error);
        }
      }
      if (node.name === "ComponentPreview" || node.name === "BlockPreview") {
        const name = getNodeAttributeByName(node, "name")?.value;
        if (!name) {
          return null;
        }
        try {
          for (const style of styles) {
            const component = Index[style.name][name];
            const src = component.files[0];
            const filePath = path2.join(process.cwd(), src);
            let source = fs2.readFileSync(filePath, "utf8");
            source = source.replaceAll(
              `@/registry/${style.name}/`,
              "@/components/"
            );
            source = source.replaceAll("export default", "export");
            node.children?.push(
              u("element", {
                tagName: "pre",
                properties: {
                  __src__: src
                },
                children: [
                  u("element", {
                    tagName: "code",
                    properties: {
                      className: ["language-tsx"]
                    },
                    data: {
                      meta: `event="copy_usage_code"`
                    },
                    children: [
                      {
                        type: "text",
                        value: source
                      }
                    ]
                  })
                ]
              })
            );
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
  };
}
function getNodeAttributeByName(node, name) {
  return node.attributes?.find((attribute) => attribute.name === name);
}

// lib/rehype-npm-command.tsx
import { visit as visit2 } from "unist-util-visit";
function rehypeNpmCommand() {
  return (tree) => {
    visit2(tree, (node) => {
      if (node.type !== "element" || node?.tagName !== "pre") {
        return;
      }
      if (node.properties?.["__rawString__"]?.startsWith("npm install")) {
        const npmCommand = node.properties?.["__rawString__"];
        node.properties["__npmCommand__"] = npmCommand;
        node.properties["__yarnCommand__"] = npmCommand.replace(
          "npm install",
          "yarn add"
        );
        node.properties["__pnpmCommand__"] = npmCommand.replace(
          "npm install",
          "pnpm add"
        );
        node.properties["__bunCommand__"] = npmCommand.replace(
          "npm install",
          "bun add"
        );
      }
      if (node.properties?.["__rawString__"]?.startsWith("npx create-")) {
        const npmCommand = node.properties?.["__rawString__"];
        node.properties["__npmCommand__"] = npmCommand;
        node.properties["__yarnCommand__"] = npmCommand.replace(
          "npx create-",
          "yarn create "
        );
        node.properties["__pnpmCommand__"] = npmCommand.replace(
          "npx create-",
          "pnpm create "
        );
        node.properties["__bunCommand__"] = npmCommand.replace(
          "npx",
          "bunx --bun"
        );
      }
      if (node.properties?.["__rawString__"]?.startsWith("npx") && !node.properties?.["__rawString__"]?.startsWith("npx create-")) {
        const npmCommand = node.properties?.["__rawString__"];
        node.properties["__npmCommand__"] = npmCommand;
        node.properties["__yarnCommand__"] = npmCommand;
        node.properties["__pnpmCommand__"] = npmCommand.replace(
          "npx",
          "pnpm dlx"
        );
        node.properties["__bunCommand__"] = npmCommand.replace(
          "npx",
          "bunx --bun"
        );
      }
      if (node.properties?.["__rawString__"]?.startsWith("npm create")) {
        const npmCommand = node.properties?.["__rawString__"];
        node.properties["__npmCommand__"] = npmCommand;
        node.properties["__yarnCommand__"] = npmCommand.replace(
          "npm create",
          "yarn create"
        );
        node.properties["__pnpmCommand__"] = npmCommand.replace(
          "npm create",
          "pnpm create"
        );
        node.properties["__bunCommand__"] = npmCommand.replace(
          "npm create",
          "bun create"
        );
      }
    });
  };
}

// content-collections.ts
var prettyCodeOptions = {
  theme: "github-dark",
  getHighlighter: (options) => createHighlighter({
    ...options
  }),
  onVisitLine(node) {
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
  }
};
var crafts = defineCollection({
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
    theme: z.enum(["light", "dark"]).default("light")
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
            visit3(tree, (node) => {
              if (node?.type === "element" && node?.tagName === "pre") {
                const [codeEl] = node.children;
                if (codeEl.tagName !== "code") {
                  return;
                }
                if (codeEl.data?.meta) {
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
            visit3(tree, (node) => {
              if (node?.type === "element" && node?.tagName === "figure") {
                if (!("data-rehype-pretty-code-figure" in node.properties)) {
                  return;
                }
                const preElement = node.children.at(-1);
                if (preElement.tagName !== "pre") {
                  return;
                }
                preElement.properties["__withMeta__"] = node.children.at(0).tagName === "div";
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
                ariaLabel: "Link to section"
              }
            }
          ]
        ]
      });
      let blurImage = null;
      if (page.image) {
        blurImage = await context.cache(
          `blur-${page.image}`,
          async () => generateBlurUrl(page?.image ?? "")
        );
      }
      return {
        ...page,
        body: {
          raw: page.content,
          code: body
        },
        date: new Date(page.date),
        type: page.type,
        slug: page._meta.path,
        image: page.image,
        video: page.video,
        theme: page.theme,
        blurImage
      };
    } catch (error) {
      console.error(`Error transforming page ${page._meta.path}:`, error);
      throw error;
    }
  }
});
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
    // Optional fields
    tags: z.array(z.string()).default([]),
    image: z.string().nullable().optional(),
    blurImage: z.string().nullable().optional(),
    // These will be computed in transform
    readingTime: z.string().nullable().optional(),
    body: z.any().nullable().optional()
  }),
  transform: async (page, context) => {
    try {
      const calculatedReadingTime = readingTime(page.content).text;
      return {
        ...page,
        date: new Date(page.date),
        slug: page._meta.path,
        readingTime: calculatedReadingTime || null,
        // Only include image-related fields if they exist
        image: page.image || null,
        blurImage: page.blurImage || null
      };
    } catch (error) {
      console.error(`Error transforming page ${page._meta.path}:`, error);
      throw error;
    }
  }
});
var content_collections_default = defineConfig({
  collections: [crafts, posts]
});
export {
  content_collections_default as default
};
