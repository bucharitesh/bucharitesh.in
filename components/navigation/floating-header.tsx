"use client";

import { memo, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { ArrowLeftIcon, RadioIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MOBILE_SCROLL_THRESHOLD, SCROLL_AREA_ID } from "@/lib/config";
import { SubmitBookmarkDrawer } from "../bookmarks/submit-bookmark/drawer";

const MobileDrawer = dynamic(() =>
  import("@/components/navigation/mobile-drawer").then(
    (mod) => mod.MobileDrawer
  )
);

export const FloatingHeader = memo(
  ({ className, scrollTitle, title, bookmarks, currentBookmark, children }: any) => {
    const [transformValues, setTransformValues] = useState({
      translateY: 0,
      opacity: scrollTitle ? 0 : 1,
    });
    const pathname = usePathname();
    const isBookmarksIndexPage = pathname === '/bookmarks'
    const isBookmarkPath = pathname.startsWith('/bookmarks')

    const goBack = pathname.split("/").length > 2;
    const goBackLink = pathname.split("/").slice(0, -1).join("/") || "/";

    useEffect(() => {
      const scrollAreaElem = document.querySelector(`#${SCROLL_AREA_ID}`);

      const onScroll = (e: any) => {
        const scrollY = e.target.scrollTop;

        const translateY = Math.max(100 - scrollY, 0);
        const opacity = Math.min(
          Math.max(
            (scrollY -
              MOBILE_SCROLL_THRESHOLD *
                (MOBILE_SCROLL_THRESHOLD / (scrollY ** 2 / 100))) /
              100,
            0
          ),
          1
        );

        setTransformValues({ translateY, opacity });
      };

      if (scrollTitle) {
        scrollAreaElem?.addEventListener("scroll", onScroll, {
          passive: true,
        });
      }
      return () => scrollAreaElem?.removeEventListener("scroll", onScroll);
    }, [scrollTitle]);

    const memoizedSubmitBookmarkDrawer = useMemo(
      () => <SubmitBookmarkDrawer bookmarks={bookmarks} currentBookmark={currentBookmark} />,
      [bookmarks, currentBookmark]
    )

    const memoizedBalancer = useMemo(
      () => (
        <Balancer ratio={0.35}>
          <span className="line-clamp-2 font-semibold tracking-tight">
            {title}
          </span>
        </Balancer>
      ),
      [title]
    );

    return (
      <header className="sticky inset-x-0 top-0 z-40 mx-auto flex h-12 w-full shrink-0 items-center overflow-hidden border-b bg-background text-sm font-medium lg:hidden">
        <div className="flex size-full items-center px-3">
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex flex-1 items-center gap-1">
              {goBack ? (
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0"
                  asChild
                >
                  <Link href={goBackLink} title="Go back">
                    <ArrowLeftIcon size={16} />
                  </Link>
                </Button>
              ) : (
                <MobileDrawer />
              )}
              <div className="flex flex-1 items-center justify-between">
                {scrollTitle && (
                  <span
                    className="line-clamp-2 font-semibold tracking-tight"
                    style={{
                      transform: `translateY(${transformValues.translateY}%)`,
                      opacity: transformValues.opacity,
                    }}
                  >
                    {scrollTitle}
                  </span>
                )}
                {title && memoizedBalancer}
              </div>
              <div className="flex items-center gap-2">
                {(isBookmarksIndexPage) && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={'/bookmarks/feed.xml'}
                      title="RSS feed"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <RadioIcon size={16} className="mr-2" />
                      RSS feed
                    </a>
                  </Button>
                )}
                {isBookmarkPath && memoizedSubmitBookmarkDrawer}
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
);
