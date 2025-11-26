import { USER } from '@/config/user';
import { getAllPosts } from '@/features/craft/data/posts';
import RSS from 'rss';

// Force static generation at build time
export const dynamic = 'force-static';

export async function GET() {
  const allPosts = await getAllPosts();

  const feed = new RSS({
    title: USER.name,
    description: USER.tagline,
    generator: 'RSS for Node and Next.js',
    feed_url: `https://${USER.domain}/craft/feed.xml`,
    site_url: `https://${USER.domain}`,
    managingEditor: `${USER.email} (${USER.name})`,
    webMaster: `${USER.email} (${USER.name})`,
    copyright: `Copyright ${new Date().getFullYear().toString()}, Ritesh Bucha`,
    language: 'en-US',
    pubDate: new Date().toUTCString(),
    ttl: 60,
  });

  allPosts.map((post) => {
    feed.item({
      title: post.metadata.title,
      description: post.metadata.description,
      url: `https://www.bucharitesh.in/craft/${post.slug}`,
      author: 'Ritesh Bucha',
      date: new Date(post.metadata.date),
    });
  });
  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
