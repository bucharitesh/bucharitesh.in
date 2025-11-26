import { MasonryGrid } from '@/components/masonary-grid';
import { FloatingHeader } from '@/components/navigation/floating-header';
import { ScrollArea } from '@/components/scroll-area';
import { getAllPosts } from '@/features/craft/data/posts';
import { createOgImage } from '@/lib/createOgImage';
import { Blog, JsonLd, WithContext } from '@/lib/seo/json-ld';
import { createMetadata } from '@/lib/seo/metadata';
import type { Metadata } from 'next';
import { Card } from './page-client';

// Force static generation at build time
export const dynamic = 'force-static';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Craft';
  const description = "A collection of craft that I've written.";

  const image = createOgImage({
    title: title,
    meta: description,
  });

  return createMetadata({
    title: title,
    description: description,
    image: image,
  });
}

export default async function Page() {
  const allCrafts = await getAllPosts();

  const jsonLd: WithContext<Blog> = {
    '@type': 'Blog',
    '@context': 'https://schema.org',
  };

  return (
    <>
      <JsonLd code={jsonLd} />
      <ScrollArea useScrollAreaId className="bg-grid">
        <FloatingHeader scrollTitle="Craft" />
        <MasonryGrid
          breakpoints={{
            sm: 1,
            lg: 2,
            xl: 3,
          }}
        >
          {allCrafts.map((item, index) => (
            <Card
              key={`${item.metadata.title}-${index}`}
              title={item.metadata.title}
              date={new Date(item.metadata.date).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
              href={
                item.metadata.href ? item.metadata.href : `/craft/${item.slug}`
              }
              src={
                item.metadata.video ? item.metadata.video : item.metadata.image
              }
              type={item.metadata.video ? 'video' : 'image'}
              blurImage={item.metadata.blurImage}
              craft_type={item.metadata.type}
              theme={item.metadata.theme}
              aspectRatio={item.metadata.aspect_ratio}
            />
          ))}
        </MasonryGrid>
      </ScrollArea>
    </>
  );
}
