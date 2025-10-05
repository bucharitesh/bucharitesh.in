'use client';

import { useCommandState } from 'cmdk';
import type { LucideProps } from 'lucide-react';
import {
  CornerDownLeftIcon,
  LetterTextIcon,
  MoonStarIcon,
  RssIcon,
  SunIcon,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

// import type { Post } from "@/features/blog/types/post";
// import { SOCIAL_LINKS } from "@/features/profile/data/social-links";
import { cn } from '@/lib/utils';
// import { copyText } from "@/utils/copy";
import { Button } from '@repo/design-system/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@repo/design-system/components/ui/command';
import { Separator } from '@repo/design-system/components/ui/separator';

type CommandLinkItem = {
  title: string;
  href: string;

  icon?: React.ComponentType<LucideProps>;
  iconImage?: string;
  keywords?: string[];
  openInNewTab?: boolean;
};

const MENU_LINKS: CommandLinkItem[] = [
  {
    title: 'Daifolio',
    href: '/',
    icon: RssIcon,
  },
  {
    title: 'Blog',
    href: '/blog',
    icon: RssIcon,
  },
  {
    title: 'Components',
    href: '/components',
    icon: RssIcon,
  },
];

const DAIFOLIO_LINKS: CommandLinkItem[] = [
  {
    title: 'About',
    href: '/#about',
    icon: LetterTextIcon,
  },
];

// const SOCIAL_LINK_ITEMS: CommandLinkItem[] = SOCIAL_LINKS.map((item) => ({
//   title: item.title,
//   href: item.href,
//   iconImage: item.icon,
//   openInNewTab: true,
// }));

export function CommandMenu() {
  const router = useRouter();

  const { setTheme } = useTheme();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    document.addEventListener(
      'keydown',
      (e: KeyboardEvent) => {
        if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
          if (
            (e.target instanceof HTMLElement && e.target.isContentEditable) ||
            e.target instanceof HTMLInputElement ||
            e.target instanceof HTMLTextAreaElement ||
            e.target instanceof HTMLSelectElement
          ) {
            return;
          }

          e.preventDefault();
          setOpen((open) => !open);
        }
      },
      { signal }
    );

    return () => abortController.abort();
  }, []);

  const handleOpenLink = useCallback(
    (href: string, openInNewTab = false) => {
      setOpen(false);

      if (openInNewTab) {
        window.open(href, '_blank', 'noopener');
      } else {
        router.push(href);
      }
    },
    [router]
  );

  const handleCopyText = useCallback((text: string, message: string) => {
    setOpen(false);
    // copyText(text);
    toast.success(message);
  }, []);

  const handleThemeChange = useCallback(
    (theme: 'light' | 'dark' | 'system') => {
      setOpen(false);
      setTheme(theme);
    },
    [setTheme]
  );

  //   const { blogLinks, componentLinks } = useMemo(
  //     () => ({
  //       blogLinks: posts
  //         .filter((post) => post.metadata?.category !== "components")
  //         .map(postToCommandLinkItem),
  //       componentLinks: posts
  //         .filter((post) => post.metadata?.category === "components")
  //         .map(postToCommandLinkItem),
  //     }),
  //     [posts]
  //   );

  return (
    <>
      {/* <Button
        variant="secondary"
        className={cn(
          'h-8 select-none gap-1.5 rounded-full bg-zinc-50 px-2.5 text-muted-foreground hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-900',
          'not-dark:border dark:inset-shadow-[1px_1px_1px,0px_0px_2px] dark:inset-shadow-white/15'
        )}
        onClick={() => setOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 16"
          aria-hidden
        >
          <path
            d="M10.278 11.514a5.824 5.824 0 1 1 1.235-1.235l3.209 3.208A.875.875 0 0 1 14.111 15a.875.875 0 0 1-.624-.278l-3.209-3.208Zm.623-4.69a4.077 4.077 0 1 1-8.154 0 4.077 4.077 0 0 1 8.154 0Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>

        <span className="font-medium font-sans text-sm/4 sm:hidden">
          Search
        </span>

        <CommandMenuKbd className="hidden tracking-wider sm:in-[.os-macos_&]:flex">
          ⌘K
        </CommandMenuKbd>
        <CommandMenuKbd className="hidden sm:not-[.os-macos_&]:flex">
          Ctrl K
        </CommandMenuKbd>
      </Button> */}

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />

        <CommandList className="min-h-80">
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandLinkGroup
            heading="Menu"
            links={MENU_LINKS}
            onLinkSelect={handleOpenLink}
          />

          <CommandSeparator />

          <CommandLinkGroup
            heading="Daifolio"
            links={DAIFOLIO_LINKS}
            onLinkSelect={handleOpenLink}
          />

          <CommandSeparator />

          {/* <CommandLinkGroup
            heading="Blog"
            links={blogLinks}
            fallbackIcon={TextIcon}
            onLinkSelect={handleOpenLink}
          /> */}

          {/* <CommandSeparator /> */}

          {/* <CommandLinkGroup
            heading="Components"
            links={componentLinks}
            fallbackIcon={Icons.react}
            onLinkSelect={handleOpenLink}
          /> */}

          {/* <CommandSeparator /> */}

          {/* <CommandLinkGroup
            heading="Social Links"
            links={SOCIAL_LINK_ITEMS}
            onLinkSelect={handleOpenLink}
          /> */}

          {/* <CommandSeparator /> */}

          <CommandGroup heading="Theme">
            <CommandItem
              keywords={['theme']}
              onSelect={() => handleThemeChange('light')}
            >
              <SunIcon />
              Light
            </CommandItem>
            <CommandItem
              keywords={['theme']}
              onSelect={() => handleThemeChange('dark')}
            >
              <MoonStarIcon />
              Dark
            </CommandItem>
            <CommandItem
              keywords={['theme']}
              onSelect={() => handleThemeChange('system')}
            >
              {/* <Icons.contrast /> */}
              Auto
            </CommandItem>
          </CommandGroup>
        </CommandList>

        <CommandMenuFooter />
      </CommandDialog>
    </>
  );
}

function CommandLinkGroup({
  heading,
  links,
  fallbackIcon,
  onLinkSelect,
}: {
  heading: string;
  links: CommandLinkItem[];
  fallbackIcon?: React.ComponentType<LucideProps>;
  onLinkSelect: (href: string, openInNewTab?: boolean) => void;
}) {
  return (
    <CommandGroup heading={heading}>
      {links.map((link) => {
        const Icon = link?.icon ?? fallbackIcon ?? React.Fragment;

        return (
          <CommandItem
            key={link.href}
            keywords={link.keywords}
            onSelect={() => onLinkSelect(link.href, link.openInNewTab)}
          >
            {link?.iconImage ? (
              <Image
                className="rounded-xs"
                src={link.iconImage}
                alt={link.title}
                width={16}
                height={16}
                unoptimized
              />
            ) : (
              <Icon />
            )}
            {link.title}
          </CommandItem>
        );
      })}
    </CommandGroup>
  );
}

type CommandKind = 'command' | 'page' | 'link';

type CommandMetaMap = Map<
  string,
  {
    commandKind: CommandKind;
  }
>;

function buildCommandMetaMap() {
  const commandMetaMap: CommandMetaMap = new Map();

  commandMetaMap.set('Download vCard', { commandKind: 'command' });

  commandMetaMap.set('Light', { commandKind: 'command' });
  commandMetaMap.set('Dark', { commandKind: 'command' });
  commandMetaMap.set('Auto', { commandKind: 'command' });

  commandMetaMap.set('Copy Mark as SVG', {
    commandKind: 'command',
  });
  commandMetaMap.set('Copy Logotype as SVG', {
    commandKind: 'command',
  });
  commandMetaMap.set('Download Brand Assets', {
    commandKind: 'command',
  });

  //   SOCIAL_LINK_ITEMS.forEach((item) => {
  //     commandMetaMap.set(item.title, {
  //       commandKind: "link",
  //     });
  //   });

  return commandMetaMap;
}

const COMMAND_META_MAP = buildCommandMetaMap();

const ENTER_ACTION_LABELS: Record<CommandKind, string> = {
  command: 'Run Command',
  page: 'Go to Page',
  link: 'Open Link',
};

function CommandMenuFooter() {
  const selectedCommandKind = useCommandState(
    (state) => COMMAND_META_MAP.get(state.value)?.commandKind ?? 'page'
  );

  return (
    <>
      <div className="flex h-10" />
      <div className="absolute inset-x-0 bottom-0 flex h-10 items-center justify-between gap-2 border-t bg-zinc-100/30 px-4 font-medium text-xs dark:bg-zinc-800/30">
        <div className="flex shrink-0 items-center gap-2">
          <span>{ENTER_ACTION_LABELS[selectedCommandKind]}</span>
          <CommandMenuKbd>
            <CornerDownLeftIcon />
          </CommandMenuKbd>
          <Separator
            orientation="vertical"
            className="data-[orientation=vertical]:h-4"
          />
          <span className="text-muted-foreground">Exit</span>
          <CommandMenuKbd>Esc</CommandMenuKbd>
        </div>
      </div>
    </>
  );
}

function CommandMenuKbd({ className, ...props }: React.ComponentProps<'kbd'>) {
  return (
    <kbd
      className={cn(
        'pointer-events-none flex h-5 min-w-6 select-none items-center justify-center gap-1 rounded-xs bg-black/5 px-1 font-normal font-sans text-[13px] text-muted-foreground shadow-[inset_0_-1px_2px] shadow-black/10 [&_svg:not([class*= dark:bg-white/10 dark:text-shadow-xs dark:shadow-white/10',
        className
      )}
      {...props}
    />
  );
}

// function postToCommandLinkItem(post: Post): CommandLinkItem {
//   const isComponent = post.metadata?.category === "components";

//   return {
//     title: post.metadata.title,
//     href: isComponent ? `/components/${post.slug}` : `/blog/${post.slug}`,
//     keywords: isComponent ? ["component"] : undefined,
//   };
// }
