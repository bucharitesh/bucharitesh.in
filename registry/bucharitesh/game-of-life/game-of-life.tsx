'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';

interface GameOfLifeProps
  extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  size?: number;
  interval?: number;
  backgroundColor?: string;
  cellColor?: string;
  density?: number; // Value between 0 and 1, default 0.1 (10% cells alive)
}

const GameOfLife = React.forwardRef<HTMLCanvasElement, GameOfLifeProps>(
  (
    {
      className,
      size = 12,
      interval = 150,
      backgroundColor = '#000000',
      cellColor = '#1e1e1e',
      density = 0.1,
      ...props
    },
    ref
  ) => {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const frameRef = React.useRef<number>(0);
    const gridRef = React.useRef<boolean[][]>([]);
    const lastUpdateRef = React.useRef<number>(0);
    const transitionRef = React.useRef<{
      from: boolean[][];
      to: boolean[][];
      progress: number;
    } | null>(null);
    const [isReady, setIsReady] = React.useState(false);
    const isInitialRender = React.useRef(true);

    React.useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      const parent = canvas.parentElement;
      if (!parent) return;

      // Keep size constant
      const cellSize = size;
      let width = parent.clientWidth;
      let height = parent.clientHeight;
      let cols = Math.floor(width / cellSize);
      let rows = Math.floor(height / cellSize);

      const createGrid = (): boolean[][] => {
        const parent = canvas.parentElement;
        if (!parent)
          return Array.from({ length: cols }, () =>
            new Array(rows).fill(false)
          );

        width = parent.clientWidth;
        height = parent.clientHeight;
        cols = Math.floor(width / cellSize);
        rows = Math.floor(height / cellSize);

        // Update canvas size to match parent
        canvas.width = width;
        canvas.height = height;

        // Create a random initial pattern based on density prop
        const grid = Array.from({ length: cols }, () =>
          Array.from({ length: rows }, () => Math.random() < density)
        );

        return grid;
      };

      const updateGrid = (grid: boolean[][]): boolean[][] => {
        const next: boolean[][] = Array.from({ length: cols }, () =>
          new Array(rows).fill(false)
        );

        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            let neighbors = 0;

            for (let dx = -1; dx <= 1; dx++) {
              for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                const nx = (i + dx + cols) % cols;
                const ny = (j + dy + rows) % rows;
                neighbors += grid[nx][ny] ? 1 : 0;
              }
            }

            next[i][j] = neighbors === 3 || (grid[i][j] && neighbors === 2);
          }
        }

        return next;
      };

      const interpolateGrids = (fromGrid: boolean[][], toGrid: boolean[][]) => {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);

        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const fromState = fromGrid[i][j];
            const toState = toGrid[i][j];

            if (fromState || toState) {
              ctx.fillStyle = cellColor;
              ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
            }
          }
        }
      };

      const render = (grid: boolean[][]) => {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = cellColor;

        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            if (grid[i][j]) {
              ctx.fillRect(i * size, j * size, size, size);
            }
          }
        }
      };

      const startTransition = (fromGrid: boolean[][], toGrid: boolean[][]) => {
        transitionRef.current = {
          from: fromGrid.map((row) => [...row]),
          to: toGrid.map((row) => [...row]),
          progress: 0,
        };
      };

      const animate = (timestamp: number) => {
        if (timestamp - lastUpdateRef.current >= interval) {
          if (gridRef.current) {
            const nextGrid = updateGrid(gridRef.current);
            startTransition(gridRef.current, nextGrid);
            gridRef.current = nextGrid;
          }
          lastUpdateRef.current = timestamp;
        }

        if (transitionRef.current) {
          const { from, to } = transitionRef.current;
          interpolateGrids(from, to);

          transitionRef.current.progress += 0.1;
          if (transitionRef.current.progress >= 1) {
            transitionRef.current = null;
            render(gridRef.current);
          }
        }

        frameRef.current = requestAnimationFrame(animate);
      };

      let resizeTimeout: NodeJS.Timeout;
      const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          const parent = canvasRef.current?.parentElement;
          if (!parent) return;

          setIsReady(false);
          const newGrid = createGrid();

          if (gridRef.current) {
            startTransition(gridRef.current, newGrid);
          }

          gridRef.current = newGrid;
          setTimeout(() => setIsReady(true), 50);
        }, 250);
      };

      gridRef.current = createGrid();
      lastUpdateRef.current = performance.now();
      frameRef.current = requestAnimationFrame(animate);
      window.addEventListener('resize', handleResize);
      setIsReady(true);
      isInitialRender.current = false;

      return () => {
        cancelAnimationFrame(frameRef.current);
        window.removeEventListener('resize', handleResize);
        clearTimeout(resizeTimeout);
      };
    }, [size, interval, backgroundColor, cellColor]);

    return (
      <canvas
        ref={React.useMemo(
          () => (node: HTMLCanvasElement | null) => {
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
            canvasRef.current = node;
          },
          [ref]
        )}
        className={cn(
          'absolute inset-0 h-full w-full transition-opacity duration-500',
          isReady ? 'opacity-100' : 'opacity-0',
          className
        )}
        {...props}
      />
    );
  }
);

GameOfLife.displayName = 'GameOfLife';

export { GameOfLife };
export type { GameOfLifeProps };
