'use client'

import './buddy.scss'

import { MyHedgehogBuddy } from './index'
import { useHedgehogStore } from './buddy-logic'

export function HedgehogBuddyWithLogic(): JSX.Element {
    const hedgehogConfig = useHedgehogStore((s) => s.hedgehogConfig)
    const patchHedgehogConfig = useHedgehogStore((s) => s.patchHedgehogConfig)

    return hedgehogConfig.enabled ? (
        <>
            <MyHedgehogBuddy onClose={() => patchHedgehogConfig({ enabled: false })} />
        </>
    ) : (
        <></>
    )
}