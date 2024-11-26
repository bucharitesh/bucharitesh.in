import { defaultConfig, FPS, GRAVITY_PIXELS, MAX_JUMP_COUNT, SPRITE_SIZE, standardAnimations } from "./config";
import { AnimationState, HedgehogConfig, SpriteInfo } from "./types";
import { elementToBox, range, sampleOne, shouldIgnoreInput } from "./utils";

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
  gravity = GRAVITY_PIXELS;
  ignoreGroundAboveY?: number;
  showTooltip = false;
  static = false;
  lastScreenPosition = [0, 0];

  mainAnimation: AnimationState | null = null;
  overlayAnimation: AnimationState | null = null;
  hedgehogConfig: HedgehogConfig = defaultConfig;
  tooltip?: JSX.Element;

  constructor(windowWidth: number, windowHeight: number) {
    this.x = Math.min(
      Math.max(0, Math.floor(Math.random() * windowWidth)),
      windowWidth - SPRITE_SIZE
    );
    this.y = Math.min(
      Math.max(0, Math.floor(Math.random() * windowHeight)),
      windowHeight - SPRITE_SIZE
    );
    this.lastScreenPosition = [
      window.screenX,
      window.screenY + window.innerHeight,
    ];

    this.setupInitialState();
    this.preloadAnimationSprites();
  }

  private setupInitialState(): void {
    // Start with controls enabled
    this.hedgehogConfig = {
      ...defaultConfig,
      walking_enabled: true,
      controls_enabled: true,
      interactions_enabled: true,
    };
  }

  animations(): { [key: string]: SpriteInfo } {
    return standardAnimations;
  }

  preloadAnimationSprites(): void {
    Object.values(this.animations()).forEach((animation) => {
      const preload = document.createElement("link");
      preload.rel = "preload";
      preload.as = "image";
      preload.href = animation.img;
      document.head.appendChild(preload);
    });
  }

  setupKeyboardListeners(): () => void {
    const lastKeys: string[] = [];

    const keyDownListener = (e: KeyboardEvent): void => {
      // Early return if controls are disabled
      if (!this.hedgehogConfig?.controls_enabled) return;
      if (shouldIgnoreInput(e)) return;

      const key = e.key.toLowerCase();
      lastKeys.push(key);
      if (lastKeys.length > 20) lastKeys.shift();

      // Handle jumps
      if ([" ", "w", "arrowup"].includes(key)) {
        e.preventDefault(); // Prevent page scrolling
        this.jump();
      }

      // Handle dropping/waving
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

      // Handle left/right movement
      if (["arrowleft", "a", "arrowright", "d"].includes(key)) {
        this.isControlledByUser = true;
        if (this.mainAnimation?.name !== "walk") {
          this.setAnimation("walk");
        }

        this.direction = ["arrowleft", "a"].includes(key) ? "left" : "right";
        this.xVelocity = this.direction === "left" ? -5 : 5;

        // Handle moonwalk
        if (e.shiftKey) {
          this.direction = this.direction === "left" ? "right" : "left";
          this.xVelocity *= 0.8;
        }
      }
    };

    const keyUpListener = (e: KeyboardEvent): void => {
      if (!this.hedgehogConfig?.controls_enabled) return;
      if (shouldIgnoreInput(e)) return;

      const key = e.key.toLowerCase();

      if (["arrowleft", "a", "arrowright", "d"].includes(key)) {
        this.setAnimation("stop", { iterations: FPS * 2 });
        this.isControlledByUser = false;
      }
    };

    // Add listeners
    window.addEventListener("keydown", keyDownListener);
    window.addEventListener("keyup", keyUpListener);

    // Return cleanup function
    return () => {
      window.removeEventListener("keydown", keyDownListener);
      window.removeEventListener("keyup", keyUpListener);
    };
  }

  // Animation methods
  setAnimation(animationName: string, options?: Partial<AnimationState>): void {
    const animations = this.animations();
    animationName = animations[animationName] ? animationName : "stop";
    const spriteInfo = animations[animationName];

    this.mainAnimation = {
      name: animationName,
      frame: 0,
      iterations:
        animationName === "walk" ? null : (spriteInfo.maxIteration ?? null), // Ensure null for walk
      spriteInfo,
      onComplete: options?.onComplete,
    };

    // Don't override iterations for walk animation
    if (animationName !== "walk") {
      this.mainAnimation.iterations =
        options?.iterations ??
        (spriteInfo.maxIteration
          ? Math.max(1, Math.floor(Math.random() * spriteInfo.maxIteration))
          : null);
    }

    // Only change direction if forced by animation
    if (spriteInfo.forceDirection) {
      this.direction = spriteInfo.forceDirection;
    }

    if (animationName === "walk" && !this.isControlledByUser) {
      // Keep consistent velocity for walking direction
      this.xVelocity = this.direction === "left" ? -1 : 1;
    } else if (animationName === "stop" && !this.isControlledByUser) {
      this.xVelocity = 0;
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

    const spriteInfo = standardAnimations[animationName];
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
    if (this.jumpCount >= MAX_JUMP_COUNT) return;

    this.ground = null;
    this.jumpCount += 1;
    this.yVelocity = this.gravity * 5;
  }

  update(windowWidth: number, windowHeight: number): void {
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
      this.handleScreenMovement(screenMoveX, screenMoveY);
    }

    this.applyPhysics(windowWidth, windowHeight);
    this.updateAnimation();
    this.updatePosition(windowWidth);
  }

  private handleScreenMovement(screenMoveX: number, screenMoveY: number): void {
    this.ground = null;
    this.x -= screenMoveX;
    this.y += screenMoveY;
    this.ignoreGroundAboveY = -10000;

    if (screenMoveY < 0) {
      this.yVelocity = Math.max(
        this.yVelocity + screenMoveY * 10,
        -this.gravity * 20
      );
    }

    if (screenMoveX !== 0) {
      if (this.mainAnimation?.name !== "stop") {
        this.setAnimation("stop");
      }
      this.xVelocity = Math.max(
        Math.min(this.xVelocity + screenMoveX * 10, 200),
        -200
      );
    }
  }

  private applyPhysics(windowWidth: number, windowHeight: number): void {
    if (this.isDragging) return;

    if (this.followMouse && this.lastKnownMousePosition) {
      this.applyMouseFollowing();
    } else {
      this.applyGravity(windowHeight);
    }

    this.handleBoundaries(windowWidth);
  }

  private applyMouseFollowing(): void {
    const [clientX, clientY] = this.lastKnownMousePosition!;
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
    this.y += this.yVelocity;
    this.x += this.xVelocity;
    this.direction = this.xVelocity > 0 ? "right" : "left";
  }

  private applyGravity(windowHeight: number): void {
    if (this.isDragging) return;

    this.yVelocity -= this.gravity;
    this.y += this.yVelocity;

    if (this.y <= 0) {
      this.y = 0;
      this.jumpCount = 0;
      this.yVelocity = -this.yVelocity * 0.4;

      if (Math.abs(this.yVelocity) < this.gravity) {
        this.yVelocity = 0;
      }
    }

    if (this.y > windowHeight - SPRITE_SIZE) {
      this.y = windowHeight - SPRITE_SIZE;
    }
  }

  private handleBoundaries(windowWidth: number): void {
    if (this.x < 0) {
      this.x = 0;
      if (!this.isControlledByUser) {
        this.xVelocity = -this.xVelocity;
        this.direction = "right";
      }
    }

    if (this.x > windowWidth - SPRITE_SIZE) {
      this.x = windowWidth - SPRITE_SIZE;
      if (!this.isControlledByUser) {
        this.xVelocity = -this.xVelocity;
        this.direction = "left";
      }
    }
  }

  private updatePosition(windowWidth: number): void {
    if (this.isDragging) return;

    this.x += this.xVelocity;

    // Boundary checks
    if (this.x < 0) {
      this.x = 0;
      if (!this.isControlledByUser) {
        this.xVelocity = -this.xVelocity;
        this.direction = "right";
      }
    }

    if (this.x > windowWidth - SPRITE_SIZE) {
      this.x = windowWidth - SPRITE_SIZE;
      if (!this.isControlledByUser) {
        this.xVelocity = -this.xVelocity;
        this.direction = "left";
      }
    }

    // Decelerate x velocity if hedgehog is stopped and on ground
    if (
      !this.isControlledByUser &&
      this.mainAnimation?.name !== "walk" &&
      this.onGround()
    ) {
      this.xVelocity *= 0.6;
    }
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

  private onGround(): boolean {
    if (this.static) return true;
    if (this.ground) {
      const groundLevel =
        elementToBox(this.ground).y + elementToBox(this.ground).height;
      return this.y <= groundLevel;
    }
    return false;
  }

  renderRope(): JSX.Element | null {
    if (!this.lastKnownMousePosition) return null;

    const x = this.x + SPRITE_SIZE / 2;
    const y = this.y + SPRITE_SIZE / 2;
    const mouseX = this.lastKnownMousePosition[0];
    const mouseY = window.innerHeight - this.lastKnownMousePosition[1];

    return (
      <div
        className="border rounded bg-white pointer-events-none fixed z-[1000] origin-top-left"
        style={{
          left: x,
          bottom: y,
          width: this.followMouse
            ? Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2)
            : 0,
          height: 3,
          transform: `rotate(${Math.atan2(y - mouseY, mouseX - x)}rad)`,
        }}
      />
    );
  }
}