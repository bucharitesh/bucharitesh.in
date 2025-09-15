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
        isActive
          ? 'border-1 border-black/10 border-inset border-dashed bg-grid dark:border-white/10'
          : 'hover:bg-muted',
        className
      )}
    >
      <span
        className={cn('font-medium', isActive && 'text-background-foreground')}
      >
        {title}
      </span>
      {description && (
        <span className={cn(isActive ? '' : 'text-muted')}>{description}</span>
      )}
    </Link>
  );
};
