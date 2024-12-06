"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { Dock, DockIcon, DockIconActiveDot } from "./floating-dock";
import { ModeToggle } from "./mode-toggle";
import { usePathname } from "next/navigation";
import { DockConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { useScreenSize } from "@/lib/hooks";

const DOCK_AUTOHIDE_TIMEOUT = 10_000;

function BottomDock() {
  const [active, setActive] = useState(true);
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout>();

  const { width } = useScreenSize();

  const isMobile = width < 1000;

  const startTimeout = () => {
    clearTimeout(timeoutRef.current); // Clear any existing timeout
    timeoutRef.current = setTimeout(() => {
      setActive(false);
    }, DOCK_AUTOHIDE_TIMEOUT);
  };

  useEffect(() => {
    if (!isMobile) startTimeout();
    return () => clearTimeout(timeoutRef.current);
  }, []);

  // if (isMobile) return null;

  return (
    <div
      onMouseEnter={() => {
        setActive(true);
        clearTimeout(timeoutRef.current); // Clear timeout when mouse enters
      }}
      onMouseLeave={() => {
        startTimeout(); // Start timeout when mouse leaves
      }}
      className="fixed bottom-0 h-[clamp(80px,10vh,200px)] w-full z-40 left-1/2 -translate-x-1/2"
    >
      <div className="absolute top-0 left-0 w-full h-full backdrop-blur [mask-image:linear-gradient(to_top,#000_25%,transparent)] [-webkit-mask-image:linear-gradient(to_top,#000_25%,transparent)]"></div>
      <Dock
        className={cn("transition-all", {
          "-bottom-[4.5rem]": !active,
        })}
      >
        {DockConfig.navbar.map((item) => (
          <DockIcon key={item.label} title={item.label}>
            <Link href={item.href}>
              <item.icon className="size-4" />
            </Link>
            {pathname === item.href && (
              <DockIconActiveDot isActive={pathname === item.href} />
            )}
          </DockIcon>
        ))}
        <DockSeperator />
        {Object.entries(DockConfig.contact.social).map(([name, social]) => (
          <DockIcon key={name} title={name}>
            <Link href={social.url}>
              <social.icon className="size-4" />
            </Link>
          </DockIcon>
        ))}
        <DockSeperator />
        <DockIcon title={"Theme"}>
          <ModeToggle />
        </DockIcon>
        {/* {session?.user?.email && (
          <DockIcon title={session?.user?.name}>
            <Link href={"/guestbook"}>
              <Image src={session?.user?.image} alt="Guestbook" fill />
            </Link>
          </DockIcon>
        )} */}
        {/* <DockFolder title="Guestbook">
          <DockIcon title="Guestbook"></DockIcon>
        </DockFolder> */}
      </Dock>
    </div>
  );
}

function DockSeperator() {
  return (
    <hr className="w-px h-[36px] border-0 shrink-0 bg-gray-400/50 mask-gradient" />
  );
}

export default BottomDock;
