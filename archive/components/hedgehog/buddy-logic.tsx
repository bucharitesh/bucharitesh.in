 'use client'

 import { create } from 'zustand'
 import { HedgehogColorOptions, HedgehogConfig } from './types'

 export const COLOR_TO_FILTER_MAP: Record<HedgehogColorOptions, string> = {
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
 }

 type HedgehogState = {
     localConfig: Partial<HedgehogConfig> | null
     hedgehogConfig: HedgehogConfig
     hedgehogModeEnabled: boolean
     setHedgehogModeEnabled: (enabled: boolean) => void
     addAccessory: (accessory: string) => void
     removeAccessory: (accessory: string) => void
     patchHedgehogConfig: (config: Partial<HedgehogConfig>) => void
     clearLocalConfig: () => void
     setDebug: (debug: boolean) => void
 }

 const defaultConfig: HedgehogConfig = {
     enabled: false,
     color: null,
     accessories: [],
     walking_enabled: true,
     interactions_enabled: true,
     controls_enabled: true,
     debug: false,
 }

 export const useHedgehogStore = create<HedgehogState>()((set, get) => ({
     localConfig: null,
     hedgehogConfig: defaultConfig,
     hedgehogModeEnabled: false,
     clearLocalConfig: () => set({ localConfig: null }),
     patchHedgehogConfig: (config) => {
         const existing = get().hedgehogConfig
         const patchedLocal = { ...(get().localConfig ?? {}), ...config }
         const hedgehogConfig = { ...existing, ...patchedLocal }
         set({ localConfig: patchedLocal, hedgehogConfig, hedgehogModeEnabled: !!hedgehogConfig.enabled })
     },
     setHedgehogModeEnabled: (enabled) => {
         get().patchHedgehogConfig({ enabled })
     },
     addAccessory: (accessory) => {
         const current = get().hedgehogConfig.accessories ?? []
         get().patchHedgehogConfig({ accessories: [...current, accessory] })
     },
     removeAccessory: (accessory) => {
         const current = get().hedgehogConfig.accessories ?? []
         get().patchHedgehogConfig({ accessories: current.filter((acc) => acc !== accessory) })
     },
     setDebug: (debug) => {
         get().patchHedgehogConfig({ debug })
     },
 }))