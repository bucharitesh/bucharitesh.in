'use client';

import { Button } from '@repo/design-system/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';

interface Arc {
  color: string;
  velocity: number;
  lastImpactTime: number;
  nextImpactTime: number;
}

const PolyrhythmicSpiral: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const soundEnabledRef = useRef<boolean>(false);
  const keysRef = useRef<HTMLAudioElement[]>([]);
  const arcsRef = useRef<Arc[]>([]);
  const animationRef = useRef<number | null>(null);
  const dimensionsRef = useRef({ width: 0, height: 0 });

  // Reduce the number of arcs for better performance
  const colors = Array(14).fill('#A6C48A');

  const settings = {
    startTime: new Date().getTime(),
    duration: 900,
    maxCycles: Math.max(colors.length, 100),
    pulseEnabled: true,
    instrument: 'vibraphone',
  };

  const getFileName = (index: number): string => {
    if (settings.instrument === 'default') return `key-${index}`;
    return `${settings.instrument}-key-${index}`;
  };

  const getUrl = (index: number): string =>
    `https://assets.codepen.io/1468070/${getFileName(index)}.wav`;

  const calculateVelocity = (index: number): number => {
    const numberOfCycles = settings.maxCycles - index;
    const distancePerCycle = 2 * Math.PI;
    return (numberOfCycles * distancePerCycle) / settings.duration;
  };

  const calculateNextImpactTime = (
    currentImpactTime: number,
    velocity: number
  ): number => {
    return currentImpactTime + (Math.PI / velocity) * 1000;
  };

  // Pre-calculate some values to avoid repeated calculations
  const baseOpacity = 0.15;
  const maxOpacity = 0.65;
  const pointMaxOpacity = 0.85;
  const pulseDuration = 1000;

  const determineOpacity = (
    currentTime: number,
    lastImpactTime: number
  ): number => {
    if (!settings.pulseEnabled) return baseOpacity;

    const timeSinceImpact = currentTime - lastImpactTime;
    const percentage = Math.min(timeSinceImpact / pulseDuration, 1);
    const opacityDelta = maxOpacity - baseOpacity;
    return maxOpacity - opacityDelta * percentage;
  };

  // Memoize the position calculations
  const positionCache = new Map<string, { x: number; y: number }>();

  const calculatePositionOnArc = (
    center: { x: number; y: number },
    radius: number,
    angle: number
  ): { x: number; y: number } => {
    const key = `${center.x},${center.y},${radius},${angle.toFixed(4)}`;
    if (positionCache.has(key)) {
      return positionCache.get(key)!;
    }

    const position = {
      x: center.x + radius * Math.cos(angle),
      y: center.y + radius * Math.sin(angle),
    };

    // Only cache a reasonable number of positions
    if (positionCache.size < 1000) {
      positionCache.set(key, position);
    }

    return position;
  };

  const playKey = (index: number): void => {
    try {
      if (keysRef.current && keysRef.current[index]) {
        // Reuse existing audio elements rather than creating new ones each time
        const audio = keysRef.current[index];
        audio.currentTime = 0; // Reset the audio to start
        audio
          .play()
          .catch((err) => console.error(`Sound play error for ${index}:`, err));
      }
    } catch (error) {
      console.error(`Error playing key ${index}:`, error);
    }
  };

  const handleSoundToggle = (): void => {
    setSoundEnabled((prev) => {
      const newState = !prev;
      soundEnabledRef.current = newState;
      return newState;
    });
  };

  // Initialize once
  const init = (): void => {
    console.log('Initializing component and audio...');

    try {
      keysRef.current = colors.map((_, index) => {
        const audio = new Audio(getUrl(index));
        audio.volume = 0.15;
        audio.preload = 'auto';
        return audio;
      });
    } catch (error) {
      console.error('Error initializing audio:', error);
    }

    // Initialize arcs
    arcsRef.current = colors.map((color, index) => {
      const velocity = calculateVelocity(index);
      const lastImpactTime = 0;
      const nextImpactTime = calculateNextImpactTime(
        settings.startTime,
        velocity
      );

      return {
        color,
        velocity,
        lastImpactTime,
        nextImpactTime,
      };
    });

    // Initialize canvas context
    if (canvasRef.current) {
      // Set initial size
      resizeCanvas();

      // Get and store the context
      contextRef.current = canvasRef.current.getContext('2d', { alpha: true });

      if (contextRef.current) {
        // Set common properties once
        contextRef.current.lineCap = 'round';
      }
    }
  };

  // Optimized drawing functions
  const drawArc = (
    pen: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    start: number,
    end: number,
    action: 'stroke' | 'fill' = 'stroke'
  ): void => {
    pen.beginPath();
    pen.arc(x, y, radius, start, end);
    if (action === 'stroke') pen.stroke();
    else pen.fill();
  };

  // More efficient point drawing
  const drawPointOnArc = (
    pen: CanvasRenderingContext2D,
    center: { x: number; y: number },
    arcRadius: number,
    pointRadius: number,
    angle: number
  ): void => {
    const position = calculatePositionOnArc(center, arcRadius, angle);
    // Use faster method for small circles
    pen.beginPath();
    pen.arc(position.x, position.y, pointRadius, 0, 2 * Math.PI);
    pen.fill();
  };

  // Separate canvas resizing from animation loop
  const resizeCanvas = (): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();

    // Only resize if dimensions have changed
    if (
      rect.width !== dimensionsRef.current.width ||
      rect.height !== dimensionsRef.current.height
    ) {
      // Use devicePixelRatio for sharper rendering on high-DPI screens
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      // Scale the canvas
      if (contextRef.current) {
        contextRef.current.scale(dpr, dpr);
      }

      // Store new dimensions
      dimensionsRef.current = {
        width: rect.width,
        height: rect.height,
      };

      // Set CSS dimensions
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    }
  };

  // Main drawing function - optimized
  const draw = (): void => {
    const canvas = canvasRef.current;
    const pen = contextRef.current;

    if (!canvas || !pen) {
      animationRef.current = requestAnimationFrame(draw);
      return;
    }

    // Clear the canvas efficiently
    pen.clearRect(
      0,
      0,
      dimensionsRef.current.width,
      dimensionsRef.current.height
    );

    const currentTime = new Date().getTime();
    const elapsedTime = (currentTime - settings.startTime) / 1000;

    const length =
      Math.min(dimensionsRef.current.width, dimensionsRef.current.height) * 0.9;
    const offset = (dimensionsRef.current.width - length) / 2;

    const center = {
      x: dimensionsRef.current.width / 2,
      y: dimensionsRef.current.height / 2,
    };

    // Pre-calculate common measurements
    const baseLength = dimensionsRef.current.width - 2 * offset;
    const initialRadius = baseLength * 0.05;
    const circleRadius = baseLength * 0.006;
    const clearance = baseLength * 0.03;
    const spacing =
      (baseLength - initialRadius - clearance) / 2 / colors.length;
    const lineWidth = baseLength * 0.002;

    // Set line dash pattern once
    const dashSize = Math.max(2, Math.round(baseLength * 0.003));
    const dashPattern = [dashSize, dashSize * 1.5];

    // Set initial line style
    pen.lineWidth = lineWidth;

    // Process all arcs at once
    for (let i = 0; i < arcsRef.current.length; i++) {
      const arc = arcsRef.current[i];
      const radius = initialRadius + spacing * i;

      // Draw arc (bottom half)
      pen.globalAlpha = determineOpacity(currentTime, arc.lastImpactTime);
      pen.strokeStyle = arc.color;
      pen.setLineDash(dashPattern);

      pen.beginPath();
      pen.arc(center.x, center.y, radius, Math.PI, 2 * Math.PI);
      pen.stroke();

      // Reset line dash for other elements
      pen.setLineDash([]);

      // Draw impact points
      pen.globalAlpha = determineOpacity(currentTime, arc.lastImpactTime);
      pen.fillStyle = arc.color;

      // Left point
      drawPointOnArc(pen, center, radius, circleRadius * 0.75, Math.PI);
      // Right point
      drawPointOnArc(pen, center, radius, circleRadius * 0.75, 2 * Math.PI);

      // Calculate current position of moving dot
      const distance = elapsedTime >= 0 ? elapsedTime * arc.velocity : 0;
      const totalDistance = distance % (2 * Math.PI);

      // Calculate angle for bottom semicircle
      let angle;
      if (totalDistance <= Math.PI) {
        angle = Math.PI + totalDistance;
      } else {
        angle = 3 * Math.PI - totalDistance;
      }

      // Handle impact and sound
      if (currentTime >= arc.nextImpactTime) {
        if (soundEnabledRef.current) {
          playKey(i);
          arc.lastImpactTime = arc.nextImpactTime;
        }
        arc.nextImpactTime = calculateNextImpactTime(
          arc.nextImpactTime,
          arc.velocity
        );
      }

      // Draw moving dot
      pen.globalAlpha = 1;
      pen.fillStyle = arc.color;
      drawPointOnArc(pen, center, radius, circleRadius, angle);
    }

    animationRef.current = requestAnimationFrame(draw);
  };

  // Effect for initialization and cleanup
  useEffect(() => {
    init();

    // Start animation
    if (animationRef.current === null) {
      animationRef.current = requestAnimationFrame(draw);
    }

    // Handle visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setSoundEnabled(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      // Clear cache
      positionCache.clear();
    };
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={handleSoundToggle}
          className="border-white/20 bg-black/50 hover:bg-black/70"
          aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
          data-toggled={soundEnabled ? 'true' : 'false'}
        >
          {soundEnabled ? (
            <Volume2 className="h-4 w-4 text-white" />
          ) : (
            <VolumeX className="h-4 w-4 text-white" />
          )}
        </Button>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <canvas ref={canvasRef} className="h-full w-full" id="paper" />
      </div>
    </div>
  );
};

export default PolyrhythmicSpiral;
