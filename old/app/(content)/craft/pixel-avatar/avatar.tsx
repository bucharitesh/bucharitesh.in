"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/old/lib/utils";

interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  size?: number;
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size = 40, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex shrink-0 overflow-hidden rounded-full",
      className
    )}
    style={{ width: `${size}px`, height: `${size}px` }}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

interface AvatarImageProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>,
    "src"
  > {
  src: string;
  squareSize?: number;
  gridGap?: number;
  pixelShape?: "square" | "circle";
}

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>(
  (
    {
      className,
      squareSize = 2,
      gridGap = 1,
      src,
      pixelShape = "square",
      ...props
    },
    ref
  ) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = React.useState(false);
    const animationRef = React.useRef<number>();
    const imageRef = React.useRef<HTMLImageElement | null>(null);
    const effectIntensityRef = React.useRef(0);

    React.useEffect(() => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container || !src) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const updateCanvasSize = () => {
        const rect = container.getBoundingClientRect();
        const size = Math.min(rect.width, rect.height);
        const dpr = window.devicePixelRatio || 1;
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        canvas.style.width = `${size}px`;
        canvas.style.height = `${size}px`;
        return size;
      };

      const size = updateCanvasSize();

      let originalPixels: Uint8ClampedArray | null = null;
      let cols: number, rows: number;

      const loadAndProcessImage = async () => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = src;

        img.onload = () => {
          imageRef.current = img;
          cols = Math.floor(size / (squareSize + gridGap));
          rows = cols;

          const tempCanvas = document.createElement("canvas");
          const tempCtx = tempCanvas.getContext("2d", {
            willReadFrequently: true,
          });
          if (!tempCtx) return;

          tempCanvas.width = img.width;
          tempCanvas.height = img.height;
          tempCtx.drawImage(img, 0, 0, img.width, img.height);

          const imageData = tempCtx.getImageData(0, 0, img.width, img.height);
          originalPixels = new Uint8ClampedArray(imageData.data);

          drawPixels(ctx, originalPixels, 0);
        };
      };

      const drawPixels = (
        ctx: CanvasRenderingContext2D,
        pixels: Uint8ClampedArray,
        effectIntensity: number
      ) => {
        if (!imageRef.current) return;

        const dpr = window.devicePixelRatio || 1;
        const pixelSize = squareSize * dpr;
        const gap = gridGap * dpr;
        const scaleX = imageRef.current.width / cols;
        const scaleY = imageRef.current.height / rows;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const sourceX = Math.floor(i * scaleX);
            const sourceY = Math.floor(j * scaleY);

            const pixelIndex = (sourceY * imageRef.current.width + sourceX) * 4;
            let r = pixels[pixelIndex];
            let g = pixels[pixelIndex + 1];
            let b = pixels[pixelIndex + 2];
            let a = pixels[pixelIndex + 3];

            const offset =
              Math.sin(Date.now() * 0.01 + i * 0.1 + j * 0.1) *
              30 *
              effectIntensity;
            r = Math.min(255, Math.max(0, r + offset));
            g = Math.min(255, Math.max(0, g + offset));
            b = Math.min(255, Math.max(0, b + offset));

            const pixelX = i * (pixelSize + gap);
            const pixelY = j * (pixelSize + gap);

            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a / 255})`;

            if (pixelShape === "square") {
              ctx.fillRect(pixelX, pixelY, pixelSize, pixelSize);
            } else if (pixelShape === "circle") {
              ctx.beginPath();
              ctx.arc(
                pixelX + pixelSize / 2,
                pixelY + pixelSize / 2,
                pixelSize / 2,
                0,
                Math.PI * 2
              );
              ctx.fill();
            }
          }
        }
      };

      const animate = () => {
        if (originalPixels && ctx) {
          if (isHovering) {
            effectIntensityRef.current = Math.min(
              1,
              effectIntensityRef.current + 0.05
            );
          } else {
            effectIntensityRef.current = Math.max(
              0,
              effectIntensityRef.current - 0.05
            );
          }
          drawPixels(ctx, originalPixels, effectIntensityRef.current);
        }
        animationRef.current = requestAnimationFrame(animate);
      };

      loadAndProcessImage();
      animate();

      const resizeObserver = new ResizeObserver(() => {
        updateCanvasSize();
        if (originalPixels && ctx) {
          drawPixels(ctx, originalPixels, effectIntensityRef.current);
        }
      });
      resizeObserver.observe(container);

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        resizeObserver.disconnect();
      };
    }, [src, squareSize, gridGap, pixelShape, isHovering]);

    return (
      <div
        ref={containerRef}
        className={cn("relative h-full w-full", className)}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full rounded-full cursor-pointer bg-white/5"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        />
      </div>
    );
  }
);
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

export { Avatar, AvatarImage };
