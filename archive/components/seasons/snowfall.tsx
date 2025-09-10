'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface Snowflake {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
}

export function Snowfall({ enabled = true }: { enabled?: boolean }) {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth);
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const createSnowflake = () => {
      const id = Date.now() + Math.random(); // More unique ID
      const x = Math.random() * width;
      const size = Math.random() * 4 + 3; // Increased size: 3-7px
      const delay = Math.random() * 2;
      const duration = Math.random() * 3 + 0; // Slower fall: 6-9s

      setSnowflakes((prev) => [...prev, { id, x, size, delay, duration }]);

      setTimeout(
        () => {
          setSnowflakes((prev) => prev.filter((flake) => flake.id !== id));
        },
        duration * 1000 + delay * 1000
      );
    };

    // Create more snowflakes more frequently
    const interval = setInterval(createSnowflake, 150);
    return () => clearInterval(interval);
  }, [enabled, width]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0" style={{ zIndex: 1000 }}>
      <AnimatePresence>
        {snowflakes.map((flake) => (
          <motion.div
            key={flake.id}
            initial={{ y: -20, x: flake.x, opacity: 0 }}
            animate={{
              y: '100vh',
              x: flake.x + Math.sin(flake.duration) * 100, // More horizontal movement
              opacity: 0.8,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: flake.duration,
              delay: flake.delay,
              ease: 'linear',
            }}
            style={{
              position: 'absolute',
              width: flake.size,
              height: flake.size,
              backgroundColor: 'rgb(255, 255, 255)',
              borderRadius: '50%',
              filter: 'blur(0.5px)',
              boxShadow: '0 0 2px rgba(255, 255, 255, 0.8)', // Add glow effect
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
