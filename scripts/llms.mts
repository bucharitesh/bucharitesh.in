// Load environment variables FIRST, before any imports
import dotenv from "dotenv";
dotenv.config({ path: '.env.development' });

import { promises as fs } from "node:fs";
import path from "node:path";

import { type Registry } from "shadcn/schema";

import { examples } from "../registry/registry-examples";
import { components as registryComponents } from "../registry/registry-components";

import { USER } from "../config/user";

import { getAllPosts } from "../features/craft/data/posts";
import { getBookmarks } from "../features/bookmarks/lib/raindrop";

type RegistryItem = Registry["items"][number];

type FileEntry = string | { path: string; type?: string; target?: string };

async function readRegistryFilesContents(item: RegistryItem): Promise<string> {
  if (!item.files?.length) return "";

  const paths = item.files
    .map((f: FileEntry) => (typeof f === "string" ? f : f?.path))
    .filter(Boolean)
    .sort() as string[];

  // Read all files in parallel
  const contents = await Promise.all(
    paths.map(async (filePath) => {
      try {
        // Check if it's a component or example path and resolve correctly
        let fullPath: string;
        if (filePath.startsWith("examples/")) {
          fullPath = path.join(
            process.cwd(),
            "registry/default/example",
            filePath.replace("examples/", "")
          );
        } else {
          fullPath = path.join(
            process.cwd(),
            "registry/default/bucharitesh",
            filePath
          );
        }

        const content = await fs.readFile(fullPath, "utf8");
        return `--- file: ${filePath} ---\n${content.endsWith("\n") ? content : content + "\n"}`;
      } catch (error) {
        console.warn(
          `Warning: Could not read file ${filePath}:`,
          error instanceof Error ? error.message : "Unknown error"
        );
        return null; // Skip missing files
      }
    })
  );

  // Join non-null contents with blank lines between them
  return contents.filter(Boolean).join("\n");
}

function getComponentExamples() {
  const examplesByComponent = new Map<string, string[]>();

  examples.forEach((example) => {
    example.registryDependencies?.forEach((dep) => {
      const componentName = dep.split("/").pop();
      if (componentName) {
        if (!examplesByComponent.has(componentName)) {
          examplesByComponent.set(componentName, []);
        }
        examplesByComponent.get(componentName)!.push(example.name);
      }
    });
  });

  return examplesByComponent;
}

async function generateLlmsContent() {
  const components = registryComponents
    .filter((item) => item.type === "registry:component")
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((component) => {
      const title = (component as any).title || component.name;
      const description =
        (component as any).description || `The ${title} component.`;
      return `- [${title}](${USER.website}/craft/${component.name}): ${description}`;
    });

  const exampleSet = new Set<string>();
  const examplesList = examples
    .filter((example) => {
      if (exampleSet.has(example.name)) return false;
      exampleSet.add(example.name);
      return true;
    })
    .map((example) => {
      const title = (example as any).title || example.name;
      const firstFile = example.files?.[0]?.path || "";
      const url = firstFile
        ? `${USER.social.github}/portfolio/blob/main/registry/default/${firstFile.replace("examples/", "example/")}`
        : USER.social.github;
      return `- [${title}](${url}): Example usage`;
    });

  const [bookmarks] = await Promise.all([getBookmarks()])

  return [
    `# ${USER.name}`,
    "",
    `> ${USER.description}`,
    "",
    `- [About](${USER.website}/me/about.md): A quick intro to me, my tech stack, and how to connect.`,
    `- [Experience](${USER.website}/me/experience.md): Highlights from my career and key roles I've taken on.`,
    `- [Craft](${USER.website}/me/craft.md): A collection of my work.`,
    `- [Bookmarks](${USER.website}/me/bookmarks.md): Bookmarks from my collections.`,
    "",
    "## Bookmarks",
    "",
    `${bookmarks ? bookmarks.map((bookmark) => `- [${bookmark.title}](https://${USER.domain}/bookmarks/${bookmark.slug})`).join("\n") : "No bookmarks available (API authentication required)"}`,
    "",
    "## Craft",
    "",
    `${await getAllPosts()
      .map(
        (post) =>
          `- [${post.metadata.title}](${post.metadata.href ? post.metadata.href : `https://${USER.domain}/craft/${post.slug}`})`
      )
      .join("\n")}`,
    "",
    "## Bookmarks",
    "",
    // `${(await getBookmarks()).map((bookmark) => `- [${bookmark.title}](${bookmark.link})`).join("\n")}`,
    "This file provides LLM-friendly entry points to documentation and examples.",
    "",
    "## Components",
    "",
    ...components,
    "",
    "## Examples",
    "",
    ...examplesList,
    "",
    "## Optional",
    "",
    `- [Repository](${USER.social.github}): Source code and issues`,
    `- [Sitemap](${USER.website}/sitemap.xml): Indexable pages`,
  ].join("\n");
}

async function generateLlmsFullContent(
  examplesByComponent: Map<string, string[]>
) {
  const components = registryComponents
    .filter((item) => item.type === "registry:component")
    .sort((a, b) => a.name.localeCompare(b.name));

  const componentContents = await Promise.all(
    components.map(async (component) => {
      const title = (component as any).title || component.name;
      const description =
        (component as any).description || `The ${title} component.`;

      let content = [
        `===== COMPONENT: ${component.name} =====`,
        `Title: ${title}`,
        `Description: ${description}`,
        "",
        await readRegistryFilesContents(component as unknown as RegistryItem),
      ].join("\n");

      // Add examples for this component
      const relatedExamples = examplesByComponent.get(component.name) || [];
      for (const exampleName of relatedExamples) {
        const example = examples.find((e) => e.name === exampleName);
        if (example) {
          const exTitle = (example as any).title || example.name;
          content += [
            "",
            "",
            `===== EXAMPLE: ${exampleName} =====`,
            `Title: ${exTitle}`,
            "",
            await readRegistryFilesContents(example as unknown as RegistryItem),
          ].join("\n");
        }
      }

      return content;
    })
  );

  return componentContents.join("\n\n\n");
}

export async function buildLlmsFiles() {
  const examplesByComponent = getComponentExamples();

  const [minContent, fullContent] = await Promise.all([
    generateLlmsContent(),
    generateLlmsFullContent(examplesByComponent),
  ]);

  const publicDir = path.join(process.cwd(), "public");
  await fs.mkdir(publicDir, { recursive: true });

  await Promise.all([
    fs.writeFile(path.join(publicDir, "llms.txt"), minContent, "utf8"),
    fs.writeFile(path.join(publicDir, "llms-full.txt"), fullContent, "utf8"),
  ]);
}

try {
  console.log("💽 Building LLMS files...");

  await buildLlmsFiles();

  console.log("✅ Done!");
} catch (error) {
  console.error(error);
  process.exit(1);
}
