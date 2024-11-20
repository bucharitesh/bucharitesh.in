"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Cloud = ({ delay = 0 }: { delay?: number }) => (
  <motion.img
    src="/assets/map/cloud.webp"
    width="100%"
    height="100%"
    alt=""
    draggable="false"
    className="absolute opacity-75 blur-sm"
    initial={{ x: -350, y: -350 }}
    animate={{
      x: [-350, 350, 600, -400, -350],
      y: [-350, 350, -350, 350, -350],
    }}
    transition={{
      duration: 120,
      delay,
      repeat: Infinity,
      ease: "linear",
    }}
  />
);

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

const getRandomDirection = () => {
  const directions = [
    { start: "left", end: "right" },
    { start: "right", end: "left" },
    { start: "top", end: "bottom" },
    { start: "bottom", end: "top" },
  ];
  return directions[Math.floor(Math.random() * directions.length)];
};

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
      case "left":
        start = { x: width / 2, y: 0 };
        end = { x: width, y: height };
        angle = 150;
        break;
      case "right":
        start = { x: width, y: height };
        end = { x: 0, y: 0 };
        angle = -45;
        break;
      case "top":
        start = { x:  width / 2, y: height / 2 };
        end = { x: width, y: height };
        angle = 0;
        break;
      case "bottom":
        start = { x: width, y: height };
        end = { x: width / 2, y: 0 };
        angle = -30;
        break;
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
        className="absolute z-30"
        initial={{
          x: movement.start.x,
          y: movement.start.y,
        }}
        animate={{
          x: [movement.start.x, movement.end.x],
          y: [movement.start.y, movement.end.y],
        }}
        style={{
          rotate: movement.angle,
        }}
        transition={{
          duration: 10,
          delay,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.img
        src="/assets/map/plane-shadow.webp"
        width={24}
        height={24}
        alt=""
        draggable="false"
        className="absolute opacity-30 z-10"
        initial={{
          x: movement.start.x + 20,
          y: movement.start.y + 20,
        }}
        animate={{
          x: [movement.start.x + 20, movement.end.x + 20],
          y: [movement.start.y + 20, movement.end.y + 20],
        }}
        style={{
          rotate: movement.angle,
        }}
        transition={{
          duration: 10,
          delay,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.div>
  );
};

const Map = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative h-fit w-full overflow-hidden rounded-xl"
    >
      {[...Array(5)].map((_, index) => (
        <Cloud key={index} />
      ))}

      <motion.img
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        width="100%"
        height="100%"
        src="/assets/map/map.webp"
        alt="Map with marker of Bengaluru, India"
        loading="eager"
        draggable="false"
        className="rounded-xl"
      />

      {[...Array(5)].map((_, index) => (
        <Plane key={index} />
      ))}

      <motion.a
        href="https://en.wikipedia.org/wiki/Bangalore"
        target="_blank"
        rel="noreferrer"
        className="exclude absolute bottom-0 right-0 mb-3 mr-3 select-none rounded-md border border-neutral-300 bg-neutral-50 px-2 py-1.5 text-[0.6rem] text-neutral-600 z-40"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Bengaluru, India
      </motion.a>
    </motion.div>
  );
};

export default Map;
