'use client';

import { USER } from '@/config/user';
import { useTime, useWindowSize } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import {
  type TargetAndTransition,
  type Transition,
  motion,
} from 'motion/react';

const fadeIn: {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  transition: Transition;
} = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export default function Info({ show }: { show: string[] }) {
  const { width } = useWindowSize();

  if (width < 1000) {
    return null;
  }

  return (
    <>
      {show.includes('time') && <Time className="top-4 left-4" />}
      {show.includes('screen') && <ScreenSize className="bottom-4 left-4" />}
      {show.includes('llms') && <LLMS className="right-4 bottom-4" />}
    </>
  );
}

export function Time({ className }: { className?: string }) {
  const time = useTime();

  return (
    <motion.div
      className={cn(
        'fixed top-4 left-4 z-50 font-x text-gray-600 text-xs tracking-wider dark:text-gray-300',
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
        'fixed bottom-4 left-4 z-50 font-x text-gray-600 text-xs tracking-wider dark:text-gray-300',
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
    <motion.div
      className={cn(
        'fixed right-4 bottom-4 z-50 flex flex-col items-end gap-0 font-x',
        className
      )}
      initial={fadeIn.initial}
      animate={fadeIn.animate}
      transition={fadeIn.transition}
    >
      <motion.a
        className={cn(
          'text-gray-600 text-xs tracking-wider dark:text-gray-300'
        )}
        href={`${USER.website}/llms-full.txt`}
        target="_blank"
        rel="noopener noreferrer"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={fadeIn.transition}
      >
        llms-full.txt
      </motion.a>
      <motion.a
        className={cn(
          'text-gray-600 text-xs tracking-wider dark:text-gray-300'
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
    </motion.div>
  );
}
