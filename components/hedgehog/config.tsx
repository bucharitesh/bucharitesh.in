import { HedgehogConfig, SpriteInfo } from "./types";

export const hhFall = "/assets/hedgehog/fall.png";
export const hhJump = "/assets/hedgehog/jump.png";
export const hhSign = "/assets/hedgehog/sign.png";
export const hhSpin = "/assets/hedgehog/spin.png";
export const hhWalk = "/assets/hedgehog/walk.png";
export const hhWave = "/assets/hedgehog/wave.png";

// Constants
export const SPRITE_SIZE = 64;
export const SPRITE_SHEET_WIDTH = 512;
export const X_FRAMES = SPRITE_SHEET_WIDTH / SPRITE_SIZE;
export const SHADOW_HEIGHT = 10;
export const FPS = 24;
export const GRAVITY_PIXELS = 10;
export const MAX_JUMP_COUNT = 2;

// Default configuration
export const defaultConfig: HedgehogConfig = {
  controls_enabled: true,
  walking_enabled: true,
  interactions_enabled: true,
  party_mode_enabled: false,
};

export const standardAnimations: { [key: string]: SpriteInfo } = {
  stop: {
    img: hhWave,
    frames: 1,
    maxIteration: 50,
    randomChance: 1,
  },
  fall: {
    img: hhFall,
    frames: 9,
    forceDirection: "left",
    randomChance: 0,
  },
  jump: {
    img: hhJump,
    frames: 10,
    maxIteration: 10,
    randomChance: 2,
  },
  sign: {
    img: hhSign,
    frames: 33,
    maxIteration: 1,
    forceDirection: "right",
    randomChance: 1,
  },
  spin: {
    img: hhSpin,
    frames: 9,
    maxIteration: 3,
    randomChance: 2,
  },
  walk: {
    img: hhWalk,
    frames: 11,
    maxIteration: 20,
    randomChance: 10,
  },
  wave: {
    img: hhWave,
    frames: 27,
    maxIteration: 1,
    randomChance: 2,
  },
};

