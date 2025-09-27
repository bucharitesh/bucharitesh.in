import { SplitTextEffect } from '@/registry/bucharitesh/split-text-effect';

export default function SplitTextEffectDemo() {
  return (
    <div className="relative w-full bg-black">
      <div className="h-96">
        <SplitTextEffect
          text={
            <>
              MAKE AN
              <br />
              IMPACT
            </>
          }
          accent="#ed8936"
          className="font-black tracking-tight"
        />
      </div>
    </div>
  );
}
