'use client';

import { useWindowSize } from '@/lib/hooks';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

// Core configs
const WEATHER_CYCLE_DURATION = 10000;
const TRANSITION_SPEED = 0.05;
const INTENSITY_INTERVAL = 100;

// Utils
const getRandomDirection = () => {
  const directions = [
    { start: 'left', end: 'right' },
    { start: 'right', end: 'left' },
    { start: 'top', end: 'bottom' },
    { start: 'bottom', end: 'top' },
  ];
  return directions[Math.floor(Math.random() * directions.length)];
};

// Visual components
const Cloud = ({ delay = 0 }) => (
  <motion.img
    src="/assets/map/cloud.webp"
    width="100%"
    height="100%"
    alt=""
    draggable="false"
    className="absolute z-18 opacity-75 blur-xs"
    initial={{ x: -350, y: -350 }}
    animate={{
      x: [-350, 350, 600, -400, -350],
      y: [-350, 350, -350, 350, -350],
    }}
    transition={{
      duration: 120,
      delay,
      repeat: Number.POSITIVE_INFINITY,
      ease: 'linear',
    }}
  />
);

const Plane = ({ delay = 0 }) => {
  const { width, height } = useWindowSize();
  const [movement, setMovement] = useState({
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
    angle: 0,
  });

  useEffect(() => {
    const direction = getRandomDirection();
    let start = { x: 0, y: 0 };
    let end = { x: 0, y: 0 };
    let angle = 0;

    switch (direction.start) {
      case 'left': {
        start = { x: width / 2, y: 0 };
        end = { x: width, y: height };
        angle = 150;
        break;
      }
      case 'right': {
        start = { x: width, y: height };
        end = { x: 0, y: 0 };
        angle = -45;
        break;
      }
      case 'top': {
        start = { x: width / 2, y: height / 2 };
        end = { x: width, y: height };
        angle = 0;
        break;
      }
      case 'bottom': {
        start = { x: width, y: height };
        end = { x: width / 2, y: 0 };
        angle = -30;
        break;
      }
      default: {
        start = { x: 0, y: 0 };
        end = { x: 0, y: 0 };
        angle = 0;
        break;
      }
    }

    setMovement({ start, end, angle });
  }, [width, height]);

  return (
    <motion.div className="absolute inset-0">
      <motion.img
        src="/assets/map/plane.webp"
        width={24}
        height={56}
        alt=""
        draggable="false"
        className="absolute z-19"
        initial={{ x: movement.start.x, y: movement.start.y }}
        animate={{
          x: [movement.start.x, movement.end.x],
          y: [movement.start.y, movement.end.y],
        }}
        style={{ rotate: movement.angle }}
        transition={{
          duration: 10,
          delay,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'linear',
        }}
      />
      <motion.img
        src="/assets/map/plane-shadow.webp"
        width={24}
        height={24}
        alt=""
        draggable="false"
        className="absolute z-19 opacity-30"
        initial={{
          x: movement.start.x + 20,
          y: movement.start.y + 20,
        }}
        animate={{
          x: [movement.start.x + 20, movement.end.x + 20],
          y: [movement.start.y + 20, movement.end.y + 20],
        }}
        style={{ rotate: movement.angle }}
        transition={{
          duration: 10,
          delay,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'linear',
        }}
      />
    </motion.div>
  );
};

// Weather icons
const SunIcon = () => (
  <motion.svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <motion.circle
      cx="12"
      cy="12"
      r="4"
      initial={{ scale: 0.8 }}
      animate={{ scale: [0.8, 1, 0.8] }}
      transition={{
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: 'easeInOut',
      }}
    />
    {[...new Array(8)].map((_, i) => (
      <motion.line
        key={i}
        x1="12"
        y1="6"
        x2="12"
        y2="4"
        initial={{ opacity: 0.4 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
          delay: i * 0.2,
        }}
        style={{ transformOrigin: 'center', transform: `rotate(${i * 45}deg)` }}
      />
    ))}
  </motion.svg>
);

const MoonIcon = () => (
  <motion.svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <motion.path
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      initial={{ rotate: -20 }}
      animate={{ rotate: [-20, 0, -20] }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: 'easeInOut',
      }}
    />
  </motion.svg>
);

const RainIcon = () => (
  <motion.svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <motion.path
      d="M3 13.6C3 13.6 7 13.6 7 9.6C7 6.6 9.6 4 12.6 4C15.6 4 18.2 6.6 18.2 9.6C18.2 13.6 22.2 13.6 22.2 13.6"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: 'easeInOut',
      }}
    />
    {[...new Array(3)].map((_, i) => (
      <motion.line
        key={i}
        x1={8 + i * 6}
        y1="16"
        x2={8 + i * 6}
        y2="20"
        initial={{ y1: 16, y2: 16 }}
        animate={{ y1: [16, 16], y2: [16, 20] }}
        transition={{
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeOut',
          delay: i * 0.2,
        }}
      />
    ))}
  </motion.svg>
);

const WeatherIcon = ({ type }: { type: string }) => {
  const icons = {
    sun: <SunIcon />,
    moon: <MoonIcon />,
    rain: <RainIcon />,
  };
  return icons[type as keyof typeof icons] || icons.sun;
};

// Weather components
const RainDrop = ({ intensity }: { intensity: number }) => {
  const width = Math.random() * 2 + 2;
  const height = Math.random() * 20 + 20;
  const left = `${Math.random() * 100}%`;

  return (
    <motion.div
      className="absolute bg-blue-400"
      style={{ width, height, left, opacity: intensity * 0.5 }}
      initial={{ y: -20 }}
      animate={{ y: '120vh' }}
      transition={{
        duration: 0.7,
        repeat: Number.POSITIVE_INFINITY,
        ease: 'linear',
        delay: Math.random(),
      }}
    />
  );
};

const WeatherInfo = ({
  isNight,
  isRaining,
}: { isNight: boolean; isRaining: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
    className="absolute bottom-0 left-0 z-21 mb-3 ml-3"
  >
    <motion.div
      className="group relative flex items-center gap-2 rounded-lg bg-black/40 px-2.5 py-1.5 text-[0.6rem] text-white backdrop-blur-md"
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className="-z-10 absolute inset-0 rounded-lg opacity-50"
        style={{
          background:
            'radial-gradient(circle at center, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))',
          filter: 'blur(8px)',
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={isRaining ? 'rain' : isNight ? 'moon' : 'sun'}
          initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.5, rotate: 30 }}
          transition={{ duration: 0.5 }}
          className="text-white"
        >
          <WeatherIcon type={isRaining ? 'rain' : isNight ? 'moon' : 'sun'} />
        </motion.div>
      </AnimatePresence>

      <motion.span
        className="font-light tracking-wide opacity-90 group-hover:opacity-100"
        initial={{ opacity: 0, x: -5 }}
        animate={{ opacity: 0.9, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isRaining ? 'Rainy' : isNight ? 'Night' : 'Day'}
      </motion.span>
    </motion.div>
  </motion.div>
);

// Main component
// const Map = () => {
//   const [isNight, setIsNight] = useState(false);
//   const [isRaining, setIsRaining] = useState(false);
//   const [nightIntensity, setNightIntensity] = useState(0);
//   const [rainIntensity, setRainIntensity] = useState(0);

//   useEffect(() => {
//     let interval;
//     if (isNight && nightIntensity < 1) {
//       interval = setInterval(() => {
//         setNightIntensity((prev) => Math.min(prev + TRANSITION_SPEED, 1));
//       }, INTENSITY_INTERVAL);
//     } else if (!isNight && nightIntensity > 0) {
//       interval = setInterval(() => {
//         setNightIntensity((prev) => Math.max(prev - TRANSITION_SPEED, 0));
//       }, INTENSITY_INTERVAL);
//     }
//     return () => clearInterval(interval);
//   }, [isNight, nightIntensity]);

//   useEffect(() => {
//     let interval;
//     if (isRaining && rainIntensity < 1) {
//       interval = setInterval(() => {
//         setRainIntensity((prev) => Math.min(prev + TRANSITION_SPEED, 1));
//       }, INTENSITY_INTERVAL);
//     } else if (!isRaining && rainIntensity > 0) {
//       interval = setInterval(() => {
//         setRainIntensity((prev) => Math.max(prev - TRANSITION_SPEED, 0));
//       }, INTENSITY_INTERVAL);
//     }
//     return () => clearInterval(interval);
//   }, [isRaining, rainIntensity]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIsNight((prev) => !prev);
//       setIsRaining(Math.random() < 0.3);
//     }, WEATHER_CYCLE_DURATION);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <motion.div
//       initial={{ scale: 1.3 }}
//       animate={{ scale: 1 }}
//       transition={{ duration: 0.5 }}
//       className="relative h-fit w-full overflow-hidden rounded-xl"
//     >
//       <motion.img
//         initial={{ scale: 1.1 }}
//         animate={{ scale: 1 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//         width="100%"
//         height="100%"
//         src="/assets/map/map.webp"
//         alt="Map with marker of Bengaluru, India"
//         draggable="false"
//         className="rounded-xl relative z-10"
//       />

//       {/* Night effects */}
//       <motion.div
//         className="absolute inset-0 bg-[#0A1431] pointer-events-none z-21"
//         animate={{ opacity: nightIntensity * 0.75 }}
//         transition={{ duration: 1, ease: "easeInOut" }}
//       />
//       <motion.div
//         className="absolute inset-0 pointer-events-none z-22"
//         animate={{ opacity: nightIntensity * 0.4 }}
//         transition={{ duration: 1, ease: "easeInOut" }}
//         style={{
//           background:
//             "linear-gradient(to bottom, rgba(10, 20, 49, 0) 0%, rgba(10, 20, 49, 0.8) 100%)",
//         }}
//       />
//       <motion.div
//         className="absolute inset-0 pointer-events-none z-22"
//         animate={{ opacity: nightIntensity * 0.15 }}
//         transition={{ duration: 1, ease: "easeInOut" }}
//         style={{
//           backdropFilter: "blur(1px)",
//           background:
//             "radial-gradient(circle at center, rgba(147, 197, 253, 0.1) 0%, transparent 70%)",
//         }}
//       />

//       {[...Array(5)].map((_, index) => (
//         <Cloud key={index} delay={index * 2} />
//       ))}

//       {rainIntensity > 0 && (
//         <div className="absolute inset-0 overflow-hidden z-30">
//           {[...Array(Math.floor(100 * rainIntensity))].map((_, i) => (
//             <RainDrop key={i} intensity={rainIntensity} />
//           ))}
//         </div>
//       )}

//       {[...Array(5)].map((_, index) => (
//         <Plane key={index} delay={index * 2} />
//       ))}

//       <WeatherInfo
//         isNight={nightIntensity > 0.5}
//         isRaining={rainIntensity > 0.5}
//       />

//       <motion.a
//         href="https://en.wikipedia.org/wiki/Bangalore"
//         target="_blank"
//         rel="noreferrer"
//         className="absolute bottom-0 right-0 mb-3 mr-3 select-none rounded-md border border-neutral-300 bg-neutral-50 px-2 py-1.5 text-[0.6rem] text-neutral-600 z-21"
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//       >
//         Bengaluru, India
//       </motion.a>
//     </motion.div>
//   );
// };

export const Maps = () => {
  const [isNight, setIsNight] = useState(false);
  const [isRaining, setIsRaining] = useState(false);
  const [nightIntensity, setNightIntensity] = useState(0);
  const [rainIntensity, setRainIntensity] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isNight && nightIntensity < 1) {
      interval = setInterval(() => {
        setNightIntensity((prev) => Math.min(prev + TRANSITION_SPEED, 1));
      }, INTENSITY_INTERVAL);
    } else if (!isNight && nightIntensity > 0) {
      interval = setInterval(() => {
        setNightIntensity((prev) => Math.max(prev - TRANSITION_SPEED, 0));
      }, INTENSITY_INTERVAL);
    }
    return () => clearInterval(interval);
  }, [isNight, nightIntensity]);

  useEffect(() => {
    let interval: any;
    if (isRaining && rainIntensity < 1) {
      interval = setInterval(() => {
        setRainIntensity((prev) => Math.min(prev + TRANSITION_SPEED, 1));
      }, INTENSITY_INTERVAL);
    } else if (!isRaining && rainIntensity > 0) {
      interval = setInterval(() => {
        setRainIntensity((prev) => Math.max(prev - TRANSITION_SPEED, 0));
      }, INTENSITY_INTERVAL);
    }
    return () => clearInterval(interval);
  }, [isRaining, rainIntensity]);

  useEffect(() => {
    const interval: any = setInterval(() => {
      setIsNight((prev) => !prev);
      setIsRaining(Math.random() < 0.3);
    }, WEATHER_CYCLE_DURATION);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ scale: 1.3 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative h-fit w-full overflow-hidden rounded-xl"
    >
      <motion.img
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        width="100%"
        height="100%"
        src="/assets/map/map.webp"
        alt="Map with marker of Bengaluru, India"
        draggable="false"
        className="relative z-10 rounded-xl"
      />
      <motion.div
        className="pointer-events-none absolute inset-0 z-22"
        animate={{ opacity: nightIntensity * 0.15 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        style={{
          backdropFilter: 'blur(1px)',
          background:
            'radial-gradient(circle at center, rgba(147, 197, 253, 0.1) 0%, transparent 70%)',
        }}
      />
    </motion.div>
  );
};

export default Maps;
