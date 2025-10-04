import { ChevronsDownUpIcon, ChevronsUpDownIcon } from 'lucide-react';

import { Button } from '@repo/design-system/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@repo/design-system/components/ui/collapsible';
import { Separator } from '@repo/design-system/components/ui/separator';
import { cn } from '@/lib/utils';

export function CodeCollapsibleWrapper({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Collapsible>) {
  return (
    <Collapsible
      className={cn('group/collapsible not-prose relative my-6', className)}
      {...props}
    >
      <CollapsibleTrigger asChild>
        <div className="absolute top-2 right-10 z-10 flex items-center gap-2">
          <Button className="size-6 rounded-md" variant="secondary" size="icon">
            <ChevronsDownUpIcon className="hidden group-data-[state=open]/collapsible:block" />
            <ChevronsUpDownIcon className="hidden group-data-[state=closed]/collapsible:block" />
          </Button>

          <Separator
            className="data-[orientation=vertical]:h-4"
            orientation="vertical"
          />
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent
        className="overflow-hidden data-[state=closed]:max-h-80 data-[state=closed]:rounded-b-lg [&>figure]:my-0"
        forceMount
      >
        {children}
      </CollapsibleContent>

      <CollapsibleTrigger className="absolute inset-x-0 bottom-0 flex h-24 items-end justify-center rounded-b-lg bg-linear-to-t from-25% from-code to-transparent pb-4 font-medium text-muted-foreground text-sm group-data-[state=open]/collapsible:hidden">
        Expand
      </CollapsibleTrigger>
    </Collapsible>
  );
}
