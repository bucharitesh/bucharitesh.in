import { FloatingHeader } from '@/components/navigation/floating-header';
import { ScrollArea } from '@/components/ui/scroll-area';
import GuestbookEntries from '@/features/guestbook/guestbook-entries';
import Polaroid from '@/features/guestbook/polaroid';
import {
  NextWordmark,
  Sticker,
  VercelLogo,
} from '@/features/guestbook/stickers';
import WriteNoteCTA from '@/features/guestbook/write';
import { createOgImage } from '@/lib/createOgImage';
import { createMetadata } from '@/lib/seo/metadata';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next/types';
import styles from './notes.module.css';

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
      <div
        className={cn('h-screen w-screen bg-[#031e39]')}
        style={{
          backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
          backgroundPosition: '-2px -2px, -2px -2px, -1px -1px, -1px -1px',
        }}
      >
        <div
          id="mat-container"
          className={cn('relative h-full w-full overflow-hidden')}
        >
          <div className="z-10">
            <div id="mat-grid" className={styles.matGrid}>
              <div
                className={
                  'absolute inset-0 bg-position-center bg-size-[10vmin_10vmin]'
                }
                style={{
                  backgroundImage:
                    'linear-gradient(45deg,transparent 49.5%,rgba(255, 255, 255, 0.2) 49.5%,rgba(255, 255, 255, 0.2) 50.5%,transparent 50.5%),linear-gradient(-45deg,transparent 49.5%,rgba(255, 255, 255, 0.2) 49.5%,rgba(255, 255, 255, 0.2) 50.5%,transparent 50.5%)',
                }}
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
