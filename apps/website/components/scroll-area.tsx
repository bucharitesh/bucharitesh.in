import { cn } from "@repo/design-system/lib/utils";
import { SCROLL_AREA_ID } from "@/config/site";

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  useScrollAreaId?: boolean;
}

export const ScrollArea = ({
  useScrollAreaId = false,
  className,
  ...props
}: ScrollAreaProps) => (
  <div
    {...(useScrollAreaId && { id: SCROLL_AREA_ID })}
    className={cn("scrollable-area relative flex w-full flex-col", className)}
    {...props}
  />
);
