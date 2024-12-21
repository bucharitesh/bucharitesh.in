"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEasterEggs } from "@/lib/providers/easter-egg-provider";

const fadeIn = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export default function Info({ show }: { show: string[] }) {
  return (
    <>
      <EasterEggs className="top-4 right-4" />
    </>
  );
}

export function EasterEggs({ className }: { className?: string }) {
  const { totalPoints, progress, discoverEgg } = useEasterEggs();

  const allEggsDiscovered = progress.earnedPoints === progress.possiblePoints;

  return (
    <motion.div
      className={cn(
        "z-[50] fixed top-4 right-4 text-xs font-x tracking-wider text-gray-600 dark:text-gray-300",
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
