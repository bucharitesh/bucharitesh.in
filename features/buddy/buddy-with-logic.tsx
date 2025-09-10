'use client';

import type React from 'react';
import './buddy.scss';

import { useBuddyStore } from './buddy-logic';
import { MyBuddyBuddy } from './index';

export function BuddyBuddyWithLogic(): React.ReactElement {
  const hedgehogConfig = useBuddyStore((s) => s.hedgehogConfig);
  const patchBuddyConfig = useBuddyStore((s) => s.patchBuddyConfig);

  return hedgehogConfig.enabled ? (
    <>
      <MyBuddyBuddy onClose={() => patchBuddyConfig({ enabled: false })} />
    </>
  ) : (
    <></>
  );
}
