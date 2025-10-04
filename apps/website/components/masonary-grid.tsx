import React from 'react';

export type BreakpointName = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type BreakpointConfig = {
  [key in BreakpointName]?: number;
};

export interface MasonryGridProps {
  gap?: number;
  breakpoints: BreakpointConfig;
  className?: string;
  children?: React.ReactNode;
}

// Tailwind breakpoint widths
const BREAKPOINT_WIDTHS: { [key in BreakpointName]: number } = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export const MasonryGrid: React.FC<MasonryGridProps> = ({
  gap = 4,
  breakpoints,
  className = '',
  children,
}) => {
  // Create a stable, deterministic class for this breakpoint configuration
  const createHashFromInput = (input: string): string => {
    let hashAccumulator = 0;
    for (let i = 0; i < input.length; i++) {
      hashAccumulator = (hashAccumulator * 31 + input.charCodeAt(i)) | 0;
    }
    return Math.abs(hashAccumulator).toString(36);
  };

  const configKey = JSON.stringify({ breakpoints, gap });
  const masonryClassId = `masonry-${createHashFromInput(configKey)}`;

  // Build responsive CSS using Tailwind's breakpoint widths
  const responsiveCssRules: string[] = [];
  responsiveCssRules.push(`.${masonryClassId} { column-gap: ${gap}px; }`);
  // Default to 1 column on very small screens
  responsiveCssRules.push(`.${masonryClassId} { column-count: 1; }`);

  (Object.keys(BREAKPOINT_WIDTHS) as BreakpointName[]).forEach((name) => {
    const minWidth = BREAKPOINT_WIDTHS[name];
    const cols = breakpoints[name];
    if (typeof cols === 'number' && cols > 0) {
      responsiveCssRules.push(
        `@media (min-width: ${minWidth}px) { .${masonryClassId} { column-count: ${cols}; } }`
      );
    }
  });

  const styleContent = `
.${masonryClassId} > * { break-inside: avoid; margin-bottom: ${gap}px; }
${responsiveCssRules.join('\n')}
`.trim();

  const wrappedChildren = React.Children.toArray(children).map(
    (child, index) => <div key={index}>{child}</div>
  );

  return (
    <div
      className={`relative mx-0 my-auto mb-20 flex flex-col pt-2 pl-1 ${className}`}
    >
      <style
        dangerouslySetInnerHTML={{ __html: styleContent }}
        suppressHydrationWarning
      />
      <div className={`${masonryClassId} w-auto pr-2 pl-1`}>
        {wrappedChildren}
      </div>
    </div>
  );
};
