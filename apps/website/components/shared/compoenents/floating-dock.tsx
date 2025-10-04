'use client';

import { type VariantProps, cva } from 'class-variance-authority';
import {
  AnimatePresence,
  type HTMLMotionProps,
  motion,
  useAnimation,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import React, { useRef, useState } from 'react';

import { cn } from '@/lib/utils';

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  direction?: 'top' | 'middle' | 'bottom';
  children: React.ReactNode;
}

const dockVariants = cva(
  '-bottom-2 -translate-x-1/2 -translate-y-1/2 fixed left-1/2 z-10 flex h-[58px] w-auto transform items-end rounded-full border border-gray-200 bg-white px-2 shadow-[0_30px_60px_rgba(0,0,0,0.12)] dark:border-gray-800 dark:bg-neutral-900'
);

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  ({ className, children, ...props }, ref) => {
    const mouseX = useMotionValue(Number.POSITIVE_INFINITY);

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === DockIcon) {
          return React.cloneElement(child, {
            // @ts-ignore
            ...child.props,
            mouseX: mouseX,
          });
        }
        return child;
      });
    };

    return (
      <motion.footer
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
        {...props}
        className={cn(dockVariants({ className }))}
      >
        <div className="-top-px -z-1 absolute h-px w-[95%] bg-linear-to-r from-transparent via-neutral-200 to-transparent opacity-20 dark:via-neutral-700 dark:to-transparent" />
        <div className="flex w-full items-end gap-2 py-2 sm:h-[72px] sm:overflow-x-auto sm:overflow-y-hidden md:h-auto md:overflow-visible">
          {renderChildren()}
        </div>
      </motion.footer>
    );
  }
);

Dock.displayName = 'Dock';

export interface DockIconProps extends HTMLMotionProps<'div'> {
  size?: number;
  title?: string;
  mouseX?: any;
  className?: string;
  children?: React.ReactNode;
}

const DockIcon = ({
  size,
  mouseX,
  title,
  className,
  children,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  const handleMouseDown = async () => {
    await controls.start({ y: 10, transition: { duration: 0.1 } });
  };

  const handleMouseUp = async () => {
    await controls.start({ y: -10, transition: { duration: 0.1 } });
    controls.start({
      y: 0,
    });
  };

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={{ y: 0 }}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        controls.start({ y: 0, transition: { duration: 0.2 } });
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={cn(
        'relative flex cursor-pointer items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800',
        className
      )}
      {...props}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 2 }}
            className="-translate-x-1/2 -top-8 absolute left-1/2 w-fit whitespace-pre rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-neutral-700 text-xs dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full">
        {React.Children.map(children, (child: any) => {
          if (React.isValidElement(child) && child.type !== DockIconActiveDot) {
            return React.cloneElement(child as any, {
              // @ts-ignore
              className: cn(
                'flex h-full w-full items-center justify-center',
                (child as any).props.className
              ),
            });
          }
          return child;
        })}
      </motion.div>
    </motion.div>
  );
};

DockIcon.displayName = 'DockIcon';

interface DockIconActiveDotProps {
  isActive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const DockIconActiveDot: React.FC<DockIconActiveDotProps> = ({
  isActive = false,
  className,
  style,
}) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: isActive ? 1 : 0,
        opacity: isActive ? 1 : 0,
      }}
      transition={{ duration: 0.2 }}
      className={cn(
        '-bottom-[6px] absolute h-1 w-1 rounded-full bg-neutral-400',
        className
      )}
      style={style}
    />
  );
};

DockIconActiveDot.displayName = 'DockIconActiveDot';

export { Dock, DockIcon, DockIconActiveDot, dockVariants };
