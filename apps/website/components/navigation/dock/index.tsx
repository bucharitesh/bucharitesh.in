'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import {
  Dock,
  DockIcon,
  DockIconActiveDot,
} from '@/components/shared/compoenents/floating-dock';
import { ENABLE_BUDDY } from '@/config/site';
import { useBuddyStore } from '@/features/buddy/buddy-logic';
import { BuddyBuddyStatic } from '@/features/buddy/renderer';
import { analytics } from '@/lib/analytics';
import { DockConfig } from '@/lib/config';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import ModeToggle from './mode-toggle';

const DOCK_AUTOHIDE_TIMEOUT = 5_000;

function BottomDock({ className }: { className: string }) {
  const [active, setActive] = useState(true);
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const enabled = useBuddyStore((s) => s.hedgehogConfig.enabled);
  const setBuddyModeEnabled = useBuddyStore((s) => s.setBuddyModeEnabled);
  const hedgehogConfig = useBuddyStore((s) => s.hedgehogConfig);

  // Helper function to determine if a dock item should be active
  const isItemActive = (itemHref: string) => {
    // For the home route "/", only match exactly
    if (itemHref === '/') {
      return pathname === '/';
    }
    // For all other routes, match if current path starts with the item href
    return pathname.startsWith(itemHref);
  };

  // const { data: session } = useSession();

  const startTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Clear any existing timeout
      timeoutRef.current = setTimeout(() => {
        setActive(false);
      }, DOCK_AUTOHIDE_TIMEOUT);
    }
  };

  useEffect(() => {
    startTimeout();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      onMouseEnter={() => {
        setActive(true);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current); // Clear timeout when mouse enters
        }
      }}
      onMouseLeave={() => {
        startTimeout(); // Start timeout when mouse leaves
      }}
      className={cn(
        '-translate-x-1/2 fixed bottom-0 left-1/2 z-40 h-[clamp(80px,10vh,200px)] w-full',
        className
      )}
    >
      <div className="mask-[linear-gradient(to_top,#000_25%,transparent)] absolute top-0 left-0 h-full w-full backdrop-blur-sm [-webkit-mask-image:linear-gradient(to_top,#000_25%,transparent)]" />
      <Dock
        className={cn('transition-all duration-300', {
          '-bottom-18': !active,
        })}
      >
        {DockConfig.navbar.map((item) => (
          <DockIcon key={item.label} title={item.label}>
            <Link
              href={item.href}
              onClick={() => analytics.trackNavClick(item.href, item.label)}
            >
              <item.icon className="size-4" />
            </Link>
            {isItemActive(item.href) && (
              <DockIconActiveDot isActive={isItemActive(item.href)} />
            )}
          </DockIcon>
        ))}
        <DockSeperator />
        {Object.entries(DockConfig.contact.social).map(([name, social]) => (
          <DockIcon key={name} title={name}>
            <Link
              href={social.url}
              target="_blank"
              onClick={() => {
                if (social.url.startsWith('mailto:')) {
                  const email = social.url.replace('mailto:', '');
                  analytics.trackEmailLinkClick(email);
                } else {
                  analytics.trackSocialLinkClick(name, social.url);
                }
              }}
            >
              <social.icon className="size-4" />
            </Link>
          </DockIcon>
        ))}
        <DockSeperator />
        {ENABLE_BUDDY && (
          <DockIcon
            title={'Buddy'}
            onMouseUp={() => setBuddyModeEnabled(!enabled)}
          >
            <BuddyBuddyStatic {...hedgehogConfig} />
            {enabled && <DockIconActiveDot isActive />}
          </DockIcon>
        )}

        <DockIcon title={'Theme'}>
          <ModeToggle />
        </DockIcon>

        {/* <DockIcon
          onMouseUp={async () => {
            if (session?.user?.email) {
              await signOut();
            } else {
              await signIn("github");
            }
          }}
          title={session?.user?.name ?? "Login"}
        >
          {session?.user?.email ? (
            <Image src={session?.user?.image} alt="Guestbook" fill />
          ) : (
            <Icons.signin className="size-4" />
          )}
        </DockIcon> */}

        {/* <DockFolder title="Guestbook">
          <DockIcon title="Guestbook"></DockIcon>
        </DockFolder> */}
      </Dock>
    </div>
  );
}

function DockSeperator() {
  return (
    <hr className="mask-gradient h-[36px] w-px shrink-0 border-0 bg-gray-400/50" />
  );
}

export default BottomDock;
