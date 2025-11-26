import { notFound } from 'next/navigation';

import { getAllCrafts } from '@/features/craft/data/posts';
import { getLLMText } from '@/features/craft/lib/get-llm-text';

// Force static generation at build time
export const dynamic = 'force-static';
// Only generate pages for slugs returned by generateStaticParams
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllCrafts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const allPosts = await getAllCrafts();
  const post = allPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return new Response(await getLLMText(post), {
    headers: {
      'Content-Type': 'text/markdown;charset=utf-8',
    },
  });
}
