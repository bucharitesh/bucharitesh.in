"use client";

import React from "react";
import Link from "next/link";

import { Dock, DockIcon, DockIconActiveDot } from "./floating-dock";
import { ModeToggle } from "./mode-toggle";
import { usePathname } from "next/navigation";
import { DockConfig } from "@/lib/config" 

function BottomDock() {
  const pathname = usePathname();

  return (
    <Dock className="fixed z-40 left-1/2 -translate-x-1/2">
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
    </Dock>
  );
}

function DockSeperator() {
  return (
    <hr className="w-px h-[36px] border-0 shrink-0 bg-gray-400/50 mask-gradient" />
  );
}


export default BottomDock;
