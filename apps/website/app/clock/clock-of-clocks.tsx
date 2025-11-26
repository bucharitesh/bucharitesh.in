'use client';

import { cn } from '@/lib/utils';
import React, { useState, useEffect, useRef } from 'react';

const H = { h: 0, m: 180 },
  V = { h: 270, m: 90 },
  TL = { h: 180, m: 270 },
  TR = { h: 0, m: 270 },
  BL = { h: 180, m: 90 },
  BR = { h: 0, m: 90 },
  E = { h: 135, m: 135 };

const digits = [
  [
    BR,
    H,
    H,
    BL,
    V,
    BR,
    BL,
    V,
    V,
    V,
    V,
    V,
    V,
    V,
    V,
    V,
    V,
    TR,
    TL,
    V,
    TR,
    H,
    H,
    TL,
  ],
  [
    BR,
    H,
    BL,
    E,
    TR,
    BL,
    V,
    E,
    E,
    V,
    V,
    E,
    E,
    V,
    V,
    E,
    BR,
    TL,
    TR,
    BL,
    TR,
    H,
    H,
    TL,
  ],
  [
    BR,
    H,
    H,
    BL,
    TR,
    H,
    BL,
    V,
    BR,
    H,
    TL,
    V,
    V,
    BR,
    H,
    TL,
    V,
    TR,
    H,
    BL,
    TR,
    H,
    H,
    TL,
  ],
  [
    BR,
    H,
    H,
    BL,
    TR,
    H,
    BL,
    V,
    E,
    BR,
    TL,
    V,
    E,
    TR,
    BL,
    V,
    BR,
    H,
    TL,
    V,
    TR,
    H,
    H,
    TL,
  ],
  [
    BR,
    BL,
    BR,
    BL,
    V,
    V,
    V,
    V,
    V,
    TR,
    TL,
    V,
    TR,
    H,
    BL,
    V,
    E,
    E,
    V,
    V,
    E,
    E,
    TR,
    TL,
  ],
  [
    BR,
    H,
    H,
    BL,
    V,
    BR,
    H,
    TL,
    V,
    TR,
    H,
    BL,
    TR,
    H,
    BL,
    V,
    BR,
    H,
    TL,
    V,
    TR,
    H,
    H,
    TL,
  ],
  [
    BR,
    H,
    H,
    BL,
    V,
    BR,
    H,
    TL,
    V,
    TR,
    H,
    BL,
    V,
    BR,
    BL,
    V,
    V,
    TR,
    TL,
    V,
    TR,
    H,
    H,
    TL,
  ],
  [
    BR,
    H,
    H,
    BL,
    TR,
    H,
    BL,
    V,
    E,
    E,
    V,
    V,
    E,
    E,
    V,
    V,
    E,
    E,
    V,
    V,
    E,
    E,
    TR,
    TL,
  ],
  [
    BR,
    H,
    H,
    BL,
    V,
    BR,
    BL,
    V,
    V,
    TR,
    TL,
    V,
    V,
    BR,
    BL,
    V,
    V,
    TR,
    TL,
    V,
    TR,
    H,
    H,
    TL,
  ],
  [
    BR,
    H,
    H,
    BL,
    V,
    BR,
    BL,
    V,
    V,
    TR,
    TL,
    V,
    TR,
    H,
    BL,
    V,
    BR,
    H,
    TL,
    V,
    TR,
    H,
    H,
    TL,
  ],
];

const normalizeAngle = (next: number, prev: number) => {
  const delta = (((next - prev) % 360) + 360) % 360;
  return prev + delta;
};

const getTimeDigits = () => {
  const now = new Date();
  return [now.getHours(), now.getMinutes(), now.getSeconds()].flatMap((val) =>
    String(val).padStart(2, '0').split('').map(Number)
  );
};

const randomAngle = () => Math.floor(Math.random() * 360);

const Clock = ({
  h,
  m,
  initial,
}: { h: number; m: number; initial: boolean }) => {
  const prev = useRef({ h: 0, m: 0 });
  const [randomAngles, setRandomAngles] = useState({ h: 0, m: 0 });
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // Generate random angles only after mounting (client-side only)
    setRandomAngles({ h: randomAngle(), m: randomAngle() });
    setHasMounted(true);
  }, []);

  const hourAngle = normalizeAngle(h, prev.current.h);
  const minuteAngle = normalizeAngle(m, prev.current.m);
  prev.current = { h: hourAngle, m: minuteAngle };

  return (
    <div
      className={cn(
        'clock relative w-[var(--clock-size)] h-[var(--clock-size)] rounded-full shrink-0',
        'border-2 border-white dark:border-gray-800 max-[700px]:border max-[500px]:border',
        '[background:linear-gradient(225deg,#d0d0d0_10%,white)] dark:[background:linear-gradient(225deg,#404040_10%,#1f1f1f)]',
        '[box-shadow:-2px_2px_6px_#d0d0d0,2px_-2px_6px_#ffffff] dark:[box-shadow:-2px_2px_6px_#000000,2px_-2px_6px_#404040]',
        "before:absolute before:content-[''] before:top-[calc(50%-var(--h)*0.5)] before:left-1/2 before:origin-[0%_50%]",
        'before:w-[var(--w)] before:h-[var(--h)] before:bg-black dark:before:bg-white before:rounded-full',
        'before:transition-all before:duration-[calc(var(--dur)*1s)] before:ease-in-out',
        'before:rotate-[calc(var(--angle)*1deg)] before:[--angle:var(--hour-angle)]',
        "after:absolute after:content-[''] after:top-[calc(50%-var(--h)*0.5)] after:left-1/2 after:origin-[0%_50%]",
        'after:w-[var(--w)] after:h-[var(--h)] after:bg-black dark:after:bg-white after:rounded-full',
        'after:transition-all after:duration-[calc(var(--dur)*1s)] after:ease-in-out',
        'after:rotate-[calc(var(--angle)*1deg)] after:[--angle:var(--minute-angle)]'
      )}
      style={
        {
          '--w': '47%',
          '--h': '3px',
          '--hour-angle': initial && hasMounted ? randomAngles.h : hourAngle,
          '--minute-angle':
            initial && hasMounted ? randomAngles.m : minuteAngle,
          '--dur': initial ? 1 : 0.4,
        } as React.CSSProperties
      }
    />
  );
};

const App = () => {
  const [time, setTime] = useState<number[]>(new Array(6).fill(0));
  const [initial, setInitial] = useState<boolean>(true);

  useEffect(() => {
    let updateTimerId: NodeJS.Timeout;
    const updateTime = () => {
      setTime(getTimeDigits());
      const now = Date.now();
      const delay = 1000 - (now % 1000);
      updateTimerId = setTimeout(updateTime, delay);
    };

    const initialTimerId = setTimeout(() => {
      setInitial(false);
      updateTime();
    }, 600);

    return () => {
      clearTimeout(updateTimerId);
      clearTimeout(initialTimerId);
    };
  }, []);

  return (
    <>
      <div
        className="text-center flex gap-[var(--gap)] pl-[calc(var(--clock-size)+var(--gap)*2)]"
        style={
          {
            '--clock-size': '3vw',
            '--gap': 'calc(var(--clock-size) * 0.05)',
            '--clock-segment-w': 'calc(var(--clock-size) * 4 + var(--gap) * 5)',
            '--clock-segment-h': 'calc(var(--clock-size) * 6 + var(--gap) * 5)',
            fontFamily: 'sans-serif',
          } as React.CSSProperties
        }
      >
        {time.map((t, i) => (
          <div
            key={i}
            className="flex flex-wrap gap-[var(--gap)] w-[var(--clock-segment-w)] h-[var(--clock-segment-h)]"
            style={
              i % 2 === 1
                ? ({ marginRight: 'var(--clock-size)' } as React.CSSProperties)
                : undefined
            }
          >
            {digits[t].map(({ h, m }, j) => (
              <Clock key={j} h={h} m={m} initial={initial} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
