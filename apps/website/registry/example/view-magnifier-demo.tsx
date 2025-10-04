'use client';
import ViewMagnifier from '@/registry/bucharitesh/view-magnifier';
import Image from 'next/image';

export default function ViewMagnifierDemo() {
  return (
    <div className="relative w-full">
      <ViewMagnifier>
        <div className="h-96 w-full bg-red-500">
          <Image src="/assets/test-image.avif" alt="random" fill />
        </div>
      </ViewMagnifier>
    </div>
  );
}
