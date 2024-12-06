"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface ViewMagnifierProps {
  children: React.ReactNode;
  className?: string;
  defaultBackground?: string;
  maxScale?: number;
  maxBlur?: number;
  ariaLabel?: string;
}

const ViewMagnifier: React.FC<ViewMagnifierProps> = ({
  className,
  children,
  maxScale = 1.8,
}) => {
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const containerRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number>(0);
  const initialScale = useRef<number>(1);
  const scale = useMotionValue(1);
  const opacity = useTransform(scale, [1, maxScale], [0, 1]);
  const containerScale = useTransform(scale, [1, maxScale], [1, 1.6]);

  const handleZoomAnimation = useCallback(
    (targetScale: number) => {
      animate(scale, targetScale, {
        type: "spring",
        stiffness: 400,
        damping: 30,
        onUpdate: (latest) => setZoomLevel(Math.round(latest * 100)),
      });
    },
    [scale]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent): void => {
      if (!isFocused) return;
      setIsMouseDown(true);
      startX.current = e.clientX;
      initialScale.current = scale.get();
    },
    [scale, isFocused]
  );

  const handleMouseUp = useCallback((): void => {
    if (isMouseDown) {
      setIsMouseDown(false);
      handleZoomAnimation(1);
    }
  }, [isMouseDown, handleZoomAnimation]);

  const handleMouseMove = useCallback(
    (e: MouseEvent): void => {
      if (!isMouseDown || !isFocused) return;

      const deltaX = e.clientX - startX.current;
      const scaleChange = deltaX * 0.005;
      const newScale = Math.max(
        0.8,
        Math.min(maxScale, initialScale.current + scaleChange)
      );

      scale.set(newScale);
      setZoomLevel(Math.round(newScale * 100));
    },
    [isMouseDown, maxScale, scale, isFocused]
  );

  useEffect(() => {
    if (isMouseDown && isFocused) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isMouseDown, handleMouseMove, handleMouseUp, isFocused]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="outline-none z-40"
      onFocus={() => setIsFocused(true)}
      onBlur={() => {
        setIsFocused(false);
        handleZoomAnimation(1);
        setIsMouseDown(false);
      }}
    >
      <motion.div
        className={cn(
          "fixed h-screen w-screen outline-none inset-0 pointer-events-none backdrop-blur-xl",
          "after:content-[''] after:rounded-[inherit] after:w-full after:h-full after:inset-0",
          "after:absolute after:pointer-events-none dark:after:block",
          "dark:after:shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.2)]"
        )}
        style={{ opacity }}
        aria-hidden="true"
      />

      <motion.div
        className={cn(
          "relative left-1/2 right-1/2 w-full h-auto overflow-visible my-3",
          "z-[60] rounded-2xl",
          "transform lg:transform-none",
          className
        )}
        style={{
          scale: containerScale,
          translateX: "-50%",
          translateZ: "0px",
        }}
        role="img"
        aria-label={`Content at zoom level ${zoomLevel}%`}
      >
        <div className="w-full h-full rounded-[inherit] overflow-hidden">
          {children}
        </div>

        <motion.div
          style={{ opacity }}
          className="w-full h-full absolute rounded-[inherit] inset-0 shadow-[0px_1px_1px_0px_rgba(0,0,0,0.02),0px_16px_24px_-4px_rgba(0,0,0,0.04),0px_32px_48px_-8px_rgba(0,0,0,0.06)]"
          aria-hidden="true"
        />

        <motion.button
          onMouseDown={handleMouseDown}
          style={{
            scale: containerScale,
            translateY: "-50%",
            translateZ: "0px",
          }}
          aria-label={`Drag to zoom. Current zoom level: ${zoomLevel}%`}
          aria-valuemin={80}
          aria-valuemax={180}
          aria-valuenow={zoomLevel}
          role="slider"
          className={cn(
            "absolute top-1/2 -right-6",
            "w-1 h-14 rounded-full",
            "bg-gray-400 dark:bg-gray-600",
            "hover:bg-gray-500 dark:hover:bg-gray-500",
            "transition-colors duration-300",
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-gray-400 dark:focus-visible:ring-gray-500",
            "focus-visible:ring-offset-2",
            "focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900",
            "md:block hidden",
            isMouseDown ? "cursor-grabbing" : "cursor-grab",
            "after:content-[''] after:absolute after:w-4 after:h-full after:-left-2 after:top-0"
          )}
        />
      </motion.div>
    </div>
  );
};

export default ViewMagnifier;
