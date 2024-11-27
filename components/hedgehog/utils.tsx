import { standardAnimations } from "./config";
import { Box } from "./types";

export function range(startOrEnd: number, end?: number): number[] {
  let length = startOrEnd;
  let start = 0;
  if (typeof end == "number") {
    start = startOrEnd;
    length = end - start;
  }
  return Array.from({ length }, (_, i) => i + start);
}

export function sampleOne<T>(items: T[]): T {
  if (!items.length) {
    throw Error("Items array is empty!");
  }
  return items[Math.floor(Math.random() * items.length)];
}

export function shouldIgnoreInput(e: KeyboardEvent): boolean {
  const target = e.target as HTMLElement;
  return (
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.isContentEditable ||
    e.metaKey ||
    e.ctrlKey
  );
}

export const randomChoiceList: string[] = Object.keys(
  standardAnimations
).reduce((acc: string[], key: string) => {
  return [
    ...acc,
    ...range(standardAnimations[key].randomChance || 0).map(() => key),
  ];
}, []);

export function elementToBox(element: Element): Box {
  if (element === document.body) {
    return {
      x: 0,
      y: -1000,
      width: window.innerWidth,
      height: 1000,
    };
  }
  const isHedgehog = element.classList.contains("HedgehogBuddy");
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + (isHedgehog ? 20 : 0),
    y: window.innerHeight - rect.bottom + (isHedgehog ? 5 : 0),
    width: rect.width - (isHedgehog ? 40 : 0),
    height: rect.height - (isHedgehog ? 30 : 0),
  };
}

export const spriteUrl = (img: string): string => {
  return `/assets/hedgehog/skins/default/${img}.png`;
};

export const spriteOverlayUrl = (img: string): string => {
  return `/assets/hedgehog/overlays/${img}.png`;
};