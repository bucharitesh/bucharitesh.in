"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface FlickeringGridProps {
  size: number;
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  className?: string;
  maxOpacity?: number;
  defaultOpacity?: number;
  pixelShape?: 'square' | 'circle';
}

const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  size,
  squareSize = 3,
  gridGap = 2,
  flickerChance = 0.3,
  color = "rgb(0, 0, 0)",
  className,
  maxOpacity = 0.3,
  defaultOpacity = 0.1,
  pixelShape = 'square',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const memoizedColor = useMemo(() => {
    const toRGBA = (color: string) => {
      if (typeof window === "undefined") {
        return `rgba(0, 0, 0,`;
      }
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext("2d");
      if (!ctx) return "rgba(255, 0, 0,";
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
      return `rgba(${r}, ${g}, ${b},`;
    };
    return toRGBA(color);
  }, [color]);

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      const cols = Math.floor(size / (squareSize + gridGap));
      const rows = cols;

      const squares = new Float32Array(cols * rows);
      for (let i = 0; i < squares.length; i++) {
        squares[i] = defaultOpacity;
      }

      return {
        cols,
        rows,
        squares,
        dpr,
      };
    },
    [size, squareSize, gridGap, defaultOpacity],
  );

  const updateSquares = useCallback(
    (squares: Float32Array, deltaTime: number) => {
      if (isHovered) {
        for (let i = 0; i < squares.length; i++) {
          if (Math.random() < flickerChance * deltaTime) {
            squares[i] = Math.random() * (maxOpacity - defaultOpacity) + defaultOpacity;
          }
        }
      } else {
        for (let i = 0; i < squares.length; i++) {
          squares[i] = defaultOpacity;
        }
      }
    },
    [flickerChance, maxOpacity, defaultOpacity, isHovered],
  );

  const drawGrid = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      cols: number,
      rows: number,
      squares: Float32Array,
      dpr: number,
    ) => {
      ctx.clearRect(0, 0, size * dpr, size * dpr);
      ctx.fillStyle = "transparent";
      ctx.fillRect(0, 0, size * dpr, size * dpr);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const opacity = squares[i * rows + j];
          ctx.fillStyle = `${memoizedColor}${opacity})`;
          const x = i * (squareSize + gridGap) * dpr;
          const y = j * (squareSize + gridGap) * dpr;
          if (pixelShape === 'square') {
            ctx.fillRect(
              x,
              y,
              squareSize * dpr,
              squareSize * dpr,
            );
          } else {
            ctx.beginPath();
            ctx.arc(
              x + (squareSize * dpr) / 2,
              y + (squareSize * dpr) / 2,
              (squareSize * dpr) / 2,
              0,
              2 * Math.PI
            );
            ctx.fill();
          }
        }
      }
    },
    [memoizedColor, squareSize, gridGap, size, pixelShape],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let { cols, rows, squares, dpr } = setupCanvas(canvas);

    let lastTime = 0;
    const animate = (time: number) => {
      if (!isInView) return;

      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      updateSquares(squares, deltaTime);
      drawGrid(ctx, cols, rows, squares, dpr);
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      ({ cols, rows, squares, dpr } = setupCanvas(canvas));
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(canvas);

    window.addEventListener("resize", handleResize);

    if (isInView) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [setupCanvas, updateSquares, drawGrid, size]);

  return (
    <canvas
      ref={canvasRef}
      className={`size-full ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      width={size}
      height={size}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
};

export default FlickeringGrid;