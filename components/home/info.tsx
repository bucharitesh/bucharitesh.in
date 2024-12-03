"use client";

import { useTime, useScreenSize } from "@/lib/hooks";
import { motion } from "framer-motion";
import { useEasterEggs } from "../easter-egg-provider";
import { cn } from "@/old/lib/utils";

const fadeIn = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export default function Info({ show }: { show: string[] }) {
  return (
    <>
      {show.includes("time") && <Time className="top-4 left-4" />}
      {show.includes("screen") && <ScreenSize className="bottom-4 left-4" />}
      {show.includes("easter") && <EasterEggs className="top-4 right-4" />}
    </>
  );
}

export function Time({ className }: { className?: string }) {
  const time = useTime();

  return (
    <motion.div
      className={cn(
        "z-[32] fixed top-4 left-4 text-xs font-x tracking-wider text-gray-600 dark:text-gray-300",
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

export function ScreenSize({ className }: { className?: string }  ) {
  const { width, height } = useScreenSize();

  return (
    <motion.div
      className={cn(
        "z-[32] fixed bottom-4 left-4 text-xs font-x tracking-wider text-gray-600 dark:text-gray-300",
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

export function EasterEggs({ className }: { className?: string }) {
  const { totalPoints, progress, discoverEgg } = useEasterEggs();

   const allEggsDiscovered = progress.earnedPoints === progress.possiblePoints;

  return (
    <motion.div
      className={cn(
        "z-[32] fixed top-4 right-4 text-xs font-x tracking-wider text-gray-600 dark:text-gray-300",
        allEggsDiscovered && "text-green-400 font-semibold",
        className
      )}
      onClick={() => {
        discoverEgg("FONT_SWITCH");
      }}
      initial={fadeIn.initial}
      animate={fadeIn.animate}
      transition={fadeIn.transition}
    >
      {totalPoints} / {progress.possiblePoints}
    </motion.div>
  );
}
