import { notFound } from 'next/navigation';

import { getAllCrafts } from '@/features/craft/data/posts';
import { getLLMText } from '@/features/craft/lib/get-llm-text';

export async function generateStaticParams() {
  const posts = getAllCrafts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const allPosts = getAllCrafts();
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
