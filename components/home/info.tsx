"use client";

import { useTime, useScreenSize } from "@/lib/hooks";
import { motion } from "framer-motion";

export default function Info() {
  const time = useTime();
  const { width, height } = useScreenSize();

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
    </>
  );
}
