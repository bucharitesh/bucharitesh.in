"use client";

import { Volume2Icon } from "lucide-react";

import soundManager from "@/lib/sound-manager";
import { cn } from "@/lib/utils";

export function PronounceMyName({
  className,
  namePronunciationUrl,
}: {
  className?: string;
  namePronunciationUrl: string;
}) {
  return (
    <button
      className={cn(
        "relative text-muted-foreground transition-all hover:text-foreground active:scale-[0.9]",
        "after:absolute after:-inset-1",
        className
      )}
      onClick={() => soundManager.playAudio(namePronunciationUrl)}
    >
      <Volume2Icon className="size-4" />
      <span className="sr-only">Pronounce my name</span>
    </button>
  );
}