'use client';

import { META_THEME_COLORS } from '@/config/site';
import { analytics } from '@/lib/analytics';
import { useMetaColor } from '@/lib/hooks/use-meta-colors';
import { useSound } from '@/lib/hooks/use-sound';
import { type Variants, motion as m } from 'motion/react';
import { useTheme } from 'next-themes';
import { useCallback, useRef } from 'react';

export default function ModeToggle() {
  const raysVariants = {
    hidden: {
      strokeOpacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    visible: {
      strokeOpacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const rayVariant: Variants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
      // Start from center of the circle
      scale: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
        // Customize timing for each property
        pathLength: { duration: 0.3 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.3 },
      },
    },
  };

  const shineVariant: Variants = {
    hidden: {
      opacity: 0,
      scale: 2,
      strokeDasharray: '20, 1000',
      strokeDashoffset: 0,
      filter: 'blur(0px)',
    },
    visible: {
      opacity: [0, 1, 0],
      strokeDashoffset: [0, -50, -100],
      filter: ['blur(2px)', 'blur(2px)', 'blur(0px)'],
      transition: {
        duration: 0.75,
        ease: 'linear',
      },
    },
  };

  const sunPath =
    'M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C60 29 69.5 38 70 49.5Z';
  const moonPath =
    'M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C39 45 49.5 59.5 70 49.5Z';

  const buttonRef = useRef<HTMLDivElement | null>(null);

  const { resolvedTheme, setTheme } = useTheme();

  const theme = resolvedTheme === 'dark' ? 'dark' : 'light';

  const { setMetaColor } = useMetaColor();

  const playClick = useSound("/assets/button-click.mp3");

  const switchTheme = useCallback(() => {
    playClick();
    const currentTheme = resolvedTheme === "dark" ? "dark" : "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    
    // Track theme toggle
    analytics.trackThemeToggle(currentTheme, newTheme);
    
    setTheme(newTheme);
    setMetaColor(
      currentTheme === "dark"
        ? META_THEME_COLORS.light
        : META_THEME_COLORS.dark
    );
  }, [resolvedTheme, setTheme, setMetaColor, playClick]);


  return (
    <div
      ref={buttonRef}
      className="flex h-full w-full items-center justify-center"
      onClick={() => {
        if (!document.startViewTransition) switchTheme();
        document.startViewTransition(switchTheme);
      }}
    >
      <m.svg
        strokeWidth="4"
        strokeLinecap="round"
        width={20}
        height={20}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative"
      >
        <m.path
          variants={shineVariant}
          d={moonPath}
          className="absolute top-0 left-0 stroke-blue-100"
          initial="hidden"
          animate={theme === 'dark' ? 'visible' : 'hidden'}
        />

        <m.g
          variants={raysVariants}
          initial="hidden"
          animate={theme === 'dark' ? 'hidden' : 'visible'}
          className="stroke-6 stroke-yellow-600 "
          style={{ strokeLinecap: 'round' }}
        >
          <m.path
            className="origin-center"
            variants={rayVariant}
            d="M50 2V11"
          />
          <m.path variants={rayVariant} d="M85 15L78 22" />
          <m.path variants={rayVariant} d="M98 50H89" />
          <m.path variants={rayVariant} d="M85 85L78 78" />
          <m.path variants={rayVariant} d="M50 98V89" />
          <m.path variants={rayVariant} d="M23 78L16 84" />
          <m.path variants={rayVariant} d="M11 50H2" />
          <m.path variants={rayVariant} d="M23 23L16 16" />
        </m.g>

        <m.path
          d={sunPath}
          fill="transparent"
          transition={{ duration: 1, type: 'spring' }}
          initial={{ fillOpacity: 0, strokeOpacity: 0 }}
          animate={
            theme === 'dark'
              ? {
                  d: moonPath,
                  rotate: -360,
                  scale: 2,
                  stroke: 'white',
                  fill: 'white',
                  fillOpacity: 0.35,
                  strokeOpacity: 1,
                  transition: { delay: 0.1 },
                }
              : {
                  d: sunPath,
                  rotate: 0,
                  stroke: 'orange',
                  fill: 'orange',
                  fillOpacity: 0.35,
                  strokeOpacity: 1,
                }
          }
        />
      </m.svg>
    </div>
  );
}

// <svg width="48" height="48" viewBox="0 0 24 24" color="var(--colors-gray10)" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" style="transform: rotate(40deg);"><mask id="myMask2"><rect x="0" y="0" width="100%" height="100%" fill="white"></rect><circle r="9" fill="black" cx="50%" cy="23%"></circle></mask><circle cx="12" cy="12" fill="var(--colors-gray10)" mask="url(#myMask2)" r="9"></circle><g stroke="currentColor" opacity="0"><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></g></svg>
// <svg width="48" height="48" viewBox="0 0 24 24" color="var(--colors-gray10)" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" style="transform: rotate(90deg);"><mask id="myMask2"><rect x="0" y="0" width="100%" height="100%" fill="white"></rect><circle r="9" fill="black" cx="100%" cy="0%"></circle></mask><circle cx="12" cy="12" fill="var(--colors-gray10)" mask="url(#myMask2)" r="5"></circle><g stroke="currentColor" opacity="1"><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></g></svg>
