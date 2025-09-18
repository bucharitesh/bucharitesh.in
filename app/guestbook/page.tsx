import { FloatingHeader } from '@/components/navigation/floating-header';
import { ScrollArea } from '@/components/ui/scroll-area';
import GuestbookEntries from '@/features/guestbook/components/guestbook-entries';
import Polaroid from '@/features/guestbook/components/polaroid';
import {
  NextWordmark,
  Sticker,
  VercelLogo,
} from '@/features/guestbook/components/stickers';
import WriteNoteCTA from '@/features/guestbook/components/write';
import { createOgImage } from '@/lib/createOgImage';
import { createMetadata } from '@/lib/seo/metadata';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next/types';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Guestbook';
  const description =
    "Write anything for future visitors of this website. I'd love a random joke though.";

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

export const dynamic = 'force-dynamic';

export default function GuestbookPage() {
  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader title="Guestbook" />
      <div className={cn('z-0 h-screen w-screen bg-grid')}>
        <div className={cn('relative h-full w-full overflow-hidden')}>
          <div className="z-10">
            <div
              className={cn(
                'absolute inset-0 border-1 border-black/10 border-inset bg-position-center bg-size-[2vmin_2vmin] after:absolute after:inset-0 after:bg-size-[30vmin_30vmin] after:content-[""] md:bg-size-[10vmin_10vmin]',
                'bg-[linear-gradient(to_right,var(--color-border)_1px,_transparent_1px),linear-gradient(to_bottom,_var(--color-border)_1px,_transparent_1px)]'
              )}
            >
              <div
                className={
                  'absolute inset-0 bg-[linear-gradient(45deg,transparent_49.5%,var(--color-border)_49.5%,var(--color-border)_50.5%,transparent_50.5%),linear-gradient(-45deg,transparent_49.5%,var(--color-border)_49.5%,var(--color-border)_50.5%,transparent_50.5%)] bg-position-center bg-size-[10vmin_10vmin]'
                }
              />
            </div>
          </div>
          <main className="relative z-20 h-full w-full overflow-hidden">
            <GuestbookEntries />
            <Polaroid
              src="https://cdn.bucharitesh.in/guestbook/photo_1.jpeg"
              alt="kedarkantha"
            />
            <Polaroid
              src="https://cdn.bucharitesh.in/guestbook/photo_2.jpg"
              alt="graduation"
            />
            <Sticker>
              <VercelLogo />
            </Sticker>
            <Sticker>
              <NextWordmark />
            </Sticker>
            <WriteNoteCTA />
          </main>
        </div>
      </div>
    </ScrollArea>
  );
}
