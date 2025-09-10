'use client';

import { useEasterEggs } from '@/lib/providers/easter-egg-provider';
import { cn } from '@/lib/utils';
import {
  type TargetAndTransition,
  type Transition,
  motion,
} from 'motion/react';
import { useEffect, useState } from 'react';

const fadeIn: {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  transition: Transition;
} = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
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
          'fixed top-4 right-4 z-50 font-x text-gray-600 text-xs tracking-wider dark:text-gray-300',
          allEggsDiscovered &&
            'font-semibold text-green-400 dark:text-green-400',
          className
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
