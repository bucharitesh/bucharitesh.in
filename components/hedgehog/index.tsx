"use client";

import clsx from "clsx";
import React, { useState, useRef, useEffect } from "react";
import {
  FPS,
  SPRITE_SIZE,
  SHADOW_HEIGHT,
  X_FRAMES,
  defaultConfig,
} from "./config";
import { HedgehogBuddyProps } from "./types";
import { HedgehogActor } from "./actor";
import { spriteOverlayUrl, spriteUrl } from "./utils";

const HedgehogBuddy = React.forwardRef<HTMLDivElement, HedgehogBuddyProps>(
  function HedgehogBuddy(
    {
      onActorLoaded,
      onClick: _onClick,
      onPositionChange,
      hedgehogConfig: userConfig,
      static: staticMode,
    },
    ref,
  ): JSX.Element {
    const [isMounted, setIsMounted] = useState(false);
    const actorRef = useRef<HedgehogActor>();

    if (!actorRef.current) {
      actorRef.current = new HedgehogActor();
      onActorLoaded?.(actorRef.current);
    }

    const actor = actorRef.current;

    const [_, setTimerLoop] = useState(0);

    // Initialize window size and mounted state
    useEffect(() => {
      setIsMounted(true);
    }, []);

    // Initialize actor with config
    useEffect(() => {
      if (!isMounted) return;

      if (!actorRef.current) {
        actorRef.current = new HedgehogActor();
        onActorLoaded?.(actorRef.current);
      }

      const cleanup = actorRef.current.setupKeyboardListeners();
      return () => {
        cleanup();
      };
    }, [isMounted]);

    useEffect(() => {
      if (!isMounted || !actorRef.current) return;

      let timer: any = null;

      const loop = (): void => {
        actor.update();
        setTimerLoop((x) => x + 1);
        timer = setTimeout(loop, 1000 / FPS);
      };

      loop();
      return () => {
        clearTimeout(timer);
      };
    }, [isMounted]);

    // Handle static mode changes
    useEffect(() => {
      if (!actorRef.current) return;
      actorRef.current.static = staticMode ?? false;
    }, [staticMode]);

    // Handle drag state class
    useEffect(() => {
      if (!actorRef.current) return;

      if (actorRef.current.isDragging) {
        document.body.classList.add("select-none");
      } else {
        document.body.classList.remove("select-none");
      }

      return () => document.body.classList.remove("select-none");
    }, [actorRef.current?.isDragging]);

    // Handle position changes
    useEffect(() => {
      const actor = actorRef.current;
      if (actor) {
        onPositionChange?.(actor);
      }
    }, [actorRef.current?.x, actorRef.current?.y, actorRef.current?.direction]);

    if (!isMounted || !actorRef.current) return <></>;

    const onClick = (): void => {
      if (!actor.isDragging) {
        _onClick?.(actor);
      }
    };

    const onTouchOrMouseStart = (): void => {
      let moved = false;
      const lastPositions: [number, number, number][] = [];

      // In your move handler, store timestamp along with positions

      const onMove = (e: TouchEvent | MouseEvent): void => {
        moved = true;
        actor.isDragging = true;
        actor.setAnimation("fall");

        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
        const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

        actor.x = clientX - SPRITE_SIZE / 2;
        actor.y = window.innerHeight - clientY - SPRITE_SIZE / 2;

        lastPositions.push([clientX, clientY, Date.now()]);
      };

      const onEnd = (): void => {
        if (!moved) {
          onClick();
        }
        actor.isDragging = false;
        // get the velocity as an average of the last moves

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const relevantPositions = lastPositions.filter(([_x, _y, t]) => {
          // We only consider the last 500ms but not the last 100ms (to avoid delays in letting go)
          return t > Date.now() - 500 && t < Date.now() - 20;
        });

        const [xPixelsPerSecond, yPixelsPerSecond] = relevantPositions.reduce(
          ([x, y], [x2, y2, t2], i) => {
            if (i === 0) {
              return [0, 0];
            }
            const dt = (t2 - relevantPositions[i - 1][2]) / 1000;
            return [
              x + (x2 - relevantPositions[i - 1][0]) / dt,
              y + (y2 - relevantPositions[i - 1][1]) / dt,
            ];
          },

          [0, 0],
        );

        if (relevantPositions.length) {
          const maxVelocity = 250;
          actor.xVelocity = Math.min(
            maxVelocity,
            xPixelsPerSecond / relevantPositions.length / FPS,
          );
          actor.yVelocity = Math.min(
            maxVelocity,
            (yPixelsPerSecond / relevantPositions.length / FPS) * -1,
          );
        }

        actor.setAnimation("fall");
        window.removeEventListener("touchmove", onMove);
        window.removeEventListener("touchend", onEnd);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onEnd);
      };

      window.addEventListener("touchmove", onMove);
      window.addEventListener("touchend", onEnd);
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onEnd);
    };

    return (
      <>
        <div
          ref={(r) => {
            actor.element = r;
            if (r && typeof ref === "function") {
              ref(r);
            }
          }}
          className={clsx(
            "z-50 m-0 cursor-pointer after:absolute after:-z-10 after:w-0 after:h-0 after:overflow-hidden after:content-[attr(data-content)]",
            {},
          )}
          onTouchStart={actor.static ? undefined : () => onTouchOrMouseStart()}
          onMouseDown={actor.static ? undefined : () => onTouchOrMouseStart()}
          style={{
            position: actor.static ? "relative" : "fixed",
            left: actor.static ? undefined : actor.x,
            bottom: actor.static ? undefined : actor.y - SHADOW_HEIGHT * 0.5,
            transition: !actor.isDragging ? `all ${1000 / FPS}ms` : undefined,
            zIndex: 1001,
            cursor: "pointer",
          }}
        >
          <div
            style={{
              transform: `scaleX(${actor.direction === "right" ? 1 : -1})`,
            }}
          >
            {actor.mainAnimation && (
              <div
                className="rendering-pixelated"
                style={{
                  width: SPRITE_SIZE,
                  height: SPRITE_SIZE,
                  backgroundImage: `url(${spriteUrl(
                    actor.mainAnimation.spriteInfo.img,
                  )})`,
                  backgroundPosition: `-${(actor.mainAnimation.frame % X_FRAMES) * SPRITE_SIZE}px -${
                    Math.floor(actor.mainAnimation.frame / X_FRAMES) *
                    SPRITE_SIZE
                  }px`,
                  backgroundSize:
                    (SPRITE_SIZE / SPRITE_SIZE) * X_FRAMES * 100 + "%",
                  ...(actor.mainAnimation.spriteInfo.style ?? {}),
                }}
              />
            )}

            {actor.overlayAnimation && (
              <div
                className="absolute top-0 left-0 rendering-pixelated"
                style={{
                  width: SPRITE_SIZE,
                  height: SPRITE_SIZE,
                  backgroundImage: `url(${spriteOverlayUrl(actor.overlayAnimation.spriteInfo.img)})`,
                  backgroundPosition: `-${
                    (actor.overlayAnimation.frame % X_FRAMES) * SPRITE_SIZE
                  }px -${Math.floor(actor.overlayAnimation.frame / X_FRAMES) * SPRITE_SIZE}px`,
                  ...(actor.overlayAnimation.spriteInfo.style ?? {}),
                }}
              />
            )}
          </div>
        </div>
      </>
    );
  },
);

export default HedgehogBuddy;
