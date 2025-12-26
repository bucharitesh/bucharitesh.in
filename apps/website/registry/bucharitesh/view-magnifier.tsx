'use client';

import { cn } from '@/lib/utils';
import { animate, motion, useMotionValue, useTransform } from 'motion/react';
import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface ViewMagnifierProps {
  children: React.ReactNode;
  className?: string;
  maxScale?: number;
  onScaleChange?: (isActive: boolean) => void;
  onMaxScaleReached?: (isAtMax: boolean) => void;
}

const ViewMagnifier: React.FC<ViewMagnifierProps> = ({
  className,
  children,
  maxScale = 1.8,
  onScaleChange,
  onMaxScaleReached,
  ...props
}) => {
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isAtMaxScale, setIsAtMaxScale] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number>(0);
  const initialScale = useRef<number>(1);
  const scale = useMotionValue(1);
  const opacity = useTransform(scale, [1, maxScale], [0, 1]);
  const containerScale = useTransform(scale, [1, maxScale], [1, 1.6]);

  // Monitor scale changes for max scale callback
  useEffect(() => {
    const unsubscribe = scale.on('change', (latestScale) => {
      const newIsAtMaxScale = Math.abs(latestScale - maxScale) < 0.01;
      if (newIsAtMaxScale !== isAtMaxScale) {
        setIsAtMaxScale(newIsAtMaxScale);
        onMaxScaleReached?.(newIsAtMaxScale);
      }
    });

    return () => unsubscribe();
  }, [scale, maxScale, isAtMaxScale, onMaxScaleReached]);

  const handleZoomAnimation = useCallback(
    (targetScale: number) => {
      animate(scale, targetScale, {
        type: 'spring',
        stiffness: 400,
        damping: 30,
        onUpdate: (latest) => setZoomLevel(Math.round(latest * 100)),
      });
    },
    [scale]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>): void => {
      setIsMouseDown(true);
      startX.current = e.clientX;
      initialScale.current = scale.get();
      e.currentTarget.setPointerCapture(e.pointerId);
      onScaleChange?.(true);
    },
    [scale, onScaleChange]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>): void => {
      if (isMouseDown) {
        setIsMouseDown(false);
        handleZoomAnimation(1);
        e.currentTarget.releasePointerCapture(e.pointerId);
        onScaleChange?.(false);
      }
    },
    [isMouseDown, handleZoomAnimation, onScaleChange]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>): void => {
      if (!isMouseDown) return;

      const deltaX = e.clientX - startX.current;
      const scaleChange = deltaX * 0.005;
      const newScale = Math.max(
        0.8,
        Math.min(maxScale, initialScale.current + scaleChange)
      );

      scale.set(newScale);
      setZoomLevel(Math.round(newScale * 100));
    },
    [isMouseDown, maxScale, scale]
  );

  return (
    <div ref={containerRef} className="outline-hidden" {...props}>
      <motion.div
        className={cn(
          'pointer-events-none fixed inset-0 h-screen w-screen outline-hidden backdrop-blur-xl z-[9999]',
          'after:inset-0 after:h-full after:w-full after:rounded-[inherit] after:content-[""]',
          'after:pointer-events-none after:absolute dark:after:block',
          'dark:after:shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.2)]'
        )}
        style={{ opacity }}
        aria-hidden="true"
      />

      <motion.div
        className={cn(
          'relative right-1/2 left-1/2 my-3 h-auto w-full overflow-visible z-[10000]',
          'rounded-2xl',
          'transform lg:transform-none',
          className
        )}
        style={{
          scale: containerScale,
          translateX: '-50%',
          translateZ: '0px',
        }}
        role="img"
        aria-label={`Content at zoom level ${zoomLevel}%`}
      >
        <div className="relative h-full w-full overflow-hidden rounded-2xl">
          {children}
        </div>

        <motion.div
          style={{ opacity }}
          className="absolute inset-0 h-full w-full rounded-[inherit] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.02),0px_16px_24px_-4px_rgba(0,0,0,0.04),0px_32px_48px_-8px_rgba(0,0,0,0.06)]"
          aria-hidden="true"
        />

        <motion.button
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerUp}
          style={{
            scale: containerScale,
            translateY: '-50%',
            translateZ: '0px',
          }}
          aria-label={`Drag to zoom. Current zoom level: ${zoomLevel}%`}
          aria-valuemin={80}
          aria-valuemax={180}
          aria-valuenow={zoomLevel}
          role="slider"
          className={cn(
            '-right-6 absolute top-1/2',
            'h-14 w-1 rounded-full',
            'bg-gray-400 dark:bg-gray-600',
            'hover:bg-gray-500 dark:hover:bg-gray-500',
            'transition-colors duration-300',
            'focus-visible:outline-hidden focus-visible:ring-2',
            'focus-visible:ring-gray-400 dark:focus-visible:ring-gray-500',
            'focus-visible:ring-offset-2',
            'focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900',
            'hidden md:block',
            isMouseDown ? 'cursor-grabbing' : 'cursor-grab',
            'after:-left-2 after:absolute after:top-0 after:h-full after:w-4 after:content-[""]'
          )}
          touch-action="none"
        />
      </motion.div>
    </div>
  );
};

export default ViewMagnifier;
