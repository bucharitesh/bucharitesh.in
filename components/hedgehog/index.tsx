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

const HedgehogBuddy = React.forwardRef<HTMLDivElement, HedgehogBuddyProps>(
  function HedgehogBuddy(
    {
      onActorLoaded,
      onClick: _onClick,
      onPositionChange,
      hedgehogConfig: userConfig,
      static: staticMode,
    },
    ref
  ): JSX.Element {
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [isMounted, setIsMounted] = useState(false);
    const [_, setLoopTrigger] = useState(0);
    const actorRef = useRef<HedgehogActor>();

    // Merge default config with user config
    const mergedConfig = {
      ...defaultConfig,
      ...userConfig,
    };

    // Initialize window size and mounted state
    useEffect(() => {
      setIsMounted(true);

      const updateWindowSize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      updateWindowSize();
      window.addEventListener("resize", updateWindowSize);
      return () => window.removeEventListener("resize", updateWindowSize);
    }, []);

    // Initialize actor with config
    useEffect(() => {
      if (!isMounted || windowSize.width === 0) return;

      if (!actorRef.current) {
        actorRef.current = new HedgehogActor(
          windowSize.width,
          windowSize.height
        );
        actorRef.current.hedgehogConfig = mergedConfig;
        onActorLoaded?.(actorRef.current);
      }

      const cleanup = actorRef.current.setupKeyboardListeners();
      return () => {
        cleanup();
      };
    }, [isMounted, windowSize.width, mergedConfig]);

    // Animation loop
    useEffect(() => {
      if (!isMounted || !actorRef.current) return;

      let timer: NodeJS.Timeout | null = null;
      let isRunning = true;

      const loop = (): void => {
        if (!isRunning || !actorRef.current) return;

        actorRef.current.update(windowSize.width, windowSize.height);
        setLoopTrigger((x) => x + 1);
        timer = setTimeout(loop, 1000 / FPS);
      };

      loop();

      return () => {
        isRunning = false;
        if (timer) clearTimeout(timer);
      };
    }, [isMounted, windowSize]);

    // Update config when it changes
    useEffect(() => {
      if (!actorRef.current) return;

      actorRef.current.hedgehogConfig = mergedConfig;
      actorRef.current.setAnimation(
        mergedConfig.walking_enabled ? "walk" : "stop"
      );
    }, [mergedConfig]);

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

    const actor = actorRef.current;

    const onClick = (): void => {
      if (!actor.isDragging) {
        _onClick?.(actor);
      }
    };

    if (windowSize.width < 748 || windowSize.height < 400) return <></>;
    
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
            {}
          )}
          onMouseDown={() => {
            let moved = false;
            const onMouseMove = (e: MouseEvent): void => {
              moved = true;
              actor.isDragging = true;
              actor.setAnimation("fall");
              actor.x = e.clientX - SPRITE_SIZE / 2;
              actor.y = windowSize.height - e.clientY - SPRITE_SIZE / 2;
            };

            const onWindowUp = (): void => {
              if (!moved) {
                onClick();
              }
              actor.isDragging = false;
              actor.setAnimation("fall");
              window.removeEventListener("mouseup", onWindowUp);
              window.removeEventListener("mousemove", onMouseMove);
            };
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onWindowUp);
          }}
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
                  backgroundImage: `url(${actor.mainAnimation.spriteInfo.img})`,
                  backgroundPosition: `-${(actor.mainAnimation.frame % X_FRAMES) * SPRITE_SIZE}px -${
                    Math.floor(actor.mainAnimation.frame / X_FRAMES) *
                    SPRITE_SIZE
                  }px`,
                  backgroundSize: `${(SPRITE_SIZE / SPRITE_SIZE) * X_FRAMES * 100}%`,
                  ...actor.mainAnimation.spriteInfo.style,
                }}
              />
            )}

            {actor.overlayAnimation && (
              <div
                className="absolute top-0 left-0 rendering-pixelated"
                style={{
                  width: SPRITE_SIZE,
                  height: SPRITE_SIZE,
                  backgroundImage: `url(${actor.overlayAnimation.spriteInfo.img})`,
                  backgroundPosition: `-${(actor.overlayAnimation.frame % X_FRAMES) * SPRITE_SIZE}px -${
                    Math.floor(actor.overlayAnimation.frame / X_FRAMES) *
                    SPRITE_SIZE
                  }px`,
                  ...actor.overlayAnimation.spriteInfo.style,
                }}
              />
            )}
          </div>
        </div>

        {actor.renderRope()}
      </>
    );
  }
);

export default HedgehogBuddy;
