import { promises as fs } from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';
import type { Registry } from 'shadcn/schema';

import { USER } from '@/config/user';
import { getAllPosts } from '@/features/craft/data/posts';
import { examples } from '@/registry/registry-examples';
import { ui as registryUI } from '@/registry/registry-ui';

export const cache = "force-cache";

type RegistryItem = Registry['items'][number];
type FileEntry = string | { path: string; type?: string; target?: string };

async function readRegistryFilesContents(item: RegistryItem): Promise<string> {
  if (!item.files?.length) {
    return '';
  }

  const paths = item.files
    .map((f: FileEntry) => (typeof f === 'string' ? f : f?.path))
    .filter(Boolean)
    .sort() as string[];

  // Read all files in parallel
  const contents = await Promise.all(
    paths.map(async (filePath) => {
      try {
        // Check if it's a component or example path and resolve correctly
        let fullPath: string;
        if (filePath.startsWith('examples/')) {
          fullPath = path.join(
            process.cwd(),
            'registry/default/example',
            filePath.replace('examples/', '')
          );
        } else {
          fullPath = path.join(
            process.cwd(),
            'registry/default/bucharitesh',
            filePath
          );
        }

        const content = await fs.readFile(fullPath, 'utf8');
        return `--- file: ${filePath} ---\n${content.endsWith('\n') ? content : `${content}\n`}`;
      } catch (error) {
        console.warn(
          `Warning: Could not read file ${filePath}:`,
          error instanceof Error ? error.message : 'Unknown error'
        );
        return null; // Skip missing files
      }
    })
  );

  // Join non-null contents with blank lines between them
  return contents.filter(Boolean).join('\n');
}

function getComponentExamples() {
  const examplesByComponent = new Map<string, string[]>();

  for (const example of examples) {
    if (example.registryDependencies) {
      for (const dep of example.registryDependencies) {
        const componentName = dep.split('/').pop();
        if (componentName) {
          if (!examplesByComponent.has(componentName)) {
            examplesByComponent.set(componentName, []);
          }
          examplesByComponent.get(componentName)?.push(example.name);
        }
      }
    }
  }

  return examplesByComponent;
}

function generateUserSection() {
  return [
    '===== USER INFORMATION =====',
    `Name: ${USER.name}`,
    `Email: ${USER.email}`,
    `Location: ${USER.location}`,
    `Job Title: ${USER.jobTitle}`,
    `Website: ${USER.website}`,
    `Description: ${USER.description}`,
    `Tagline: ${USER.tagline}`,
    '',
    'Social Links:',
    `- GitHub: ${USER.social.github}`,
    `- LinkedIn: ${USER.social.linkedin}`,
    `- Twitter: ${USER.social.twitter}`,
    `- Bluesky: ${USER.social.bluesky}`,
    '',
  ].join('\n');
}

async function generateCraftPostsSection() {
  const posts = await getAllPosts();

  const content = ['===== CRAFT POSTS =====', ''];

  for (const post of posts) {
    content.push(
      `**${post.metadata.title}**`,
      `Slug: ${post.slug}`,
      `Date: ${post.metadata.date}`,
      `Description: ${post.metadata.description}`,
      `Published: ${post.metadata.published}`,
      `Type: ${post.metadata.type}`,
      `Theme: ${post.metadata.theme}`,
      `Image: ${post.metadata.image}`,
      `Video: ${post.metadata.video}`,
      `Aspect Ratio: ${post.metadata.aspect_ratio}`,
      `External Link: ${post.metadata.href || 'None'}`,
      '',
      '--- Content ---',
      post.content,
      '',
      ''
    );
  }

  return content.join('\n');
}

async function generateLlmsFullContent(
  examplesByComponent: Map<string, string[]>
) {
  const sections: string[] = [];

  // User information section
  sections.push(await generateUserSection());

  // Craft posts section
  sections.push(await generateCraftPostsSection());

  // Components section
  const components = registryUI
    .filter((item) => item.type === 'registry:ui')
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
        '',
        await readRegistryFilesContents(component as unknown as RegistryItem),
      ].join('\n');

      // Add examples for this component
      const relatedExamples = examplesByComponent.get(component.name) || [];
      for (const exampleName of relatedExamples) {
        const example = examples.find((e) => e.name === exampleName);
        if (example) {
          const exTitle = (example as any).title || example.name;
          content += [
            '',
            '',
            `===== EXAMPLE: ${exampleName} =====`,
            `Title: ${exTitle}`,
            '',
            await readRegistryFilesContents(example as unknown as RegistryItem),
          ].join('\n');
        }
      }

      return content;
    })
  );

  sections.push(componentContents.join('\n\n\n'));

  return sections.join('\n\n\n');
}

export async function GET() {
  try {
    const examplesByComponent = getComponentExamples();
    const content = await generateLlmsFullContent(examplesByComponent);

    return new NextResponse(content, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error generating LLMS full content:', error);
    return new NextResponse('Internal Server Error', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }
}
