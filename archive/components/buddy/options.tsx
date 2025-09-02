"use client";

import React from "react";
import { capitalizeFirstLetter } from "./utils";

import { BuddySkin } from "./types";

import { BuddyBuddyProfile, BuddyBuddyStatic } from "./renderer";
import { COLOR_TO_FILTER_MAP, useBuddyStore } from "./buddy-logic";
import { accessoryGroups, standardAccessories } from "./sprites/sprites";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { meta } from "@/lib/config";

export function BuddyOptions(): JSX.Element {
  const hedgehogConfig = useBuddyStore((s) => s.hedgehogConfig);
  const patchBuddyConfig = useBuddyStore((s) => s.patchBuddyConfig);

  return (
    <div className="layout-sm mb-40 relative z-10 grid gap-y-2 px-4 pt-12 lg:layout-craft lg:gap-x-9 lg:px-0 [&>*]:col-start-2 lg:[&>*]:col-start-3">
        <div className="w-full mx-auto space-y-6">
        <div className="grid grid-cols-1 gap-4 md:gap-6 items-start">
          <BuddyBuddyProfile {...hedgehogConfig} size={100} />
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold">Hi, I'm {meta.name}'s buddy!</h3>
            <p className="mt-1 text-sm text-muted-foreground">
                  Don't mind me. I'm just here to keep you company.
                  <br />
                  You can move me around by clicking and dragging or control me
                  with WASD / arrow keys.
            </p>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="mt-2 space-y-3">
          <h4 className="text-sm font-semibold">Options</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label
              htmlFor="enabled"
              className="flex items-center justify-between gap-3 rounded-md border px-3 py-2 bg-background"
            >
              <div className="min-w-0">
                <div className="text-sm font-medium">Enable buddy</div>
                <div className="text-xs text-muted-foreground truncate">
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
              className="flex items-center justify-between gap-3 rounded-md border px-3 py-2 bg-background"
            >
              <div className="min-w-0">
                <div className="text-sm font-medium">Walk around freely</div>
                <div className="text-xs text-muted-foreground truncate">
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
              className="flex items-center justify-between gap-3 rounded-md border px-3 py-2 bg-background"
            >
              <div className="min-w-0">
                <div className="text-sm font-medium">
                  Interact with elements
                </div>
                <div className="text-xs text-muted-foreground truncate">
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
              className="flex items-center justify-between gap-3 rounded-md border px-3 py-2 bg-background"
            >
              <div className="min-w-0">
                <div className="text-sm font-medium">Keyboard controls</div>
                <div className="text-xs text-muted-foreground truncate">
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
      <div className="sticky space-y-4 top-14 right-0 hidden h-0 lg:!col-start-2 lg:row-start-1 lg:block col-span-1 max-w-md">
        <Link href="/">Back</Link>
      </div>
    </div>
  );
}

function BuddyAccessories(): JSX.Element {
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
          <h4 className="text-sm font-semibold">{capitalizeFirstLetter(group)}</h4>

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
                      "relative flex items-center justify-center rounded-md p-1 transition",
                      "hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer",
                      selected && "ring-2 ring-primary bg-primary/5"
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

function BuddyColor(): JSX.Element {
  const hedgehogConfig = useBuddyStore((s) => s.hedgehogConfig);
  const patchBuddyConfig = useBuddyStore((s) => s.patchBuddyConfig);

  const skins: BuddySkin[] = ["default", "robohog", "spiderhog"];

  return (
    <>
      <h4 className="text-sm font-semibold">Skins</h4>

      <div className="flex flex-wrap gap-2 items-center py-1">
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
                "relative flex items-center justify-center rounded-md p-1 transition",
                "hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer",
                selected && "ring-2 ring-primary"
              )}
              title={capitalizeFirstLetter(option ?? "default").replace(
                "hog",
                "Hog"
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
                patchBuddyConfig({ color: option as any, skin: "default" })
              }
              className={cn(
                "relative flex items-center justify-center rounded-md p-1 transition",
                "hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer",
                selected && "ring-2 ring-primary"
              )}
              title={capitalizeFirstLetter(option ?? "default")}
            >
              <BuddyBuddyStatic color={option as any} size={56} />
            </button>
          );
        })}
      </div>
    </>
  );
}
