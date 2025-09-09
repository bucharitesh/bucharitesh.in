"use client";

import { motion, TargetAndTransition, Transition } from "motion/react";
import { cn } from "@/lib/utils";
import { useEasterEggs } from "@/lib/providers/easter-egg-provider";
import { useEffect, useState } from "react";

const fadeIn : {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  transition: Transition;
} = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export function EasterEggs({ className }: { className?: string }) {
  const { totalPoints, progress, resetEasterEggs } = useEasterEggs();

  const allEggsDiscovered = progress.earnedPoints === progress.possiblePoints;

  // Add client-side only rendering
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Return null on server
  }

  return (
    <>
      <motion.div
        className={cn(
          "z-50 fixed top-4 right-4 text-xs font-x tracking-wider text-gray-600 dark:text-gray-300",
          allEggsDiscovered && "text-green-400 font-semibold dark:text-green-400",
          className,
        )}
        onClick={() => {
          resetEasterEggs();
        }}
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={fadeIn.transition}
      >
        {totalPoints} / {progress.possiblePoints}
      </motion.div>
    </>
  );
}
