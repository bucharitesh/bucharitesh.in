"use client";

import { useTime, useScreenSize } from "@/lib/hooks";
import { motion } from "framer-motion";
import { useEasterEggs } from "../easter-egg-provider";
import { cn } from "@/old/lib/utils";
import { HiArrowPath } from "react-icons/hi2";

export default function Info() {
  const time = useTime();
  const { width, height } = useScreenSize();

   const {
      totalPoints,
      progress,
      discoverEgg,
      resetEasterEggs,
  } = useEasterEggs();

  const allEggsDiscovered = progress.earnedPoints === progress.possiblePoints;

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  if(height < 600 || width < 732) {
    return <></>;
  }

  return (
    <>
      {/* Top Left Time */}
      <motion.div
        className="z-[32] fixed top-4 left-4 text-xs font-x tracking-wider text-gray-600 dark:text-gray-300"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={fadeIn.transition}
      >
        {time}
      </motion.div>

      {/* Bottom Left Screen Size */}
      <motion.div
        className="z-[32] fixed bottom-4 left-4 text-xs font-x tracking-wider text-gray-600 dark:text-gray-300"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={fadeIn.transition}
      >
        {width} x {height}
      </motion.div>

      <motion.div
        className={cn(
          "z-[32] fixed top-4 right-4 text-xs font-x tracking-wider text-gray-600 dark:text-gray-300",
          allEggsDiscovered && "text-green-400 font-semibold"
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
    </>
  );
}
