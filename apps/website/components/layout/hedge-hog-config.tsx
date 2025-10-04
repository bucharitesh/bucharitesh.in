'use client';

import { useBuddyStore } from '@/features/buddy/buddy-logic';
import { cn } from '@/lib/utils';
import { Settings } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@repo/design-system/components/ui/button';

const BuddyConfig = () => {
  const { enabled } = useBuddyStore((s) => s.hedgehogConfig);

  return (
    <Link href="/buddy">
      <Button
        data-visible={enabled}
        data-scroll-direction={'up'}
        className={cn(
          '-translate-y-1/2 fixed top-1/2 right-0 z-50 rounded-full transition-all duration-300',
          'rounded-none rounded-l-full duration-300 data-[visible=false]:opacity-0 data-[visible=true]:opacity-100'
        )}
        variant="default"
        size={'icon'}
      >
        <Settings className="size-5" />
        <span className="sr-only">Buddy Config</span>
      </Button>
    </Link>
  );
};

export default BuddyConfig;
