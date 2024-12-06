"use client";

import { cn } from "@/lib/utils";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { PropsWithChildren, ReactNode } from "react";

export type PopoverProps = PropsWithChildren<{
  content: ReactNode | string;
  align?: "center" | "start" | "end";
  openPopover: boolean;
  setOpenPopover: (open: boolean) => void;
  mobileOnly?: boolean;
  popoverContentClassName?: string;
  collisionBoundary?: Element | Element[];
  sticky?: "partial" | "always";
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
}>;

export function Popover({
  children,
  content,
  align = "center",
  openPopover,
  setOpenPopover,
  popoverContentClassName,
  collisionBoundary,
  sticky,
  onEscapeKeyDown,
}: PopoverProps) {
  return (
    <PopoverPrimitive.Root open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverPrimitive.Trigger className="sm:inline-flex" asChild>
        {children}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          sideOffset={8}
          align={align}
          className={cn(
            "animate-slide-up-fade z-50 items-center rounded-lg border border-gray-300/20 bg-gray-800 drop-shadow-lg sm:block",
            popoverContentClassName
          )}
          sticky={sticky}
          collisionBoundary={collisionBoundary}
          onEscapeKeyDown={onEscapeKeyDown}
        >
          {content}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
