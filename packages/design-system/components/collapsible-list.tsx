import { ChevronDownIcon } from 'lucide-react';
import { Slot as SlotPrimitive } from 'radix-ui';
import React from 'react';

import { Button } from '@repo/design-system/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@repo/design-system/components/ui/collapsible';

const Slot = SlotPrimitive.Slot;

export function CollapsibleList<T>({
  items,
  max = 3,
  keyExtractor,
  renderItem,
}: {
  items: T[];
  max?: number;
  keyExtractor?: (item: T) => string;
  renderItem: (item: T, isFirst: boolean, isLast: boolean) => React.ReactNode;
}) {
  const totalItems = items.length;

  return (
    <Collapsible>
      {items.slice(0, max).map((item, index) => (
        <Slot
          key={typeof keyExtractor === 'function' ? keyExtractor(item) : index}
          className=""
        >
          {renderItem(item, index === 0, index === totalItems - 1)}
        </Slot>
      ))}

      <CollapsibleContent>
        {items.slice(max).map((item, index) => (
          <Slot
            key={
              typeof keyExtractor === 'function'
                ? keyExtractor(item)
                : max + index
            }
            className=""
          >
            {renderItem(item, false, max + index === totalItems - 1)}
          </Slot>
        ))}
      </CollapsibleContent>

      {items.length > max && (
        <div className="flex h-12 items-center justify-center pb-px">
          <CollapsibleTrigger asChild>
            <Button
              className="group/collapsible-trigger flex"
              variant="default"
            >
              <span className="hidden group-data-[state=closed]/collapsible-trigger:block">
                Show More
              </span>
              <span className="hidden group-data-[state=open]/collapsible-trigger:block">
                Show Less
              </span>
              <ChevronDownIcon
                className="group-data-[state=open]/collapsible-trigger:rotate-180"
                aria-hidden
              />
            </Button>
          </CollapsibleTrigger>
        </div>
      )}
    </Collapsible>
  );
}
