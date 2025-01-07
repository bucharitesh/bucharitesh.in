"use client";

import { memo, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { ArrowLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SCROLL_AREA_ID } from "@/components/scroll-area";
import { cn } from "@/lib/utils";

const MobileDrawer = dynamic(() =>
  import("@/components/navigation/mobile-drawer").then(
    (mod) => mod.MobileDrawer,
  ),
);

export const MOBILE_SCROLL_THRESHOLD = 20;

export const FloatingHeader = memo(
  ({ className, scrollTitle, title, children }: any) => {
    const [transformValues, setTransformValues] = useState({
      translateY: 0,
      opacity: scrollTitle ? 0 : 1,
    });
    const pathname = usePathname();
    const isWritingPath = pathname.startsWith("/writing");

    const goBack = pathname.split("/").length > 2;
    const goBackLink = pathname.split("/").slice(0, -1).join("/") || "/";

    useEffect(() => {
      const scrollAreaElem = document.querySelector(`#${SCROLL_AREA_ID}`);

      const onScroll = (e) => {
        const scrollY = e.target.scrollTop;

        const translateY = Math.max(100 - scrollY, 0);
        const opacity = Math.min(
          Math.max(
            (scrollY -
              MOBILE_SCROLL_THRESHOLD *
                (MOBILE_SCROLL_THRESHOLD / (scrollY ** 2 / 100))) /
              100,
            0,
          ),
          1,
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

    return (
      <header
        className={cn(
          "sticky inset-x-0 top-0 z-50 mx-auto flex h-12 w-full shrink-0 items-center overflow-hidden border-b border-b-gray-200 dark:border-b-neutral-800 bg-white dark:bg-neutral-900 text-sm font-medium",
          className,
        )}
      >
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
                {title && (
                  <Balancer ratio={0.35}>
                    <span className="line-clamp-2 font-semibold tracking-tight">
                      {title}
                    </span>
                  </Balancer>
                )}
              </div>
            </div>
            {/* This is a hack to show writing views with framer motion reveal effect */}
            {scrollTitle && isWritingPath && (
              <div className="flex min-w-[50px] justify-end">{children}</div>
            )}
          </div>
        </div>
      </header>
    );
  },
);
