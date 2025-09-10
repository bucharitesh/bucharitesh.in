'use client';

import { useMounted } from '@/lib/hooks';
import type { TableOfContents } from '@/lib/toc';
import { cn } from '@/lib/utils';
import { AlignLeftIcon, CornerUpLeft } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

interface TocProps {
  toc: TableOfContents;
}

export function TOC({ toc }: TocProps) {
  const mounted = useMounted();

  const refinedToc = useMemo(() => {
    if (!toc.items || toc.items.length === 0) {
      return toc;
    }

    const [linksInSteps, ...rest] = toc.items;

    if (linksInSteps.items && linksInSteps.items.length > 0) {
      return {
        items: [...linksInSteps.items, ...rest],
      };
    }

    return toc;
  }, [toc]);

  const itemIds = useMemo(
    () =>
      refinedToc.items
        ? refinedToc.items
            .flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
            .flat()
            .filter(Boolean)
            .map((id) => id?.split('#')[1])
        : [],
    [refinedToc]
  ) as string[];

  // Initialize activeId based on initial viewport position
  const initialActiveId = useMemo(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    return (
      itemIds.find((id) => {
        const element = document.getElementById(id);
        if (!element) {
          return false;
        }
        const rect = element.getBoundingClientRect();
        return rect.top <= window.innerHeight * 0.2;
      }) || itemIds[0]
    );
  }, [itemIds]);

  const [activeId, setActiveId] = useState(initialActiveId);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '0% 0% -80% 0%' }
    );

    for (const id of itemIds) {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => {
      for (const id of itemIds) {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      }
    };
  }, [itemIds, mounted]);

  if (!toc?.items) {
    return null;
  }

  return (
    <div className="space-y-14">
      <Link
        href="/craft"
        className="flex items-baseline gap-1.5 text-muted-foreground text-sm"
      >
        <CornerUpLeft className="size-3" />
        Crafts
      </Link>
      <div>
        <p className="-ml-0.5 flex items-center gap-1.5 text-gray-500 text-sm dark:text-gray-400">
          <AlignLeftIcon className="size-4" />
          On this page
        </p>
        <nav aria-label="Table of contents">
          <Tree tree={refinedToc} activeItem={activeId} />
        </nav>
      </div>
    </div>
  );
}

interface TreeProps {
  tree: TableOfContents;
  level?: number;
  activeItem?: string | null;
}

function Tree({ tree, level = 1, activeItem }: TreeProps) {
  if (!tree?.items?.length || level >= 3) {
    return null;
  }

  return (
    <ul
      className={cn(
        'mt-4 grid gap-4 border-gray-200 border-l-2 dark:border-gray-800',
        {
          'pl-4': level !== 1,
        }
      )}
    >
      {tree.items.map((item, index) => {
        const isActive = item.url === `#${activeItem}`;
        return (
          <li key={index} className="-ml-0.5 relative pl-4">
            <a
              href={item.url}
              // className={cn(
              //   "inline-block text-sm transition-colors duration-200",
              //   isActive
              //     ? "font-medium text-foreground"
              //     : "text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground",
              // )}
            >
              {item.title}
            </a>
            <div
              className="absolute top-0 left-0 h-full w-0.5 bg-black transition-all duration-200 ease-in-out dark:bg-white"
              style={
                {
                  // opacity: isActive ? 1 : 0,
                  // transform: `translateY(${isActive ? "0" : "-100%"})`,
                }
              }
            />
            {item.items?.length ? (
              <Tree tree={item} level={level + 1} activeItem={activeItem} />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

export default TOC;
