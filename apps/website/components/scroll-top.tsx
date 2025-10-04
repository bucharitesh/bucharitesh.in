'use client';

import { ArrowUpIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@repo/design-system/components/ui/button';
import { SCROLL_AREA_ID } from '@/config/site';
import { cn } from '@/lib/utils';

export function ScrollTop({
  className,
  ...props
}: React.ComponentProps<'button'>) {
  const [visible, setVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      // Try to get the scroll area element first, fallback to window
      const scrollAreaElem = document.querySelector(`#${SCROLL_AREA_ID}`);
      const scrollTop = scrollAreaElem?.scrollTop ?? window.scrollY;

      setVisible(scrollTop >= 400);

      const diff = scrollTop - lastScrollTop;
      setScrollDirection(diff > 0 ? 'down' : 'up');
      lastScrollTop = scrollTop;
    };

    // Add event listeners to both scroll area and window
    const scrollAreaElem = document.querySelector(`#${SCROLL_AREA_ID}`);

    if (scrollAreaElem) {
      scrollAreaElem.addEventListener('scroll', handleScroll, {
        passive: true,
      });
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (scrollAreaElem) {
        scrollAreaElem.removeEventListener('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <Button
      data-visible={visible}
      data-scroll-direction={scrollDirection}
      className={cn(
        'z-100 [--bottom:1rem] lg:[--bottom:2rem]',
        'fixed right-4 bottom-[calc(var(--bottom,1rem)+env(safe-area-inset-bottom,0px))] rounded-full transition-all duration-300 lg:right-8',
        'duration-300 data-[scroll-direction=down]:opacity-80 data-[scroll-direction=up]:opacity-100 data-[visible=false]:opacity-0',
        className
      )}
      variant="secondary"
      size={'icon'}
      onClick={() => {
        const scrollAreaElem = document.querySelector(`#${SCROLL_AREA_ID}`);
        if (scrollAreaElem) {
          scrollAreaElem.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }}
      {...props}
    >
      <ArrowUpIcon className="size-5" />
      <span className="sr-only">Scroll to top</span>
    </Button>
  );
}
