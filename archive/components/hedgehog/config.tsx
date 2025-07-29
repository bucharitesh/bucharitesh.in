import { HedgehogConfig, SpriteInfo } from "./types";

// Constants
export const SPRITE_SIZE = 80;
export const SHADOW_HEIGHT = SPRITE_SIZE / 8;
export const SPRITE_SHEET_WIDTH = SPRITE_SIZE * 8;
export const X_FRAMES = SPRITE_SHEET_WIDTH / SPRITE_SIZE;
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
    img: "wave",
    frames: 1,
    maxIteration: 50,
    randomChance: 1,
  },
  fall: {
    img: "fall",
    frames: 9,
    forceDirection: "left",
    randomChance: 0,
  },
  jump: {
    img: "jump",
    frames: 10,
    maxIteration: 10,
    randomChance: 2,
  },
  walk: {
    img: "walk",
    frames: 11,
    maxIteration: 20,
    randomChance: 10,
  },
  wave: {
    img: "wave",
    frames: 26,
    maxIteration: 1,
    randomChance: 2,
  },
  flag: {
    img: "flag",
    frames: 25,
    maxIteration: 1,
    randomChance: 1,
  },
  phone: {
    img: "phone",
    frames: 28,
    maxIteration: 1,
    randomChance: 1,
  },
};

export const overlayAnimations: { [key: string]: SpriteInfo } = {
  fire: {
    img: "fire",
    frames: 14,
    maxIteration: 1,
    style: {
      opacity: 0.75,
    },
  },
};
