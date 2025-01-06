import { defaultConfig, FPS, GRAVITY_PIXELS, MAX_JUMP_COUNT, overlayAnimations, SPRITE_SIZE, standardAnimations } from "./config";
import { AnimationState, Box, HedgehogConfig, SpriteInfo } from "./types";
import { elementToBox, range, sampleOne, shouldIgnoreInput, spriteUrl } from "./utils";

export class HedgehogActor {
  element?: HTMLDivElement | null;
  direction: "left" | "right" = "right";
  x = 0;
  y = 0;
  followMouse = false;
  lastKnownMousePosition: [number, number] | null = null;
  isDragging = false;
  isControlledByUser = false;
  yVelocity = -30;
  xVelocity = 1; // Start with positive velocity to walk right
  ground: Element | null = null;
  jumpCount = 0;
  mainAnimation: AnimationState | null = null;
  overlayAnimation: AnimationState | null = null;
  gravity = GRAVITY_PIXELS;
  ignoreGroundAboveY?: number;
  static = false;
  lastScreenPosition = [window.screenX, window.screenY + window.innerHeight];

  hedgehogConfig: HedgehogConfig = defaultConfig;

  constructor() {
    this.x = Math.min(
      Math.max(0, Math.floor(Math.random() * window?.innerWidth)),
      window.innerWidth - SPRITE_SIZE
    );
    this.y = Math.min(
      Math.max(0, Math.floor(Math.random() * window?.innerHeight)),
      window?.innerHeight - SPRITE_SIZE
    );
    this.preloadAnimationSprites();
    this.setAnimation("fall");
  }

  animations(): { [key: string]: SpriteInfo } {
    return standardAnimations;
  }

  preloadAnimationSprites(): void {
    Object.values(this.animations()).forEach((animation) => {
      const preload = document.createElement("link");
      preload.rel = "preload";
      preload.as = "image";
      preload.href = spriteUrl(animation.img);
      document.head.appendChild(preload);
    });
  }

  setupKeyboardListeners(): () => void {
    const lastKeys: string[] = [];

    const secretMap: {
      keys: string[];
      action: () => void;
    }[] = [
      {
        keys: ["f", "f", "f"],
        action: () => {
          this.setOnFire();
        },
      },
      {
        keys: ["f", "i", "r", "e"],
        action: () => this.setOnFire(),
      },
      {
        keys: [
          "arrowup",
          "arrowup",
          "arrowdown",
          "arrowdown",
          "arrowleft",
          "arrowright",
          "arrowleft",
          "arrowright",
          "b",
          "a",
        ],
        action: () => {
          this.setOnFire();
          this.gravity = -2;

          setTimeout(() => {
            this.gravity = GRAVITY_PIXELS;
          }, 2000);
        },
      },
    ];

    const keyDownListener = (e: KeyboardEvent): void => {
      if (shouldIgnoreInput(e) || !this.hedgehogConfig.controls_enabled) {
        return;
      }

      const key = e.key.toLowerCase();

      lastKeys.push(key);
      if (lastKeys.length > 20) {
        lastKeys.shift();
      }

      if ([" ", "w", "arrowup"].includes(key)) {
        this.jump();
      }

      secretMap.forEach((secret) => {
        if (
          lastKeys.slice(-secret.keys.length).join("") === secret.keys.join("")
        ) {
          secret.action();
          lastKeys.splice(-secret.keys.length);
        }
      });

      if (["arrowdown", "s"].includes(key)) {
        if (this.ground === document.body) {
          if (this.mainAnimation?.name !== "wave") {
            this.setAnimation("wave");
          }
        } else if (this.ground) {
          const box = elementToBox(this.ground);
          this.ignoreGroundAboveY = box.y + box.height - SPRITE_SIZE;
          this.ground = null;
          this.setAnimation("fall");
        }
      }

      if (["arrowleft", "a", "arrowright", "d"].includes(key)) {
        this.isControlledByUser = true;
        if (this.mainAnimation?.name !== "walk") {
          this.setAnimation("walk");
        }

        this.direction = ["arrowleft", "a"].includes(key) ? "left" : "right";
        this.xVelocity = this.direction === "left" ? -5 : 5;

        const moonwalk = e.shiftKey;
        if (moonwalk) {
          this.direction = this.direction === "left" ? "right" : "left";
          // Moonwalking is hard so he moves slightly slower of course
          this.xVelocity *= 0.8;
        }
      }
    };

    const keyUpListener = (e: KeyboardEvent): void => {
      if (shouldIgnoreInput(e) || !this.hedgehogConfig.controls_enabled) {
        return;
      }

      const key = e.key.toLowerCase();

      if (["arrowleft", "a", "arrowright", "d"].includes(key)) {
        this.setAnimation("stop", {
          iterations: FPS * 2,
        });
        this.isControlledByUser = false;
      }
    };

    window.addEventListener("keydown", keyDownListener);
    window.addEventListener("keyup", keyUpListener);

    return () => {
      window.removeEventListener("keydown", keyDownListener);
      window.removeEventListener("keyup", keyUpListener);
    };
  }

  // Animation methods
  setAnimation(animationName: string, options?: Partial<AnimationState>): void {
    const availableAnimations = this.animations();
    animationName = availableAnimations[animationName] ? animationName : "stop";
    const spriteInfo = availableAnimations[animationName];

    this.mainAnimation = {
      name: animationName,
      frame: 0,
      iterations: spriteInfo.maxIteration ?? null,
      spriteInfo,
      onComplete: options?.onComplete,
    };

    // Set a random number of iterations or infinite for certain situations
    this.mainAnimation.iterations =
      options?.iterations ??
      (spriteInfo.maxIteration
        ? Math.max(1, Math.floor(Math.random() * spriteInfo.maxIteration))
        : null);

    if (animationName === "walk") {
      this.xVelocity = this.direction === "left" ? -1 : 1;
    } else if (animationName === "stop" && !this.isControlledByUser) {
      this.xVelocity = 0;
    }

    if ((window as any)._posthogDebugHedgehog) {
      const duration =
        this.mainAnimation.iterations !== null
          ? this.mainAnimation.iterations * spriteInfo.frames * (1000 / FPS)
          : "∞";
    }
  }

  setOverlayAnimation(
    animationName: string | null,
    options?: {
      onComplete: () => boolean | void;
    }
  ): void {
    if (!animationName) {
      this.overlayAnimation = null;
      return;
    }

    const spriteInfo = overlayAnimations[animationName];
    if (!spriteInfo) return;

    this.overlayAnimation = {
      name: animationName,
      frame: 0,
      iterations: 1,
      spriteInfo,
      onComplete: options?.onComplete ?? (() => this.setOverlayAnimation(null)),
    };
  }

  setRandomAnimation(): void {
    if (this.mainAnimation?.name !== "stop") {
      this.setAnimation("stop");
    } else {
      let randomChoiceList = Object.keys(this.animations()).reduce(
        (acc, key) => {
          return [
            ...acc,
            ...range(this.animations()[key].randomChance || 0).map(() => key),
          ] as any[];
        },
        [] as any[]
      );

      randomChoiceList = this.hedgehogConfig.walking_enabled
        ? randomChoiceList
        : randomChoiceList.filter((x) => x !== "walk");
      this.setAnimation(sampleOne(randomChoiceList));
    }
  }

  jump(): void {
    if (this.jumpCount >= MAX_JUMP_COUNT) {
      return;
    }
    this.ground = null;
    this.jumpCount += 1;
    this.yVelocity = this.gravity * 5;
  }

  update(): void {
    // Get the velocity of the screen changing
    const screenPosition = [
      window.screenX,
      window.screenY + window.innerHeight,
    ];

    const [screenMoveX, screenMoveY] = [
      screenPosition[0] - this.lastScreenPosition[0],
      screenPosition[1] - this.lastScreenPosition[1],
    ];

    this.lastScreenPosition = screenPosition;

    if (screenMoveX || screenMoveY) {
      this.ground = null;
      // Offset the hedgehog by the screen movement
      this.x -= screenMoveX;
      // Add the screen movement to the y velocity
      this.y += screenMoveY;
      // Bit of a hack but it works to avoid the moving screen affecting the hedgehog
      this.ignoreGroundAboveY = -10000;

      if (screenMoveY < 0) {
        // If the ground has moved up relative to the hedgehog we need to make him jump
        this.yVelocity = Math.max(
          this.yVelocity + screenMoveY * 10,
          -this.gravity * 20
        );
      }

      if (screenMoveX !== 0) {
        if (this.mainAnimation?.name !== "stop") {
          this.setAnimation("stop");
        }
        // Somewhat random numbers here to find what felt fun
        this.xVelocity = Math.max(
          Math.min(this.xVelocity + screenMoveX * 10, 200),
          -200
        );
      }
    }

    this.applyVelocity();

    if (this.mainAnimation) {
      // Ensure we are falling or not
      if (this.mainAnimation.name === "fall" && !this.isFalling()) {
        this.setAnimation("stop");
      }

      this.mainAnimation.frame++;

      if (this.mainAnimation.frame >= this.mainAnimation.spriteInfo.frames) {
        this.mainAnimation.frame = 0;
        // End of the animation
        if (this.mainAnimation.iterations !== null) {
          this.mainAnimation.iterations -= 1;
        }

        if (this.mainAnimation.iterations === 0) {
          this.mainAnimation.iterations = null;
          // End of the animation, set the next one

          const preventNextAnimation = this.mainAnimation.onComplete?.();

          if (!preventNextAnimation) {
            if (this.static) {
              this.setAnimation("stop");
            } else {
              this.setRandomAnimation();
            }
          }
        }
      }
    }

    if (this.overlayAnimation) {
      this.overlayAnimation.frame++;

      if (
        this.overlayAnimation.frame >= this.overlayAnimation.spriteInfo.frames
      ) {
        this.overlayAnimation.frame = 0;
        // End of the animation
        if (this.overlayAnimation.iterations !== null) {
          this.overlayAnimation.iterations -= 1;
        }

        if (this.overlayAnimation.iterations === 0) {
          this.overlayAnimation.iterations = null;
          this.overlayAnimation.onComplete?.();
        }
      }
    }

    if (this.isDragging) {
      return;
    }

    this.x = this.x + this.xVelocity;

    if (this.x < 0) {
      this.x = 0;
      if (!this.isControlledByUser) {
        this.xVelocity = -this.xVelocity;
        this.direction = "right";
      }
    }

    if (this.x > window.innerWidth - SPRITE_SIZE) {
      this.x = window.innerWidth - SPRITE_SIZE;
      if (!this.isControlledByUser) {
        this.xVelocity = -this.xVelocity;
        this.direction = "left";
      }
    }
  }

  private applyVelocity(): void {
    if (this.isDragging) {
      this.ground = null;
      return;
    }

    if (this.followMouse) {
      this.ground = null;
      const [clientX, clientY] = this.lastKnownMousePosition ?? [0, 0];

      const xDiff = clientX - this.x;
      const yDiff = window.innerHeight - clientY - this.y;

      const distance = Math.sqrt(xDiff ** 2 + yDiff ** 2);
      const speed = 3;
      const ratio = speed / distance;

      if (yDiff < 0) {
        this.yVelocity -= this.gravity;
      }

      this.yVelocity += yDiff * ratio;
      this.xVelocity += xDiff * ratio;
      this.y = this.y + this.yVelocity;
      if (this.y < 0) {
        this.y = 0;
        this.yVelocity = -this.yVelocity * 0.4;
      }
      this.x = this.x + this.xVelocity;
      this.direction = this.xVelocity > 0 ? "right" : "left";

      return;
    }

    this.ground = this.findGround();
    this.yVelocity -= this.gravity;

    // We decelerate the x velocity if the hedgehog is stopped
    if (
      !this.isControlledByUser &&
      this.mainAnimation?.name !== "walk" &&
      this.onGround()
    ) {
      this.xVelocity = this.xVelocity * 0.6;
    }

    let newY = this.y + this.yVelocity;

    if (this.yVelocity < 0) {
      // We are falling - detect ground
      const groundBoundingRect = elementToBox(this.ground);
      const groundY = groundBoundingRect.y + groundBoundingRect.height;

      if (newY <= groundY) {
        newY = groundY;
        this.yVelocity = -this.yVelocity * 0.4;

        // Clear flags as we have hit the ground
        this.ignoreGroundAboveY = undefined;
        this.jumpCount = 0;
      }
    } else {
      // If we are going up we can reset the ground
      this.ground = null;
    }

    this.y = newY;
  }

  private findGround(): Element {
    // We reset the ground when he is moved or x changes

    if (
      !this.hedgehogConfig.interactions_enabled ||
      !this.element ||
      this.y <= 0
    ) {
      return document.body;
    }

    const hedgehogBox = elementToBox(this.element);

    if (this.ground && this.ground !== document.body) {
      // Check if the current ground is still valid - if so we stick with it to stop flickering
      const groundBoundingRect = elementToBox(this.ground);

      if (
        hedgehogBox.x + hedgehogBox.width > groundBoundingRect.x &&
        hedgehogBox.x < groundBoundingRect.x + groundBoundingRect.width &&
        // Check still on screen
        groundBoundingRect.y + groundBoundingRect.height + hedgehogBox.height <
          window.innerHeight &&
        groundBoundingRect.y >= 0
      ) {
        // We are still on the same ground
        return this.ground;
      }
    }

    // Only calculate block bounding rects once we need to
    const blocksWithBoxes: [Element, Box][] = Array.from(
      document.querySelectorAll(
        ".border, .border-t, .LemonButton--primary, .LemonButton--secondary:not(.LemonButton--status-alt:not(.LemonButton--active)), .LemonInput, .LemonSelect, .LemonTable, .HedgehogBuddy"
      )
    )
      .filter((x) => x !== this.element)
      .map((block) => [block, elementToBox(block)]);

    // The highest candidate is our new ground
    let highestCandidate: [Element, Box] | null = null;

    blocksWithBoxes.forEach(([block, box]) => {
      if (box.y + box.height > window.innerHeight || box.y < 0) {
        return;
      }

      if (
        this.ignoreGroundAboveY &&
        box.y + box.height > this.ignoreGroundAboveY
      ) {
        return;
      }

      const isAboveOrOn =
        hedgehogBox.x + hedgehogBox.width > box.x &&
        hedgehogBox.x < box.x + box.width &&
        hedgehogBox.y >= box.y + box.height;

      if (isAboveOrOn) {
        if (!highestCandidate || box.y > highestCandidate[1].y) {
          highestCandidate = [block, box];
        }
      }
    });

    return highestCandidate?.[0] ?? document.body;
  }

  private onGround(): boolean {
    if (this.static) {
      return true;
    }
    if (this.ground) {
      const groundLevel =
        elementToBox(this.ground).y + elementToBox(this.ground).height;
      return this.y <= groundLevel;
    }

    return false;
  }

  setOnFire(times = 3): void {
    this.setOverlayAnimation("fire", {
      onComplete: () => {
        if (times == 1) {
          this.setOverlayAnimation(null);
        } else {
          this.setOnFire(times - 1);
        }
      },
    });

    this.setAnimation("stop", {});
    this.direction = sampleOne(["left", "right"]);
    this.xVelocity = this.direction === "left" ? -5 : 5;
    this.jump();
  }

  updateAnimation(): void {
    // Handle main animation
    if (this.mainAnimation) {
      // Check for falling to walking transition
      if (this.mainAnimation.name === "fall" && !this.isFalling()) {
        this.setAnimation("walk");
        return;
      }

      // Increment frame
      this.mainAnimation.frame++;

      // Handle frame overflow and animation completion
      if (this.mainAnimation.frame >= this.mainAnimation.spriteInfo.frames) {
        // For walking animation, just loop the frames
        if (this.mainAnimation.name === "walk") {
          this.mainAnimation.frame = 0;
        } else {
          // For non-walking animations, handle iterations
          if (this.mainAnimation.iterations !== null) {
            this.mainAnimation.iterations--;

            // If iterations complete, decide next animation
            if (this.mainAnimation.iterations === 0) {
              const preventNextAnimation = this.mainAnimation.onComplete?.();
              if (!preventNextAnimation) {
                if (this.static) {
                  this.setAnimation("stop");
                } else {
                  // Return to walking as default behavior
                  this.setAnimation("walk");
                }
              }
            } else {
              // Reset frame for next iteration
              this.mainAnimation.frame = 0;
            }
          } else {
            // Reset frame for infinite animations
            this.mainAnimation.frame = 0;
          }
        }
      }
    }

    // Handle overlay animation independently
    if (this.overlayAnimation) {
      this.overlayAnimation.frame++;

      if (
        this.overlayAnimation.frame >= this.overlayAnimation.spriteInfo.frames
      ) {
        if (this.overlayAnimation.iterations !== null) {
          this.overlayAnimation.iterations--;
        }

        if (this.overlayAnimation.iterations === 0) {
          this.overlayAnimation.onComplete?.();
        } else {
          this.overlayAnimation.frame = 0;
        }
      }
    }
  }

  private isFalling(): boolean {
    return !this.onGround() && Math.abs(this.yVelocity) > 1;
  }
}