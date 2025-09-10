"use client";

import React, { useRef, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  AnimatePresence,
  HTMLMotionProps,
  motion,
  useAnimation,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import { cn } from "@/lib/utils";

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  direction?: "top" | "middle" | "bottom";
  children: React.ReactNode;
}

const dockVariants = cva(
  "flex items-end w-auto h-[58px] px-2 fixed bg-white dark:bg-neutral-900 shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-gray-200 dark:border-gray-800 -bottom-2 left-1/2 rounded-full z-10 transform -translate-x-1/2 -translate-y-1/2",
);

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  ({ className, children, ...props }, ref) => {
    const mouseX = useMotionValue(Infinity);

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
        onMouseLeave={() => mouseX.set(Infinity)}
        {...props}
        className={cn(dockVariants({ className }))}
      >
        <div className="absolute -top-px w-[95%] h-px opacity-20 -z-1 bg-linear-to-r from-transparent via-neutral-200 to-transparent dark:via-neutral-700 dark:to-transparent"></div>
        <div className="flex items-end gap-2 w-full py-2 md:h-auto md:overflow-visible sm:h-[72px] sm:overflow-x-auto sm:overflow-y-hidden">
          {renderChildren()}
        </div>
      </motion.footer>
    );
  },
);

Dock.displayName = "Dock";

export interface DockIconProps extends HTMLMotionProps<"div"> {
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
  let ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  let distance = useTransform(mouseX, (val: number) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let height = useSpring(heightTransform, {
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
        "rounded-full cursor-pointer bg-gray-200 dark:bg-neutral-800 flex items-center justify-center relative",
        className,
      )}
      {...props}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 2 }}
            className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div className="w-full h-full flex items-center justify-center rounded-full overflow-hidden">
        {React.Children.map(children, (child: any) => {
          if (React.isValidElement(child) && child.type !== DockIconActiveDot) {
            return React.cloneElement((child as any), {
              // @ts-ignore
              className: cn(
                "w-full h-full flex items-center justify-center",
                (child as any).props.className,
              ),
            });
          }
          return child;
        })}
      </motion.div>
    </motion.div>
  );
};

DockIcon.displayName = "DockIcon";

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
        "absolute w-1 h-1 -bottom-[6px] rounded-full bg-neutral-400",
        className,
      )}
      style={style}
    />
  );
};

DockIconActiveDot.displayName = "DockIconActiveDot";

export { Dock, DockIcon, DockIconActiveDot, dockVariants };
