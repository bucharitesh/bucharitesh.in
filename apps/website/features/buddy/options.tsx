'use client';

import React from 'react';
import { capitalizeFirstLetter } from './utils';

import type { BuddySkin } from './types';

import { FloatingHeader } from '@/components/navigation/floating-header';
import { ScrollArea } from '@/components/scroll-area';
import { USER } from '@/config/user';
import { cn } from '@/lib/utils';
import { Separator } from '@repo/design-system/components/ui/separator';
import { Switch } from '@repo/design-system/components/ui/switch';
import Link from 'next/link';
import { COLOR_TO_FILTER_MAP, useBuddyStore } from './buddy-logic';
import { BuddyBuddyProfile, BuddyBuddyStatic } from './renderer';
import { accessoryGroups, standardAccessories } from './sprites/sprites';

export function BuddyOptions(): React.ReactElement {
  const hedgehogConfig = useBuddyStore((s) => s.hedgehogConfig);
  const patchBuddyConfig = useBuddyStore((s) => s.patchBuddyConfig);

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader scrollTitle="Buddy" />
      <div className="layout relative z-10 content-wrapper">
        <div className="mx-auto w-full space-y-6">
          <div className="grid grid-cols-1 items-start gap-4 md:gap-6">
            <BuddyBuddyProfile {...hedgehogConfig} size={100} />
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-base">
                Hi, I'm {USER.name}'s buddy!
              </h3>
              <p className="mt-1 text-muted-foreground text-sm">
                Don't mind me. I'm just here to keep you company.
                <br />
                You can move me around by clicking and dragging or control me
                with WASD / arrow keys.
              </p>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="mt-2 space-y-3">
            <h4 className="font-semibold text-sm">Options</h4>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label
                htmlFor="enabled"
                className="flex items-center justify-between gap-3 rounded-md border bg-background px-3 py-2"
              >
                <div className="min-w-0">
                  <div className="font-medium text-sm">Enable buddy</div>
                  <div className="truncate text-muted-foreground text-xs">
                    Show Max on the screen
                  </div>
                </div>
                <Switch
                  id="enabled"
                  checked={!!hedgehogConfig.enabled}
                  onCheckedChange={(val) =>
                    patchBuddyConfig({
                      enabled: val,
                    })
                  }
                />
              </label>

              <label
                htmlFor="walking_enabled"
                className="flex items-center justify-between gap-3 rounded-md border bg-background px-3 py-2"
              >
                <div className="min-w-0">
                  <div className="font-medium text-sm">Walk around freely</div>
                  <div className="truncate text-muted-foreground text-xs">
                    Let Max roam the page
                  </div>
                </div>
                <Switch
                  id="walking_enabled"
                  checked={hedgehogConfig.walking_enabled}
                  onCheckedChange={(val) =>
                    patchBuddyConfig({
                      walking_enabled: val,
                    })
                  }
                />
              </label>

              <label
                htmlFor="interactions_enabled"
                className="flex items-center justify-between gap-3 rounded-md border bg-background px-3 py-2"
              >
                <div className="min-w-0">
                  <div className="font-medium text-sm">
                    Interact with elements
                  </div>
                  <div className="truncate text-muted-foreground text-xs">
                    Land on blocks and UI
                  </div>
                </div>
                <Switch
                  id="interactions_enabled"
                  checked={hedgehogConfig.interactions_enabled}
                  onCheckedChange={(val) =>
                    patchBuddyConfig({
                      interactions_enabled: val,
                    })
                  }
                />
              </label>

              <label
                htmlFor="controls_enabled"
                className="flex items-center justify-between gap-3 rounded-md border bg-background px-3 py-2"
              >
                <div className="min-w-0">
                  <div className="font-medium text-sm">Keyboard controls</div>
                  <div className="truncate text-muted-foreground text-xs">
                    WASD / arrow keys + space to jump
                  </div>
                </div>
                <Switch
                  id="controls_enabled"
                  checked={hedgehogConfig.controls_enabled}
                  onCheckedChange={(val) =>
                    patchBuddyConfig({
                      controls_enabled: val,
                    })
                  }
                />
              </label>
            </div>
          </div>

          <Separator className="my-6" />
          <BuddyColor />
          <BuddyAccessories />
        </div>
        <div className="sticky top-14 right-0 col-span-1 hidden h-0 max-w-md space-y-4 lg:col-start-2! lg:row-start-1 lg:block">
          <Link href="/">Back</Link>
        </div>
      </div>
    </ScrollArea>
  );
}

function BuddyAccessories(): React.ReactElement {
  const hedgehogConfig = useBuddyStore((s) => s.hedgehogConfig);
  const patchBuddyConfig = useBuddyStore((s) => s.patchBuddyConfig);

  const accessories = hedgehogConfig.accessories;

  const onClick = (accessory: string): void => {
    // If it is in the list - remove it
    // If it isn't in the list, remove all accessories of the same group and add the new one

    if (accessories.includes(accessory)) {
      patchBuddyConfig({
        accessories: accessories.filter((acc) => acc !== accessory),
      });
    } else {
      patchBuddyConfig({
        accessories: accessories
          .filter(
            (acc) =>
              standardAccessories[acc].group !==
              standardAccessories[accessory].group
          )
          .concat(accessory),
      });
    }
  };

  return (
    <>
      {accessoryGroups.map((group) => (
        <React.Fragment key={group}>
          <h4 className="font-semibold text-sm">
            {capitalizeFirstLetter(group)}
          </h4>

          <div className="flex max-w-full flex-wrap gap-2 pt-px pb-2">
            {Object.keys(standardAccessories)
              .filter((acc) => standardAccessories[acc].group === group)
              .map((acc) => {
                const selected = accessories.includes(acc);
                return (
                  <div
                    key={acc}
                    aria-pressed={selected}
                    onClick={() => onClick(acc)}
                    className={cn(
                      'relative flex items-center justify-center rounded-md p-1 transition',
                      'cursor-pointer hover:bg-primary/10 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary',
                      selected && 'bg-primary/5 ring-2 ring-primary'
                    )}
                    title={capitalizeFirstLetter(acc)}
                  >
                    <BuddyBuddyStatic accessories={[acc]} size={56} />
                  </div>
                );
              })}
          </div>
        </React.Fragment>
      ))}
    </>
  );
}

function BuddyColor(): React.ReactElement {
  const hedgehogConfig = useBuddyStore((s) => s.hedgehogConfig);
  const patchBuddyConfig = useBuddyStore((s) => s.patchBuddyConfig);

  const skins: BuddySkin[] = ['default', 'robohog', 'spiderhog'];

  return (
    <>
      <h4 className="font-semibold text-sm">Skins</h4>

      <div className="flex flex-wrap items-center gap-2 py-1">
        {skins.map((option) => {
          const selected =
            !hedgehogConfig.color && hedgehogConfig.skin === option;
          return (
            <div
              key={option}
              aria-pressed={selected}
              onClick={() =>
                patchBuddyConfig({ skin: option as any, color: null })
              }
              className={cn(
                'relative flex items-center justify-center rounded-md p-1 transition',
                'cursor-pointer hover:bg-primary/10 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary',
                selected && 'ring-2 ring-primary'
              )}
              title={capitalizeFirstLetter(option ?? 'default').replace(
                'hog',
                'Hog'
              )}
            >
              <BuddyBuddyStatic skin={option} size={56} />
            </div>
          );
        })}
        {Object.keys(COLOR_TO_FILTER_MAP).map((option) => {
          const selected = hedgehogConfig.color === option;
          return (
            <button
              type="button"
              key={option}
              aria-pressed={selected}
              onClick={() =>
                patchBuddyConfig({ color: option as any, skin: 'default' })
              }
              className={cn(
                'relative flex items-center justify-center rounded-md p-1 transition',
                'cursor-pointer hover:bg-primary/10 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary',
                selected && 'ring-2 ring-primary'
              )}
              title={capitalizeFirstLetter(option ?? 'default')}
            >
              <BuddyBuddyStatic color={option as any} size={56} />
            </button>
          );
        })}
      </div>
    </>
  );
}
