import { NextResponse } from "next/server";
import { type Registry } from "shadcn/schema";

import { examples } from "../../../registry/registry-examples";
import { components as registryComponents } from "../../../registry/registry-components";
import { USER } from "../../../config/user";
import { getAllPosts } from "../../../features/craft/data/posts";
import { getBookmarks } from "../../../features/bookmarks/lib/raindrop";

type RegistryItem = Registry["items"][number];

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

  let bookmarks: any[] = [];
  try {
    bookmarks = await getBookmarks();
  } catch (error) {
    console.warn("Could not fetch bookmarks:", error);
  }

  const posts = await getAllPosts();

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
    `${bookmarks && bookmarks.length > 0 ? bookmarks.map((bookmark) => `- [${bookmark.title}](https://${USER.domain}/bookmarks/${bookmark.slug})`).join("\n") : "No bookmarks available (API authentication required)"}`,
    "",
    "## Craft",
    "",
    `${posts
      .map(
        (post) =>
          `- [${post.metadata.title}](${post.metadata.href ? post.metadata.href : `https://${USER.domain}/craft/${post.slug}`})`
      )
      .join("\n")}`,
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

export async function GET() {
  try {
    const content = await generateLlmsContent();
    
    return new NextResponse(content, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error generating LLMS content:', error);
    return new NextResponse('Internal Server Error', { 
      status: 500,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }
}
