import { FloatingHeader } from '@/components/navigation/floating-header';
import { ScrollArea } from '@/components/ui/scroll-area';
import { createOgImage } from '@/lib/createOgImage';
import { createMetadata } from '@/lib/seo/metadata';
import type { Metadata } from 'next/types';
import CalEmbed from './cal-embed';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Book a Meeting';
  const description =
    'Schedule a meeting with me to discuss anything from design to engineering to business to anything else.';

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

export default function BookingPage() {
  return (
    <ScrollArea useScrollAreaId className="h-full">
      <FloatingHeader title="Book a Meeting" />
      <div className="flex h-full select-none items-center justify-center space-y-12 p-0 content-wrapper md:min-h-dvh lg:px-8 lg:pt-12 lg:pb-20">
        <div className="z-10 mx-auto flex h-full w-full items-center justify-center">
          <CalEmbed />
        </div>
      </div>
    </ScrollArea>
  );
}
