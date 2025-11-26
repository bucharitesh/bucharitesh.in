import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

import type { Post, PostMetadata } from '@/features/craft/types/post';
import { generateBlurUrl } from '@/lib/media';

function parseFrontmatter(fileContent: string) {
  const file = matter(fileContent);

  return {
    metadata: file.data as PostMetadata,
    content: file.content,
  };
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  return parseFrontmatter(rawContent);
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);

  return mdxFiles.map<Post>((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));

    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export async function getAllPosts() {
  let posts = getMDXData(
    path.join(process.cwd(), 'features/craft/content')
  ).sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  );

  // Properly await blur image generation for all posts
  await Promise.all(
    posts.map(async (post) => {
      post.metadata.blurImage = await generateBlurUrl(post.metadata.image);
    })
  );

  posts = posts.filter((post) => post.metadata.published);

  return posts;
}

export async function getAllCrafts() {
  let posts = await getAllPosts();

  posts = posts.filter(
    (post) => post.metadata.published && post.metadata.type === 'component'
  );

  return posts;
}

export async function getCraftBySlug(slug: string) {
  const crafts = await getAllCrafts();
  return crafts.find((post) => post.slug === slug);
}

export function findNeighbour(posts: Post[], slug: string) {
  const len = posts.length;

  for (let i = 0; i < len; ++i) {
    if (posts[i].slug === slug) {
      const previous =
        i > 0
          ? {
              href: posts[i - 1].slug,
              title: posts[i - 1].metadata.title,
            }
          : null;
      const next =
        i < len - 1
          ? {
              href: posts[i + 1].slug,
              title: posts[i + 1].metadata.title,
            }
          : null;

      return {
        previous,
        next,
      };
    }
  }

  return { previous: null, next: null };
}
