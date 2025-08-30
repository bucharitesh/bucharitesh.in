export type Optional<T, K extends string | number | symbol> = Omit<T, K> & { [K in keyof T]?: T[K] }

/** Make all keys of T required except those in K */
export type RequiredExcept<T, K extends keyof T> = {
    [P in Exclude<keyof T, K>]-?: T[P]
} & {
    [P in K]?: T[P]
}

export type HedgehogColorOptions =
    | 'green'
    | 'red'
    | 'blue'
    | 'purple'
    | 'dark'
    | 'light'
    | 'sepia'
    | 'invert'
    | 'invert-hue'
    | 'greyscale'

export interface MinimalHedgehogConfig {
    color: HedgehogColorOptions | null
    accessories: string[]
}

export type HedgehogSkin = 'default' | 'spiderhog' | 'robohog'

export interface HedgehogConfig extends MinimalHedgehogConfig {
    enabled: boolean
    color: HedgehogColorOptions | null
    skin?: HedgehogSkin
    accessories: string[]
    walking_enabled: boolean
    interactions_enabled: boolean
    controls_enabled: boolean
    fixed_direction?: 'left' | 'right'
    debug: boolean
}