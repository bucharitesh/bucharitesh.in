'use client';

import useMaxZIndex from '@/lib/hooks/use-max-z-index';
import { cn, getRandomRotation } from '@/lib/utils';
import { type PanInfo, motion, useAnimation } from 'motion/react';
import React, { useEffect, useState } from 'react';

const Drag = React.memo(
  ({
    children,
    className,
    initialX,
    initialY,
    rotation = true,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    initialX?: number;
    initialY?: number;
    rotation?: boolean;
  } & any) => {
    const [zIndex, updateZIndex] = useMaxZIndex();
    const controls = useAnimation();
    const [isClient, setIsClient] = useState(false);
    const [initialRotate, setInitialRotate] = useState(0);
    const [position, setPosition] = useState({
      x: initialX ?? 0,
      y: initialY ?? 0,
    });

    useEffect(() => {
      setIsClient(true);
      if (initialX === undefined || initialY === undefined) {
        setPosition({
          x: initialX ?? Math.floor(Math.random() * 1300),
          y: initialY ?? Math.floor(Math.random() * 900),
        });
      }
      if (rotation) {
        setInitialRotate(getRandomRotation());
      }
    }, [initialX, initialY, rotation]);

    const handleDragEnd = (event: MouseEvent, info: PanInfo) => {
      //   const direction = info.offset.x > 0 ? 1 : -1;
      //   const velocity = Math.min(Math.abs(info.velocity.x), 1);
      controls.start({
        rotate: rotation ? getRandomRotation() : 0,
        transition: {
          type: 'spring',
          stiffness: 50,
          damping: 30,
          mass: 1,
          restDelta: 0.001,
        },
      });
    };

    // Don't render until client-side to avoid hydration mismatch
    if (!isClient) {
      return null;
    }

    return (
      <motion.div
        drag
        dragElastic={0.2}
        className={cn(
          'drag-elements absolute h-fit w-fit select-none',
          className
        )}
        dragTransition={{ power: 0.2, timeConstant: 200 }}
        onMouseDown={updateZIndex}
        onTouchStart={updateZIndex}
        onDragEnd={handleDragEnd}
        animate={controls}
        initial={{
          rotate: initialRotate,
          x: position.x,
          y: position.y,
        }}
        style={{
          zIndex,
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

export default Drag;
