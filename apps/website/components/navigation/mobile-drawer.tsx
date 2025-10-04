import { ArrowUpRightIcon, AtSignIcon, CommandIcon } from 'lucide-react';

import { Button } from '@repo/design-system/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '@repo/design-system/components/ui/drawer';
import { VisuallyHidden } from '@repo/design-system/components/ui/visually-hidden';
import { USER } from '@/config/user';
import { DockConfig } from '@/lib/config';
import { useMounted } from '@/lib/hooks/use-mounted';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo, useState } from 'react';

export function MobileDrawer() {
  const [open, setOpen] = useState(false);
  const mounted = useMounted();

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" title="Toggle drawer">
        <CommandIcon size={16} />
      </Button>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" title="Toggle drawer">
          <CommandIcon size={16} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-4/5">
        <VisuallyHidden asChild>
          <DrawerTitle>Navigation Menu</DrawerTitle>
        </VisuallyHidden>
        <VisuallyHidden asChild>
          <DrawerDescription>
            Navigate through the website sections and social links
          </DrawerDescription>
        </VisuallyHidden>
        <div className="overflow-y-auto p-4">
          <div className="flex w-full flex-col space-y-4 text-sm">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="link-card inline-flex items-center gap-2 p-2"
                onClick={() => setOpen(false)}
              >
                <img
                  src={USER.image.profile}
                  alt="Ritesh"
                  width={40}
                  height={40}
                  loading="lazy"
                  className="rounded-full border shadow-xs"
                />
                <div className="flex flex-col">
                  <span className="font-semibold tracking-tight">
                    {USER.name}
                  </span>
                  <span className="text-neutral-600 dark:text-neutral-400">
                    {USER.tagline}
                  </span>
                </div>
              </Link>
              <div className="flex flex-col gap-1">
                {DockConfig.navbar.map((link) => (
                  <NavigationLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    icon={<link.icon className="h-4 w-4" />}
                    onClose={() => setOpen(false)}
                  />
                ))}
              </div>
            </div>
            <hr className="border-neutral-200 dark:border-neutral-800" />
            <div className="flex flex-col gap-2 text-sm">
              <span className="px-2 font-medium text-neutral-600 text-xs leading-relaxed dark:text-neutral-400">
                Social
              </span>
              <div className="flex flex-col gap-1">
                {Object.values(DockConfig.contact.social).map((profile) => (
                  <NavigationLink
                    key={profile.url}
                    href={profile.url}
                    label={profile.name}
                    icon={<profile.icon className="h-4 w-4" />}
                    onClose={() => setOpen(false)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export const NavigationLink = memo(({ href, label, icon, onClose }: any) => {
  const pathname = usePathname();
  const iconCmp = icon ?? <AtSignIcon size={16} />;

  const isInternal = href.startsWith('/');
  if (!isInternal) {
    return (
      <Link
        key={href}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between gap-2 rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-800"
        onClick={onClose}
      >
        <span className="inline-flex items-center gap-2 font-medium">
          {iconCmp}
          {label}
        </span>
        <ArrowUpRightIcon size={16} />
      </Link>
    );
  }

  let isActive = false;
  if (pathname?.length > 0) {
    const splittedPathname = pathname.split('/');
    const currentPathname = splittedPathname[1] ?? '';
    isActive = currentPathname === href.split('/')[1];
  }

  return (
    <Link
      key={href}
      href={href}
      className={cn(
        'group flex items-center justify-between rounded-lg p-2',
        isActive
          ? 'bg-black text-white dark:bg-neutral-800'
          : 'hover:bg-neutral-200 dark:hover:bg-neutral-800'
      )}
      onClick={onClose}
    >
      <span className="flex items-center gap-2">
        {iconCmp}
        <span
          className={cn(
            'font-medium',
            isActive && 'text-white dark:text-neutral-400'
          )}
        >
          {label}
        </span>
      </span>
    </Link>
  );
});
