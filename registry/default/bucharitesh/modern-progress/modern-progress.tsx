// components/ui/progress.tsx
import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

import "./modern-progress.css";

const progressVariants = cva(
  "w-full flex items-center justify-center relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-neutral-950 border-4 border-primary",
        secondary: "bg-neutral-900 border-4 border-secondary",
        destructive: "bg-neutral-950 border-4 border-destructive",
      },
      radius: {
        default: "rounded-3xl",
        full: "rounded-full",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      radius: "default",
    },
  },
);

const indicatorVariants = cva(
  "w-full absolute left-0 bottom-0 z-20 transition-[height,background-color] duration-300",
  {
    variants: {
      variant: {
        default: "bg-primary",
        secondary: "bg-secondary",
        destructive: "bg-destructive",
      },
      striped: {
        true: "[&>div]:bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] [&>div]:bg-size-1",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      striped: true,
    },
  },
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
    ref,
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
        <div className="w-full aspect-video relative">
          <div
            className={cn(
              indicatorVariants({ variant, striped }),
              indicatorClassName,
            )}
            style={{
              height: `${percentage}%`,
            }}
          >
            <div
              data-pattern="stripes"
              className="w-full h-full relative z-10 transition-colors duration-300"
            />
          </div>
          {showText && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center z-20">
              <span className="text-white text-5xl font-bold">
                {percentage.toFixed(0)}
                <span className="text-white text-base font-medium">%</span>
              </span>
            </div>
          )}
        </div>
      </div>
    );
  },
);
Progress.displayName = "Progress";

export { Progress };
