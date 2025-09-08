import { GameOfLife } from "@/registry/default/bucharitesh/game-of-life/game-of-life";

export default function SplitTextEffectDemo() {
  return (
    <div className="relative h-[500px] z-20 rounded-lg w-full bg-black overflow-hidden border">
      <GameOfLife
        size={10}
        interval={200}
        backgroundColor="#000000"
        cellColor="#1e1e1e"
      />
    </div>
  );
}
