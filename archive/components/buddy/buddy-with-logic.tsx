'use client'

import './buddy.scss'

import { MyBuddyBuddy } from './index'
import { useBuddyStore } from './buddy-logic'

export function BuddyBuddyWithLogic(): JSX.Element {
    const hedgehogConfig = useBuddyStore((s) => s.hedgehogConfig)
    const patchBuddyConfig = useBuddyStore((s) => s.patchBuddyConfig)

    return hedgehogConfig.enabled ? (
        <>
            <MyBuddyBuddy onClose={() => patchBuddyConfig({ enabled: false })} />
        </>
    ) : (
        <></>
    )
}