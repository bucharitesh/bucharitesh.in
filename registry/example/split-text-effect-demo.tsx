import { SplitTextEffect } from '@/registry/bucharitesh/split-text-effect';

export default function SplitTextEffectDemo() {
  return (
    <div className="relative w-full bg-black">
      <div className="h-72">
        <SplitTextEffect text="Grow Together" fill={0.5} accent="#2ecc71" />
      </div>
    </div>
  );
}
