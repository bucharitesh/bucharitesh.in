'use client';

import { create } from 'zustand';
import type { BuddyColorOptions, BuddyConfig } from './types';

export const COLOR_TO_FILTER_MAP: Record<BuddyColorOptions, string> = {
  red: 'hue-rotate(340deg) saturate(300%) brightness(90%)',
  green: 'hue-rotate(60deg) saturate(100%)',
  blue: 'hue-rotate(210deg) saturate(300%) brightness(90%)',
  purple: 'hue-rotate(240deg)',
  dark: 'brightness(70%)',
  light: 'brightness(130%)',
  sepia: 'sepia(100%) saturate(300%) brightness(70%)',
  invert: 'invert(100%)',
  'invert-hue': 'invert(100%) hue-rotate(180deg)',
  greyscale: 'saturate(0%)',
};

type BuddyState = {
  localConfig: Partial<BuddyConfig> | null;
  hedgehogConfig: BuddyConfig;
  hedgehogModeEnabled: boolean;
  setBuddyModeEnabled: (enabled: boolean) => void;
  addAccessory: (accessory: string) => void;
  removeAccessory: (accessory: string) => void;
  patchBuddyConfig: (config: Partial<BuddyConfig>) => void;
  clearLocalConfig: () => void;
  setDebug: (debug: boolean) => void;
};

const defaultConfig: BuddyConfig = {
  enabled: false,
  color: null,
  accessories: [],
  walking_enabled: true,
  interactions_enabled: true,
  controls_enabled: true,
  debug: false,
};

export const useBuddyStore = create<BuddyState>()((set, get) => ({
  localConfig: null,
  hedgehogConfig: defaultConfig,
  hedgehogModeEnabled: false,
  clearLocalConfig: () => set({ localConfig: null }),
  patchBuddyConfig: (config) => {
    const existing = get().hedgehogConfig;
    const patchedLocal = { ...(get().localConfig ?? {}), ...config };
    const hedgehogConfig = { ...existing, ...patchedLocal };
    set({
      localConfig: patchedLocal,
      hedgehogConfig,
      hedgehogModeEnabled: !!hedgehogConfig.enabled,
    });
  },
  setBuddyModeEnabled: (enabled) => {
    get().patchBuddyConfig({ enabled });
  },
  addAccessory: (accessory) => {
    const current = get().hedgehogConfig.accessories ?? [];
    get().patchBuddyConfig({ accessories: [...current, accessory] });
  },
  removeAccessory: (accessory) => {
    const current = get().hedgehogConfig.accessories ?? [];
    get().patchBuddyConfig({
      accessories: current.filter((acc) => acc !== accessory),
    });
  },
  setDebug: (debug) => {
    get().patchBuddyConfig({ debug });
  },
}));
