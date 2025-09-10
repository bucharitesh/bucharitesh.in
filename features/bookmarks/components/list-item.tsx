'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

export const ListItem = ({
  title,
  description,
  path,
  className,
}: {
  title: string;
  description: string;
  path: string;
  className?: string;
}) => {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Link
      key={path}
      href={path}
      className={cn(
        'flex flex-col gap-1 rounded-lg p-2 transition-colors duration-300 *:transition-colors *:duration-300',
        isActive ? 'bg-foreground' : 'hover:bg-muted',
        className
      )}
    >
      <span className={cn('font-medium', isActive && 'text-background')}>
        {title}
      </span>
      {description && (
        <span
          className={cn(
            isActive ? 'text-background/70' : 'text-muted-foreground'
          )}
        >
          {description}
        </span>
      )}
    </Link>
  );
};
