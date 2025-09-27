import { GameOfLife } from '@/registry/bucharitesh/game-of-life';

export default function SplitTextEffectDemo() {
  return (
    <div className="relative z-20 h-[500px] w-full overflow-hidden rounded-lg border bg-black">
      <GameOfLife
        size={10}
        interval={200}
        backgroundColor="#000000"
        cellColor="#1e1e1e"
      />
    </div>
  );
}
