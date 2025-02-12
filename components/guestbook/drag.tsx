"use client";

import useMaxZIndex from "@/lib/hooks/use-max-z-index";
import { cn, getRandomRotation } from "@/lib/utils";
import { motion, type PanInfo, useAnimation } from "framer-motion";
import React from "react";

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
  }) => {
    const [zIndex, updateZIndex] = useMaxZIndex();
    const controls = useAnimation();
    // const r = getRandomRotation();
    // const [initialRotate] = useState(r);
    const [x, y] = [
      initialX ?? Math.floor(Math.random() * 1300),
      initialY ?? Math.floor(Math.random() * 900),
    ];

    const handleDragEnd = (event: MouseEvent, info: PanInfo) => {
    //   const direction = info.offset.x > 0 ? 1 : -1;
    //   const velocity = Math.min(Math.abs(info.velocity.x), 1);
      controls.start({
        rotate: rotation ? getRandomRotation() : 0,
        transition: {
          type: "spring",
          stiffness: 50,
          damping: 30,
          mass: 1,
          restDelta: 0.001,
        },
      });
    };

    return (
      <motion.div
        drag
        dragElastic={0.2}
        className={cn(
          "select-none w-fit h-fit drag-elements absolute",
          className
        )}
        dragTransition={{ power: 0.2, timeConstant: 200 }}
        onMouseDown={updateZIndex}
        onTouchStart={updateZIndex}
        onDragEnd={handleDragEnd}
        animate={controls}
        initial={{
          rotate: rotation ? getRandomRotation() : 0,
          x,
          y,
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