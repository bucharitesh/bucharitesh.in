export function range(startOrEnd: number, end?: number): number[] {
  let length = startOrEnd;
  let start = 0;
  if (typeof end == 'number') {
    start = startOrEnd;
    length = end - start;
  }
  return Array.from({ length }, (_, i) => i + start);
}

export function sampleOne<T>(items: T[]): T {
  if (!items.length) {
    throw new Error('Items array is empty!');
  }
  return items[Math.floor(Math.random() * items.length)];
}

export function shouldIgnoreInput(e: KeyboardEvent): boolean {
  const target = e.target as HTMLElement;
  return (
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.isContentEditable ||
    e.metaKey ||
    e.ctrlKey
  );
}

export const capitalizeFirstLetter = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);
