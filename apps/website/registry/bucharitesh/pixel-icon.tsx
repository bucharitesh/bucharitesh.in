'use client';

import type React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface PixelIconProps {
  icon: number[][];
  baseColor: string;
  flickerColor: string;
  secondaryColor?: string;
  size?: number;
  flickerChance?: number;
  pixelShape?: 'circle' | 'square';
  className?: string;
}

const PixelIcon: React.FC<PixelIconProps> = ({
  icon,
  baseColor,
  flickerColor,
  secondaryColor = 'gray',
  size = 80,
  flickerChance = 0.3,
  pixelShape = 'circle',
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const memoizedColors = useMemo(() => {
    const toRGB = (color: string): [number, number, number] => {
      if (typeof window === 'undefined') {
        return [0, 0, 0];
      }
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext('2d');
      if (!ctx) return [255, 0, 0];
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
      return [r, g, b];
    };

    const createShades = (
      color: [number, number, number],
      isDarker: boolean
    ) => {
      const shades: any = [];
      if (isDarker) {
        // Create more distinct dark shades
        const darkFactors = [0.7, 0.8, 0.9, 1.0];
        for (const factor of darkFactors) {
          shades.push(
            color.map((c) => Math.floor(c * factor)) as [number, number, number]
          );
        }
      } else {
        // Keep the original logic for lighter shades
        for (let i = 0; i < 4; i++) {
          const factor = 0.7 + (0.6 * i) / 3; // Range from 0.7 to 1.3
          shades.push(
            color.map((c) => Math.min(255, Math.floor(c * factor))) as [
              number,
              number,
              number,
            ]
          );
        }
      }
      return shades;
    };

    const baseRGB = toRGB(baseColor);
    const flickerRGB = toRGB(flickerColor);
    const secondaryRGB = toRGB(secondaryColor);

    return {
      base: `rgb(${baseRGB.join(',')})`,
      flickerDark: createShades(flickerRGB, true),
      flickerLight: createShades(flickerRGB, false),
      secondary: `rgb(${secondaryRGB.join(',')})`,
    };
  }, [baseColor, flickerColor, secondaryColor]);

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;

      const pixelSize = size / icon.length;
      const pixelStates = icon.map((row) =>
        row.map((pixel) => ({
          type: pixel,
          shadeIndex: 3, // Start with the brightest shade
        }))
      );

      return {
        pixelSize,
        pixelStates,
        dpr,
      };
    },
    [icon, size]
  );

  const updatePixels = useCallback(
    (
      pixelStates: { type: number; shadeIndex: number }[][],
      deltaTime: number
    ) => {
      if (!isHovering) return;

      pixelStates.forEach((row) => {
        row.forEach((pixel) => {
          if (pixel.type !== 0 && Math.random() < flickerChance * deltaTime) {
            if (pixel.type === 1) {
              // Darker shades for type 1
              pixel.shadeIndex = Math.floor(Math.random() * 4); // 0 to 3
            } else if (pixel.type === 2) {
              // Lighter shades for type 2
              pixel.shadeIndex = Math.floor(Math.random() * 4); // 0 to 3
            }
          }
        });
      });
    },
    [isHovering, flickerChance]
  );

  const drawIcon = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      pixelSize: number,
      pixelStates: { type: number; shadeIndex: number }[][],
      dpr: number
    ) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      pixelStates.forEach((row, y) => {
        row.forEach((pixel, x) => {
          if (pixel.type === 0) return;

          let color: any;

          if (isHovering) {
            if (pixel.type === 2) {
              color = `rgb(${memoizedColors.flickerDark[pixel.shadeIndex].join(',')})`;
            } else if (pixel.type === 1) {
              color = `rgb(${memoizedColors.flickerLight[pixel.shadeIndex].join(',')})`;
            }
          } else {
            color =
              pixel.type === 1 ? memoizedColors.base : memoizedColors.secondary;
          }

          ctx.fillStyle = (color as string) ?? '';

          if (pixelShape === 'circle') {
            ctx.beginPath();
            ctx.arc(
              (x * pixelSize + pixelSize / 2) * dpr,
              (y * pixelSize + pixelSize / 2) * dpr,
              (pixelSize / 2) * dpr,
              0,
              Math.PI * 2
            );
            ctx.fill();
          } else {
            ctx.fillRect(
              x * pixelSize * dpr,
              y * pixelSize * dpr,
              pixelSize * dpr,
              pixelSize * dpr
            );
          }
        });
      });
    },
    [memoizedColors, isHovering, pixelShape]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const { pixelSize, pixelStates, dpr } = setupCanvas(canvas);

    let lastTime = 0;
    const animate = (time: number) => {
      if (!isInView) return;

      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      updatePixels(pixelStates, deltaTime);
      drawIcon(ctx, pixelSize, pixelStates, dpr);
      animationFrameId = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(canvas);

    if (isInView) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [setupCanvas, updatePixels, drawIcon, isInView]);

  return (
    <div
      role="img"
      aria-label="Pixel icon"
      className={`box-border cursor-pointer ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        width={size}
        height={size}
      />
    </div>
  );
};

export default PixelIcon;
