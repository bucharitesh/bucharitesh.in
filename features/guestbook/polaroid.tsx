'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import Drag from './drag';

const Polaroid = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <Drag
      className={cn(
        'h-40 w-32 rounded-[8px] bg-gray-300 p-1 pb-6 transition-all duration-300 ease-out hover:shadow-md'
      )}
      style={{
        boxShadow:
          '0 4px 8px rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.2), 0 16px 32px rgba(0, 0, 0, 0.2)',
      }}
    >
      <div className="relative h-full overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 20vw, 35vw"
          className="h-full w-full rounded-[4px] object-cover object-top"
          draggable={false}
          quality={5}
        />
      </div>
    </Drag>
  );
};

export default Polaroid;
