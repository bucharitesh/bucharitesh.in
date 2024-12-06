import { SnakeGame } from "@/components/game/snake-game";
import Info from "@/components/home/info";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex bg-grid justify-center items-center flex-col gap-8 h-screen">
      <p className="text-4xl font-bold">Oops!</p>
      <SnakeGame />
      <Info show={["time", "screen"]} />
      <Link href="/">
        <Button variant="outline">Go Home</Button>
      </Link>
    </div>
  );
}
