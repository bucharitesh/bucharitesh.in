import { SnakeGame } from "@/components/game/snake-game";
import Info from "@/components/home/info";
import { Button } from "@/components/ui/button";
import { GameOfLife } from "@/registry/default/bucharitesh/game-of-life/game-of-life";
import { Link } from "next-view-transitions";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center flex-col gap-8 h-screen">
      <GameOfLife
        size={20}
        interval={200}
        backgroundColor="#000000"
        cellColor="#1e1e1e"
      />
      <p className="text-4xl font-bold">Oops!</p>
      <SnakeGame />
      <Info show={["time", "screen", "llms"]} />
      <Link href="/">
        <Button variant="outline">Go Home</Button>
      </Link>
    </div>
  );
}
