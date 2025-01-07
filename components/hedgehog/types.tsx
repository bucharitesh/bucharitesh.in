import { HedgehogActor } from "./actor";

export type HedgehogConfig = {
  skin?: string;
  color?: string;
  accessories?: string[];
  controls_enabled?: boolean;
  walking_enabled?: boolean;
  interactions_enabled?: boolean;
  party_mode_enabled?: boolean;
};

export type SpriteInfo = {
  frames: number;
  img: string;
  maxIteration?: number;
  forceDirection?: "left" | "right";
  randomChance?: number;
  accessoryPositions?: [number, number][];
  style?: React.CSSProperties;
};

export type Box = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type AnimationState = {
  name: string;
  frame: number;
  iterations: number | null;
  spriteInfo: SpriteInfo;
  onComplete?: () => boolean | void;
};

export type HedgehogBuddyProps = {
  onActorLoaded?: (actor: HedgehogActor) => void;
  onClose?: () => void;
  onClick?: (actor: HedgehogActor) => void;
  onPositionChange?: (actor: HedgehogActor) => void;
  hedgehogConfig?: HedgehogConfig;
  static?: boolean;
};
