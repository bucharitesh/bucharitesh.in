import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const progressVariants = cva(
  'relative flex w-full items-center justify-center overflow-hidden',
  {
    variants: {
      variant: {
        default: 'border-4 border-primary bg-neutral-950',
        secondary: 'border-4 border-secondary bg-neutral-900',
        destructive: 'border-4 border-destructive bg-neutral-950',
      },
      radius: {
        default: 'rounded-3xl',
        full: 'rounded-full',
        none: 'rounded-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      radius: 'default',
    },
  }
);

const indicatorVariants = cva(
  'absolute bottom-0 left-0 z-20 w-full transition-[height,background-color] duration-300',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        secondary: 'bg-secondary',
        destructive: 'bg-destructive',
      },
      striped: {
        true: '[&>div]:bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] [&>div]:bg-size-1',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      striped: true,
    },
  }
);

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value?: number;
  max?: number;
  striped?: boolean;
  indicatorClassName?: string;
  showText?: boolean;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value = 0,
      max = 100,
      variant,
      radius,
      striped = true,
      indicatorClassName,
      showText,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        className={cn(progressVariants({ variant, radius }), className)}
        {...props}
      >
        <div className="relative aspect-video w-full">
          <div
            className={cn(
              indicatorVariants({ variant, striped }),
              indicatorClassName
            )}
            style={{
              height: `${percentage}%`,
            }}
          >
            <div
              data-pattern="stripes"
              className="relative z-10 h-full w-full transition-colors duration-300"
            />
          </div>
          {showText && (
            <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 z-20 flex h-full w-full items-center justify-center">
              <span className="font-bold text-5xl text-white">
                {percentage.toFixed(0)}
                <span className="font-medium text-base text-white">%</span>
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
);
Progress.displayName = 'Progress';

export { Progress };
