"use client";

import { useEffect, useState } from "react";
import { Snowfall } from "./snowfall";
import { getCurrentSeason } from "@/lib/utils";
import { SeasonsEffect } from "@/lib/utils";

export function Seasons() {
  const [mounted, setMounted] = useState(false);
  const [effect, setEffect] = useState<SeasonsEffect>("none");

  useEffect(() => {
    setMounted(true);
    setEffect(getCurrentSeason());
  }, []);

  if (!mounted) return null;

  switch (effect) {
    case "winter":
      return <Snowfall enabled={true} />;
    default:
      return null;
  }
}
