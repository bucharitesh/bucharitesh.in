'use client';

import { CheckIcon, CircleXIcon, CopyIcon, Link2 } from 'lucide-react';
import { useOptimistic, useTransition } from 'react';

import { cn } from '@/lib/utils';

import { Button } from '@repo/design-system/components/ui/button';
import { TooltipWrapper } from '@repo/design-system/components/ui/tooltip';

export function CopyButton({
  value,
  className,
  ...props
}: {
  value: string;
  className?: string;
}) {
  const [state, setState] = useOptimistic<'idle' | 'copied' | 'failed'>('idle');
  const [, startTransition] = useTransition();

  return (
    <TooltipWrapper content="Copy link">
      <Button
        size="icon"
        variant="secondary"
        className={cn('z-10 size-6 rounded-md', className)}
        onClick={() => {
          startTransition(async () => {
            try {
              await navigator.clipboard.writeText(value);
              setState('copied');
            } catch {
              setState('failed');
            }
            await new Promise((resolve) => setTimeout(resolve, 2000));
          });
        }}
        {...props}
      >
        {state === 'idle' ? (
          <CopyIcon className="size-3" />
        ) : state === 'copied' ? (
          <CheckIcon className="size-3" />
        ) : state === 'failed' ? (
          <CircleXIcon className="size-3" />
        ) : null}
        <span className="sr-only">Copy</span>
      </Button>
    </TooltipWrapper>
  );
}

export function CopyLink({
  value,
  className,
  ...props
}: {
  value: string;
  className?: string;
}) {
  const [state, setState] = useOptimistic<'idle' | 'copied' | 'failed'>('idle');
  const [, startTransition] = useTransition();

  return (
    <TooltipWrapper content="Copy link">
      <Button
        size="icon"
        variant="outline"
        className={cn('z-10 size-8 rounded-full px-2 py-1', className)}
        onClick={() => {
          startTransition(async () => {
            try {
              await navigator.clipboard.writeText(value);
              setState('copied');
            } catch {
              setState('failed');
            }
            await new Promise((resolve) => setTimeout(resolve, 2000));
          });
        }}
        {...props}
      >
        {state === 'idle' ? (
          <Link2 className="size-4" />
        ) : state === 'copied' ? (
          <CheckIcon className="size-4" />
        ) : state === 'failed' ? (
          <CircleXIcon className="size-4" />
        ) : null}
        <span className="sr-only">Copy</span>
      </Button>
    </TooltipWrapper>
  );
}
