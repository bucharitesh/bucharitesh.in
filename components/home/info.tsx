"use client";

import { useTime, useWindowSize } from "@/lib/hooks";
import { motion, TargetAndTransition, Transition } from "motion/react";
import { cn } from "@/lib/utils";
import { USER } from "@/config/user";

const fadeIn: {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  transition: Transition;
} = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export default function Info({ show }: { show: string[] }) {
  const { width } = useWindowSize();

  if (width < 1000) return null;

  return (
    <>
      {show.includes("time") && <Time className="top-4 left-4" />}
      {show.includes("screen") && <ScreenSize className="bottom-4 left-4" />}
      {show.includes("llms") && (
        <LLMS className="bottom-4 right-4" />
      )}
    </>
  );
}

export function Time({ className }: { className?: string }) {
  const time = useTime();

  return (
    <motion.div
      className={cn(
        "z-50 fixed top-4 left-4 text-xs font-x tracking-wider text-gray-600 dark:text-gray-300",
        className
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
  const { width, height } = useWindowSize();

  return (
    <motion.div
      className={cn(
        "z-50 fixed bottom-4 left-4 text-xs font-x tracking-wider text-gray-600 dark:text-gray-300",
        className
      )}
      initial={fadeIn.initial}
      animate={fadeIn.animate}
      transition={fadeIn.transition}
    >
      {width} x {height}
    </motion.div>
  );
}

export function LLMS({ className }: { className?: string }) {
  return (
    <motion.a
      className={cn(
        "z-50 fixed bottom-4 right-4 text-xs font-x tracking-wider text-gray-600 dark:text-gray-300",
        className
      )}
      href={`${USER.website}/llms.txt`}
      target="_blank"
      rel="noopener noreferrer"
      initial={fadeIn.initial}
      animate={fadeIn.animate}
      transition={fadeIn.transition}
    >
        llms.txt
    </motion.a>
  );
}
