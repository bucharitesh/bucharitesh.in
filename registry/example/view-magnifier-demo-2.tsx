'use client';
import ViewMagnifier from '@/registry/bucharitesh/view-magnifier';
import Image from 'next/image';
export default function ViewMagnifierDemo() {
  return (
    <div className="relative grid w-full grid-cols-1 gap-20">
      <ViewMagnifier>
        <div className="relative h-[400px] w-full">
          <Image
            src="https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80&w=828&q=75"
            alt="random"
            fill
            className="object-cover"
          />
        </div>
      </ViewMagnifier>
    </div>
  );
}
