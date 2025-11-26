import { USER } from '@/config/user';
import { getAllPosts } from '@/features/craft/data/posts';

const content = `# Craft

${(await getAllPosts())
  .map(
    (post) =>
      `- [${post.metadata.title}](${post.metadata.href ? post.metadata.href : `https://${USER.domain}/craft/${post.slug}`})`
  )
  .join('\n')}
`;

export const dynamic = 'force-static';

export async function GET() {
  return new Response(content, {
    headers: {
      'Content-Type': 'text/markdown;charset=utf-8',
    },
  });
}
