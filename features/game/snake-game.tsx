'use client';

import { cn } from '@/lib/utils';
import { Crown } from 'lucide-react';
import React, { useState, useEffect, useCallback, useRef } from 'react';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const GAME_SIZE = GRID_SIZE * CELL_SIZE;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];
const INITIAL_DIRECTION = 'RIGHT';
const GAME_SPEED = 150;

interface SnakeGameProps extends React.HTMLAttributes<HTMLDivElement> {}

const SnakeGame = React.forwardRef<HTMLDivElement, SnakeGameProps>(
  ({ className, ...props }, ref) => {
    const [gameStarted, setGameStarted] = useState(false);
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [direction, setDirection] = useState(INITIAL_DIRECTION);
    const [food, setFood] = useState({ x: 15, y: 15 });
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    // Touch handling
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const gameLoopRef = useRef<any>(null);

    const generateFood = useCallback(() => {
      const newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };

      const isOnSnake = snake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      );

      if (isOnSnake) {
        return generateFood();
      }

      return newFood;
    }, [snake]);

    const handleKeyPress = useCallback(
      (event: KeyboardEvent) => {
        if (!isFocused || !gameStarted || gameOver || !document.hasFocus()) {
          return;
        }

        switch (event.key) {
          case 'ArrowUp':
            if (direction !== 'DOWN') {
              setDirection('UP');
            }
            break;
          case 'ArrowDown':
            if (direction !== 'UP') {
              setDirection('DOWN');
            }
            break;
          case 'ArrowLeft':
            if (direction !== 'RIGHT') {
              setDirection('LEFT');
            }
            break;
          case 'ArrowRight':
            if (direction !== 'LEFT') {
              setDirection('RIGHT');
            }
            break;
          case ' ':
            setIsPaused((prev) => !prev);
            break;
          default:
            break;
        }
      },
      [direction, gameOver, gameStarted, isFocused]
    );

    const handleTouchStart = (e: React.TouchEvent) => {
      if (!gameStarted || gameOver) return;
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
      if (!gameStarted || gameOver) return;

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;

      const deltaX = touchEndX - touchStartX.current;
      const deltaY = touchEndY - touchStartY.current;

      // Require minimum swipe distance
      const minSwipeDistance = 30;

      if (
        Math.abs(deltaX) < minSwipeDistance &&
        Math.abs(deltaY) < minSwipeDistance
      ) {
        return;
      }

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 0 && direction !== 'LEFT') {
          setDirection('RIGHT');
        } else if (deltaX < 0 && direction !== 'RIGHT') {
          setDirection('LEFT');
        }
      } else {
        // Vertical swipe
        if (deltaY > 0 && direction !== 'UP') {
          setDirection('DOWN');
        } else if (deltaY < 0 && direction !== 'DOWN') {
          setDirection('UP');
        }
      }
    };

    const moveSnake = useCallback(() => {
      if (!gameStarted || gameOver || isPaused || !isFocused) return;

      const newSnake = [...snake];
      const head = { ...newSnake[0] };

      switch (direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
        default:
          break;
      }

      if (head.x < 0) {
        head.x = GRID_SIZE - 1;
      } else if (head.x >= GRID_SIZE) {
        head.x = 0;
      }

      if (head.y < 0) {
        head.y = GRID_SIZE - 1;
      } else if (head.y >= GRID_SIZE) {
        head.y = 0;
      }

      if (
        newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
      ) {
        setGameOver(true);
        setHighScore((prev) => Math.max(prev, score));
        return;
      }

      newSnake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => prev + 1);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    }, [
      snake,
      direction,
      food,
      gameOver,
      isPaused,
      generateFood,
      gameStarted,
      score,
      isFocused,
    ]);

    const resetGame = () => {
      setSnake(INITIAL_SNAKE);
      setDirection(INITIAL_DIRECTION);
      setFood(generateFood());
      setGameOver(false);
      setScore(0);
      setIsPaused(false);
      setGameStarted(false);
    };

    const startGame = () => {
      if (!gameStarted && !gameOver) {
        setGameStarted(true);
        containerRef.current?.focus();
      } else if (gameOver) {
        resetGame();
      }
    };

    // Handle focus events
    const handleFocus = () => {
      setIsFocused(true);
      setIsPaused(false);
    };

    const handleBlur = () => {
      setIsFocused(false);
      setIsPaused(true);
    };

    // Set up game loop and keyboard listeners
    useEffect(() => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }

      gameLoopRef.current = setInterval(moveSnake, GAME_SPEED);

      return () => {
        if (gameLoopRef.current) {
          clearInterval(gameLoopRef.current);
        }
      };
    }, [moveSnake]);

    // Handle keyboard events
    useEffect(() => {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]);

    // Handle window focus/blur
    useEffect(() => {
      const handleWindowBlur = () => {
        setIsPaused(true);
        setIsFocused(false);
      };

      const handleWindowFocus = () => {
        if (containerRef.current === document.activeElement) {
          setIsFocused(true);
          setIsPaused(false);
        }
      };

      window.addEventListener('blur', handleWindowBlur);
      window.addEventListener('focus', handleWindowFocus);

      return () => {
        window.removeEventListener('blur-sm', handleWindowBlur);
        window.removeEventListener('focus', handleWindowFocus);
      };
    }, []);

    const containerStyle = {
      width: GAME_SIZE,
      height: GAME_SIZE,
    };

    if (!gameStarted) {
      return (
        <div
          ref={containerRef}
          className={cn(
            'relative flex cursor-pointer flex-col items-center rounded-lg border bg-muted outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2',
            className
          )}
          style={containerStyle}
          onClick={startGame}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        >
          <div className="absolute top-1/4 flex flex-col items-center gap-2">
            <Crown className="text-yellow-400" size={32} />
            <div className="font-bold text-foreground text-xl">
              High Score: {highScore}
            </div>
          </div>

          <div className="absolute bottom-1/4 font-medium text-foreground text-lg">
            Tap to start
          </div>
        </div>
      );
    }

    return (
      <div
        ref={containerRef}
        className={cn(
          'relative rounded-lg border bg-muted outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2',
          className
        )}
        style={containerStyle}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        {...props}
      >
        {/* Food */}
        <div
          className="absolute rounded-full bg-destructive"
          style={{
            width: CELL_SIZE - 2,
            height: CELL_SIZE - 2,
            left: food.x * CELL_SIZE + 1,
            top: food.y * CELL_SIZE + 1,
          }}
        />

        {/* Snake */}
        {snake.map((segment, index) => (
          <div
            key={index}
            className="absolute rounded-full bg-foreground"
            style={{
              width: CELL_SIZE - 4,
              height: CELL_SIZE - 4,
              left: segment.x * CELL_SIZE + 2,
              top: segment.y * CELL_SIZE + 2,
            }}
          />
        ))}

        {/* Game Over Overlay */}
        {gameOver && (
          <div
            className="absolute inset-0 flex cursor-pointer items-center justify-center bg-background/80 backdrop-blur-xs"
            onClick={resetGame}
          >
            <div className="text-center">
              <h2 className="mb-4 font-bold text-2xl text-foreground">
                Game Over!
              </h2>
              <p className="mb-4 text-foreground text-xl">Score: {score}</p>
              <p className="mb-4 text-foreground text-xl">
                High Score: {highScore}
              </p>
              <p className="text-lg text-muted-foreground">Tap to play again</p>
            </div>
          </div>
        )}

        {/* Pause Overlay */}
        {(isPaused || !isFocused) && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-xs">
            <div className="text-center">
              <div className="mb-2 font-bold text-2xl text-foreground">
                PAUSED
              </div>
              {!isFocused && (
                <div className="text-muted-foreground text-sm">
                  Click to resume
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

SnakeGame.displayName = 'SnakeGame';

export { SnakeGame };
