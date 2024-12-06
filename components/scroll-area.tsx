import { cn } from "@/old/lib/utils";

export const SCROLL_AREA_ID = "scroll-area";

export const ScrollArea = ({ useScrollAreaId = false, className, ...rest }) => (
  <div
    {...(useScrollAreaId && { id: SCROLL_AREA_ID })}
    className={cn("scrollable-area relative flex w-full flex-col", className)}
    {...rest}
  />
);
