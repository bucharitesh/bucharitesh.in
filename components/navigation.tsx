"use client";

import { useScreenSize } from "@/lib/hooks";
import { FloatingHeader } from "./floating-header";
import BottomDock from "./dock";

export function Navigation() {
  const { width } = useScreenSize();
  const isMobile = width < 1000;

  if (isMobile) return <FloatingHeader />;

  return <BottomDock />;
}
