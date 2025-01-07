import { GameOfLife } from "@/components/bucharitesh/game-of-life";

export default function SplitTextEffectDemo() {
  return (
    <div className="w-full relative h-[500px] z-20 rounded-lg bg-black overflow-hidden border">
      <GameOfLife
        size={20}
        interval={500}
        backgroundColor="#000000"
        cellColor="#ff0000"
      />
    </div>
  );
}
