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
        'flex flex-col gap-1 rounded-lg p-2 transition-all duration-300 *:transition-all *:duration-300',
        isActive
          ? 'bg-grid ring-1 ring-black/10 ring-inset dark:ring-white/10'
          : 'hover:ring-1 hover:ring-black/10 hover:ring-inset dark:hover:ring-white/10 ',
        className
      )}
    >
      <span
        className={cn('font-medium', isActive && 'text-background-foreground')}
      >
        {title}
      </span>
      {description && (
        <span className={cn(isActive ? '' : 'text-muted-foreground')}>
          {description}
        </span>
      )}
    </Link>
  );
};
