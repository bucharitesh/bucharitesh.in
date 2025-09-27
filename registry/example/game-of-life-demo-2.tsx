import { GameOfLife } from '@/registry/bucharitesh/game-of-life';

export default function SplitTextEffectDemo() {
  return (
    <div className="relative z-20 h-[500px] w-full overflow-hidden rounded-lg border bg-black">
      <GameOfLife
        size={20}
        interval={500}
        backgroundColor="#000000"
        cellColor="#ff0000"
      />
    </div>
  );
}
