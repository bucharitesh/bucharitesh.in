"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "../ui/button";
import { Settings, Squirrel } from "lucide-react";
import Link from "next/link";
import { useBuddyStore } from "@/features/buddy/buddy-logic";

const BuddyConfig = () => {
  const { enabled } = useBuddyStore((s) => s.hedgehogConfig);

  return (
    <Link href="/buddy">
      <Button
        data-visible={enabled}
        data-scroll-direction={"up"}
        className={cn(
          "fixed top-1/2 -translate-y-1/2 right-0 rounded-full transition-all duration-300 z-50",
          "duration-300 data-[visible=true]:opacity-100 data-[visible=false]:opacity-0 rounded-none rounded-l-full"
        )}
        variant="default"
        size={"icon"}
      >
        <Settings className="size-5" />
        <span className="sr-only">Scroll to top</span>
      </Button>
    </Link>
  );
};

export default BuddyConfig;
