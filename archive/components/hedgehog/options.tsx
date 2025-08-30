"use client";

import React from "react";
import { capitalizeFirstLetter } from "./utils";

import { HedgehogSkin } from "./types";

import { HedgehogBuddyProfile, HedgehogBuddyStatic } from "./renderer";
import { COLOR_TO_FILTER_MAP, useHedgehogStore } from "./buddy-logic";
import { accessoryGroups, standardAccessories } from "./sprites/sprites";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export function HedgehogOptions(): JSX.Element {
  const hedgehogConfig = useHedgehogStore((s) => s.hedgehogConfig);
  const patchHedgehogConfig = useHedgehogStore((s) => s.patchHedgehogConfig);

  return (
    <div className="max-w-screen-md mx-auto px-2 py-4 pb-20 md:py-20 space-y-6">
      <div className="grid grid-cols-1 gap-4 md:gap-6 items-start">
        <HedgehogBuddyProfile {...hedgehogConfig} size={100} />
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold">Hi, I'm Max!</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {hedgehogConfig.skin === "spiderhog" ? (
              <>
                Well, it’s not every day you meet a hedgehog with spider powers.
                Yep, that's me - SpiderHog. I wasn’t always this way. Just your
                average, speedy little guy until a radioactive spider bit me.
                With great power comes great responsibility, so buckle up,
                because this hedgehog’s got a whole data warehouse to protect...
                <br />
                You can move me around by clicking and dragging or control me
                with WASD / arrow keys and I'll use your mouse as a web slinging
                target.
              </>
            ) : (
              <>
                Don't mind me. I'm just here to keep you company.
                <br />
                You can move me around by clicking and dragging or control me
                with WASD / arrow keys.
              </>
            )}
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
                patchHedgehogConfig({
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
                patchHedgehogConfig({
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
              <div className="text-sm font-medium">Interact with elements</div>
              <div className="text-xs text-muted-foreground truncate">
                Land on blocks and UI
              </div>
            </div>
            <Switch
              id="interactions_enabled"
              checked={hedgehogConfig.interactions_enabled}
              onCheckedChange={(val) =>
                patchHedgehogConfig({
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
                patchHedgehogConfig({
                  controls_enabled: val,
                })
              }
            />
          </label>
        </div>
      </div>

      <Separator className="my-6" />
      <HedgehogColor />
      <HedgehogAccessories />
    </div>
  );
}

function HedgehogAccessories(): JSX.Element {
  const hedgehogConfig = useHedgehogStore((s) => s.hedgehogConfig);
  const patchHedgehogConfig = useHedgehogStore((s) => s.patchHedgehogConfig);

  const accessories = hedgehogConfig.accessories;

  const onClick = (accessory: string): void => {
    // If it is in the list - remove it
    // If it isn't in the list, remove all accessories of the same group and add the new one

    if (accessories.includes(accessory)) {
      patchHedgehogConfig({
        accessories: accessories.filter((acc) => acc !== accessory),
      });
    } else {
      patchHedgehogConfig({
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
          <h4 className="text-xl">{capitalizeFirstLetter(group)}</h4>

          <div className="flex max-w-full flex-wrap gap-2 pt-px pb-2">
            {Object.keys(standardAccessories)
              .filter((acc) => standardAccessories[acc].group === group)
              .map((acc) => {
                const selected = accessories.includes(acc);
                return (
                  <button
                    type="button"
                    key={acc}
                    aria-pressed={selected}
                    onClick={() => onClick(acc)}
                    className={cn(
                      "relative flex items-center justify-center rounded-md bg-background p-1 transition",
                      "hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer",
                      selected && "ring-2 ring-primary bg-primary/5",
                    )}
                    title={capitalizeFirstLetter(acc)}
                  >
                    <HedgehogBuddyStatic accessories={[acc]} size={56} />
                  </button>
                );
              })}
          </div>
        </React.Fragment>
      ))}
    </>
  );
}

function HedgehogColor(): JSX.Element {
  const hedgehogConfig = useHedgehogStore((s) => s.hedgehogConfig);
  const patchHedgehogConfig = useHedgehogStore((s) => s.patchHedgehogConfig);

  const skins: HedgehogSkin[] = ["default", "robohog", "spiderhog"];

  return (
    <>
      <h4 className="text-xl">Skins and colors</h4>

      <div className="flex flex-wrap gap-2 items-center py-1">
        {skins.map((option) => {
          const selected = !hedgehogConfig.color && hedgehogConfig.skin === option;
          return (
            <button
              type="button"
              key={option}
              aria-pressed={selected}
              onClick={() =>
                patchHedgehogConfig({ skin: option as any, color: null })
              }
              className={cn(
                "relative flex items-center justify-center rounded-md bg-background p-1 transition",
                "hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer",
                selected && "ring-2 ring-primary bg-primary/5",
              )}
              title={capitalizeFirstLetter(option ?? "default").replace("hog", "Hog")}
            >
              <HedgehogBuddyStatic skin={option} size={56} />
            </button>
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
                patchHedgehogConfig({ color: option as any, skin: "default" })
              }
              className={cn(
                "relative flex items-center justify-center rounded-md bg-background p-1 transition",
                "hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer",
                selected && "ring-2 ring-primary bg-primary/5"
              )}
              title={capitalizeFirstLetter(option ?? "default")}
            >
              <HedgehogBuddyStatic color={option as any} size={56} />
            </button>
          );
        })}
      </div>
    </>
  );
}
