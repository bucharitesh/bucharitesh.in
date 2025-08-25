"use client";

import { useTime, useScreenSize } from "@/lib/hooks";
import { motion, TargetAndTransition, Transition } from "motion/react";
import { cn } from "@/lib/utils";

const fadeIn : {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  transition: Transition;
} = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export default function Info({ show }: { show: string[] }) {
  const { width } = useScreenSize();

  if (width < 1000) return null;

  return (
    <>
      {show.includes("time") && <Time className="top-4 left-4" />}
      {show.includes("screen") && <ScreenSize className="bottom-4 left-4" />}
    </>
  );
}

export function Time({ className }: { className?: string }) {
  const time = useTime();

  return (
    <motion.div
      className={cn(
        "z-[50] fixed top-4 left-4 text-xs font-x tracking-wider text-gray-600 dark:text-gray-300",
        className,
      )}
      initial={fadeIn.initial}
      animate={fadeIn.animate}
      transition={fadeIn.transition}
    >
      {time}
    </motion.div>
  );
}

export function ScreenSize({ className }: { className?: string }) {
  const { width, height } = useScreenSize();

  return (
    <motion.div
      className={cn(
        "z-[50] fixed bottom-4 left-4 text-xs font-x tracking-wider text-gray-600 dark:text-gray-300",
        className,
      )}
      initial={fadeIn.initial}
      animate={fadeIn.animate}
      transition={fadeIn.transition}
    >
      {width} x {height}
    </motion.div>
  );
}
