import { SplitTextEffect } from '@/registry/bucharitesh/split-text-effect';

export default function SplitTextEffectDemo() {
  return (
    <div className="relative w-full bg-black">
      <div className="h-72">
        <SplitTextEffect
          text={
            <>
              Security that <br /> scales with you.
            </>
          }
          fill={0.45}
          accent="#006efe"
        />
      </div>
    </div>
  );
}
