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
import { cn } from '@/lib/utils';
import { Provider } from 'jotai';
import type { Metadata } from 'next/types';
import styles from './notes.module.css';

export const metadata: Metadata = {
  title: 'Guestbook',
  description:
    "Write anything for future visitors of this website. I'd love a random joke though.",
  alternates: {
    canonical: '/guestbook',
  },
};

export const dynamic = 'force-dynamic';

// export default async function GuestbookPage() {
//   return (
//     <div className="h-screen w-screen" style={{
//       "backgroundColor": "#06c",
//       "backgroundImage": "linear-gradient(rgba(255,255,255,0.2) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.2) 2px, transparent 1px), linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
//       "backgroundSize": "100px 100px, 100px 100px, 20px 20px, 20px 20px",
//       "backgroundPosition": "-2px -2px, -2px -2px, -1px -1px, -1px -1px",
//     }}>
//       hello
//     </div>
//   );
// }

export default function GuestbookPage() {
  return (
    <Provider>
      <ScrollArea useScrollAreaId>
        <FloatingHeader title="Guestbook" />
        <div
          className={cn('h-screen w-screen bg-gray-1')}
          style={{
            backgroundColor: '#06c',
            // "backgroundImage": "linear-gradient(rgba(255,255,255,0.2) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.2) 2px, transparent 1px), linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
            backgroundPosition: '-2px -2px, -2px -2px, -1px -1px, -1px -1px',
          }}
        >
          <div
            id="mat-container"
            className={cn(
              'relative h-full w-full overflow-hidden'
              // styles.matContainer
            )}
          >
            <div className="z-10">
              <div id="mat-texture" className={styles.matTexture} />
              <div aria-hidden className={styles.window} />
              <div id="mat-grid" className={styles.matGrid}>
                <div id="diagonal-lines" className={styles.diagonalLines} />
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
    </Provider>
  );
}
