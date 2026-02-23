'use client';

import { cn } from '@/lib/utils';
import { LiquidMetal } from '@paper-design/shaders-react';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const metallicButtonVariants = cva(
  'group relative inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full outline-none select-none transition-transform active:scale-95 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      size: {
        sm: 'size-12 [&_svg:not([class*=size-])]:size-4',
        default: 'size-16 [&_svg:not([class*=size-])]:size-5',
        lg: 'size-20 [&_svg:not([class*=size-])]:size-6',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export interface MetallicButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof metallicButtonVariants> {
  /** Inner face gradient top color */
  lightColor?: string;
  /** Inner face gradient bottom color */
  darkColor?: string;
  /** Icon / content color */
  iconColor?: string;
  /** Shader animation speed (0 = static) */
  speed?: number;
  /** Shader pattern stripe density */
  repetition?: number;
  /** Shader noise distortion (0-1) */
  distortion?: number;
  /** Shader pattern angle (0-360) */
  angle?: number;
}

const MetallicButton = React.forwardRef<HTMLButtonElement, MetallicButtonProps>(
  (
    {
      children,
      className,
      size,
      lightColor = '#444',
      darkColor = '#000',
      iconColor = '#65615f',
      speed = 0.5,
      repetition = 1.5,
      distortion = 0,
      angle = 100,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(metallicButtonVariants({ size }), className)}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <LiquidMetal
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
            }}
            speed={speed}
            repetition={repetition}
            distortion={distortion}
            softness={0.5}
            shiftRed={0.3}
            shiftBlue={0.3}
            contour={0}
            angle={angle}
            scale={1.5}
            shape="circle"
            offsetX={0.1}
            offsetY={-0.1}
          />
        </div>

        <div
          className="absolute inset-[5%] rounded-full"
          style={{
            background: `linear-gradient(${lightColor}, ${darkColor})`,
            boxShadow: 'inset 0 2px 2px 2px rgba(255,255,255,0.3)',
          }}
        />

        <div
          className="pointer-events-none absolute inset-[-2%] rounded-full grayscale transition-[filter] duration-300 group-hover:grayscale-0"
          style={{
            padding: 2,
            WebkitMask:
              'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
            WebkitMaskComposite: 'xor',
            mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
            maskComposite: 'exclude',
          }}
        />

        <span className="relative z-10" style={{ color: iconColor }}>
          {children}
        </span>
      </button>
    );
  }
);
MetallicButton.displayName = 'MetallicButton';

export { MetallicButton, metallicButtonVariants };
