'use client';

import { Volume2Icon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useSound } from '@/lib/hooks/use-sound';

export function PronounceMyName({
  className,
  namePronunciationUrl,
}: {
  className?: string;
  namePronunciationUrl: string;
}) {
  const play = useSound(namePronunciationUrl);
  return (
    <button
      type="button"
      className={cn(
        'relative text-muted-foreground transition-all hover:text-foreground active:scale-[0.9]',
        'after:-inset-1 after:absolute',
        className
      )}
      onClick={() => play()}
    >
      <Volume2Icon className="size-4" />
      <span className="sr-only">Pronounce my name</span>
    </button>
  );
}
