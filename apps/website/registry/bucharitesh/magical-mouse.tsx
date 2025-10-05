'use client';

import { cn } from '@/lib/utils';
import { Sparkle } from 'lucide-react';
import * as React from 'react';
import { createRoot } from 'react-dom/client';

interface Point {
  x: number;
  y: number;
}

interface MouseSparklesProps {
  /**
   * Custom icon component to render instead of the default Sparkle
   * @default Sparkle from lucide-react
   */
  icon?: React.ReactNode;
  /**
   * Duration of the star animation in milliseconds
   * @default 1500
   */
  starAnimationDuration?: number;
  /**
   * Minimum time between star spawns in milliseconds
   * @default 250
   */
  minimumTimeBetweenStars?: number;
  /**
   * Minimum distance between star spawns in pixels
   * @default 75
   */
  minimumDistanceBetweenStars?: number;
  /**
   * Duration of the glow effect in milliseconds
   * @default 75
   */
  glowDuration?: number;
  /**
   * Maximum spacing between glow points in pixels
   * @default 10
   */
  maximumGlowPointSpacing?: number;
  /**
   * Colors for the stars in RGB format
   * @default ["249 146 253", "252 254 255"]
   */
  colors?: string[];
  /**
   * Sizes for the stars
   * @default ["1.4rem", "1rem", "0.6rem"]
   */
  sizes?: string[];
  /**
   * Custom class name
   */
  className?: string;
}

const MouseSparkles = React.forwardRef<HTMLDivElement, MouseSparklesProps>(
  (
    {
      icon: Icon = <Sparkle className="h-full w-full" />,
      starAnimationDuration = 1500,
      minimumTimeBetweenStars = 250,
      minimumDistanceBetweenStars = 75,
      glowDuration = 75,
      maximumGlowPointSpacing = 10,
      colors = ['249 146 253', '252 254 255'],
      sizes = ['1.4rem', '1rem', '0.6rem'],
      className,
      ...props
    },
    ref
  ) => {
    const configRef = React.useRef({
      starAnimationDuration,
      minimumTimeBetweenStars,
      minimumDistanceBetweenStars,
      glowDuration,
      maximumGlowPointSpacing,
      colors,
      sizes,
      animations: ['fall-1', 'fall-2', 'fall-3'],
    });

    const lastRef = React.useRef({
      starTimestamp: Date.now(),
      starPosition: { x: 0, y: 0 },
      mousePosition: { x: 0, y: 0 },
    });

    let count = 0;

    const createStar = React.useCallback(
      (position: Point) => {
        const wrapper = document.createElement('div');
        const color = selectRandom(configRef.current.colors);
        const size = selectRandom(configRef.current.sizes);

        wrapper.className = cn(
          'absolute z-[10000] pointer-events-none',
          className
        );
        wrapper.style.left = `${position.x}px`;
        wrapper.style.top = `${position.y}px`;
        wrapper.style.fontSize = size;
        wrapper.style.color = `rgb(${color})`;
        wrapper.style.textShadow = `0px 0px 1.5rem rgb(${color} / 0.5)`;
        wrapper.style.animationName = configRef.current.animations[count++ % 3];
        wrapper.style.animationDuration = `${configRef.current.starAnimationDuration}ms`;
        wrapper.style.animationFillMode = 'forwards';

        document.body.appendChild(wrapper);

        const root = createRoot(wrapper);
        root.render(Icon);

        setTimeout(() => {
          root.unmount();
          document.body.removeChild(wrapper);
        }, configRef.current.starAnimationDuration);
      },
      [Icon, className]
    );

    const createGlowPoint = React.useCallback(
      (position: Point) => {
        const glow = document.createElement('div');
        glow.className = cn('absolute z-[9999] pointer-events-none', className);
        glow.style.left = `${position.x}px`;
        glow.style.top = `${position.y}px`;
        glow.style.boxShadow = '0rem 0rem 1.2rem 0.6rem rgb(239 42 201)';

        document.body.appendChild(glow);
        setTimeout(
          () => document.body.removeChild(glow),
          configRef.current.glowDuration
        );
      },
      [className]
    );

    const createGlow = React.useCallback(
      (last: Point, current: Point) => {
        const distance = calcDistance(last, current);
        const quantity = Math.max(
          Math.floor(distance / configRef.current.maximumGlowPointSpacing),
          1
        );

        const dx = (current.x - last.x) / quantity;
        const dy = (current.y - last.y) / quantity;

        Array.from({ length: quantity }).forEach((_, index) => {
          const x = last.x + dx * index;
          const y = last.y + dy * index;
          createGlowPoint({ x, y });
        });
      },
      [createGlowPoint]
    );

    const handleOnMove = React.useCallback(
      (e: { clientX: number; clientY: number }) => {
        const mousePosition = { x: e.clientX, y: e.clientY };

        if (
          lastRef.current.mousePosition.x === 0 &&
          lastRef.current.mousePosition.y === 0
        ) {
          lastRef.current.mousePosition = mousePosition;
        }

        const now = Date.now();
        const hasMovedFarEnough =
          calcDistance(lastRef.current.starPosition, mousePosition) >=
          configRef.current.minimumDistanceBetweenStars;
        const hasBeenLongEnough =
          now - lastRef.current.starTimestamp >
          configRef.current.minimumTimeBetweenStars;

        if (hasMovedFarEnough || hasBeenLongEnough) {
          createStar(mousePosition);
          lastRef.current.starTimestamp = now;
          lastRef.current.starPosition = mousePosition;
        }

        createGlow(lastRef.current.mousePosition, mousePosition);
        lastRef.current.mousePosition = mousePosition;
      },
      [createStar, createGlow]
    );

    React.useEffect(() => {
      window.addEventListener('mousemove', handleOnMove);
      window.addEventListener('touchmove', (e) => handleOnMove(e.touches[0]));
      document.body.addEventListener('mouseleave', () => {
        lastRef.current.mousePosition = { x: 0, y: 0 };
      });

      return () => {
        window.removeEventListener('mousemove', handleOnMove);
        window.removeEventListener('touchmove', (e) =>
          handleOnMove(e.touches[0])
        );
        document.body.removeEventListener('mouseleave', () => {
          lastRef.current.mousePosition = { x: 0, y: 0 };
        });
      };
    }, [handleOnMove]);

    return null;
  }
);

export function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function selectRandom<T>(items: T[]): T {
  return items[rand(0, items.length - 1)];
}

export function calcDistance(a: Point, b: Point) {
  const diffX = b.x - a.x;
  const diffY = b.y - a.y;
  return Math.sqrt(diffX ** 2 + diffY ** 2);
}

MouseSparkles.displayName = 'MouseSparkles';

export { MouseSparkles };
