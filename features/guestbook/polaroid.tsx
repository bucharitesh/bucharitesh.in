'use client';

import styles from '@/app/guestbook/notes.module.css';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Drag from './drag';

const Polaroid = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <Drag
      className={cn(
        'rounded-[8px] bg-gray-300 p-1 pb-6 transition-all duration-300 ease-out hover:shadow-md',
        styles.polaroid
      )}
    >
      <div className="relative h-full overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 20vw, 35vw"
          className="h-fit max-w-full object-contain"
          draggable={false}
          quality={5}
        />
      </div>
    </Drag>
  );
};

export default Polaroid;
