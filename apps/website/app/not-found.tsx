import { SnakeGame } from '@/features/game/snake-game';
import Info from '@/features/home/components/info';
import { GameOfLife } from '@/registry/bucharitesh/game-of-life';
import { Button } from '@repo/design-system/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8">
      <GameOfLife
        size={20}
        interval={200}
        backgroundColor="#000000"
        cellColor="#1e1e1e"
      />
      <p className="font-bold text-4xl">Oops!</p>
      <SnakeGame />
      <Info show={['time', 'screen', 'llms']} />
      <Link href="/">
        <Button variant="outline">Go Home</Button>
      </Link>
    </div>
  );
}
