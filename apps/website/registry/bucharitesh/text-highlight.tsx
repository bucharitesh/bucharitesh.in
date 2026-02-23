import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

function buildHighlightBackground(rgb: string, angle: string) {
  return [
    `conic-gradient(at 0 100%, rgb(${rgb} / 100%) 1%, #fff0 3%) no-repeat 0 0 / auto 120%`,
    `conic-gradient(from 180deg at 100% 0, #fff0, rgb(${rgb} / 100%) 1%, #fff0 4%) no-repeat 100% 100% / auto 120%`,
    `linear-gradient(${angle}, rgb(${rgb} / 60%), rgb(${rgb} / 20%) 75%, rgb(${rgb} / 55%)) no-repeat center / auto`,
  ].join(', ');
}

const textHighlightVariants = cva(
  'relative inline-block w-fit select-none whitespace-nowrap text-center font-semibold',
  {
    variants: {
      size: {
        sm: 'px-2 py-1 text-lg',
        default: 'px-3 py-1.5 text-2xl',
        lg: 'px-4 py-2 text-4xl',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export interface TextHighlightProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof textHighlightVariants> {
  /** RGB values (space-separated, e.g. "255 232 62") */
  color: string;
  /** Gradient angle (e.g. "50deg") */
  angle?: string;
  /** Rotation applied to the highlight (e.g. "1deg") */
  rotate?: string;
  /** Scale applied to the highlight (e.g. "1.1") */
  scale?: string;
  /** Skew applied to the highlight (e.g. "-5deg") */
  skew?: string;
}

const TextHighlight = React.forwardRef<HTMLSpanElement, TextHighlightProps>(
  (
    {
      children,
      className,
      size,
      color,
      angle = '50deg',
      rotate = '0deg',
      scale = '1',
      skew = '0deg',
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(textHighlightVariants({ size }), className)}
        {...props}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            zIndex: -1,
            borderRadius: '3px 5px 3px 5px',
            background: buildHighlightBackground(color, angle),
            rotate,
            scale,
            transform: `skew(${skew})`,
          }}
        />
        {children}
      </span>
    );
  }
);
TextHighlight.displayName = 'TextHighlight';

export { TextHighlight, textHighlightVariants };
