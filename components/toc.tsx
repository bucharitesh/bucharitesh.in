'use client';

import { cn } from '@/lib/utils';
import type { TOCItemType } from 'fumadocs-core/server';
import * as Primitive from 'fumadocs-core/toc';
import {
  type ComponentProps,
  Ref,
  createContext,
  useContext,
  useRef,
} from 'react';
import { TocThumb } from './toc-thumb';

const TOCContext = createContext<TOCItemType[]>([]);

export function useTOCItems(): TOCItemType[] {
  return useContext(TOCContext);
}

export function TOCProvider({
  toc,
  children,
  ...props
}: ComponentProps<typeof Primitive.AnchorProvider>) {
  return (
    <TOCContext value={toc}>
      <Primitive.AnchorProvider toc={toc} {...props}>
        {children}
      </Primitive.AnchorProvider>
    </TOCContext>
  );
}

export function TOCScrollArea({ className, ...props }: ComponentProps<'div'>) {
  const viewRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={viewRef}
      className={cn(
        'relative ms-px min-h-0 overflow-auto py-3 text-sm mask-[linear-gradient(to_bottom,transparent,white_16px,white_calc(100%-16px),transparent)] [scrollbar-width:none]',
        className
      )}
      {...props}
    >
      <Primitive.ScrollProvider containerRef={viewRef}>
        {props.children}
      </Primitive.ScrollProvider>
    </div>
  );
}

export function TOCItems({ className, ...props }: ComponentProps<'div'>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const items = useTOCItems();

  if (items.length === 0)
    return (
      <div className="rounded-lg border bg-card p-3 text-muted-foreground text-xs">
        No Headings
      </div>
    );

  return (
    <>
      <TocThumb
        containerRef={containerRef}
        className="absolute top-(--top) h-(--height) w-px bg-primary transition-all"
      />
      <div
        ref={containerRef}
        className={cn('flex flex-col border-foreground/10 border-s', className)}
        {...props}
      >
        {items.map((item) => (
          <TOCItem key={item.url} item={item} />
        ))}
      </div>
    </>
  );
}

export function TOCItem({ item }: { item: TOCItemType }) {
  return (
    <Primitive.TOCItem
      href={item.url}
      className={cn(
        'prose py-1.5 text-muted-foreground text-sm transition-colors wrap-anywhere first:pt-0 last:pb-0 data-[active=true]:text-primary',
        item.depth <= 2 && 'ps-3',
        item.depth === 3 && 'ps-6',
        item.depth >= 4 && 'ps-8'
      )}
    >
      {item.title}
    </Primitive.TOCItem>
  );
}
