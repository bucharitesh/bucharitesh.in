import { MasonryGrid } from '@/components/masonary-grid';
import { FloatingHeader } from '@/components/navigation/floating-header';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getAllPosts } from '@/features/craft/data/posts';
import type { Metadata } from 'next';
import { Card } from './page-client';

export const metadata: Metadata = {
  title: 'Craft',
  description: "A collection of craft that I've written.",
  alternates: {
    canonical: '/craft',
  },
};

export default async function Page() {
  const allCrafts = await getAllPosts();

  return (
    <ScrollArea useScrollAreaId>
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
  );
}
