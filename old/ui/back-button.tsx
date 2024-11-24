"use client";

import { ChevronLeft } from "lucide-react";
import { Link, useTransitionRouter } from "next-view-transitions";
import React from "react";

const Back = ({ href }: { href?: string }) => {
  const router = useTransitionRouter();

  return (
    <Link
      // onClick={() => router.back()}
      href={href as string}
      className="group inline-flex items-center space-x-2 cursor-pointer"
    >
      <div className="transition rounded-full bg-primary/10 p-1 text-primary/80 group-hover:bg-primary/25 group-hover:text-primary">
        <ChevronLeft className="w-3 h-3 group-hover:scale-125 transition-transform group-active:scale-110" />
      </div>
      <div className="mt-0.5 text-primary/70 group-hover:text-primary/90 transition">
        back
      </div>
    </Link>
  );
};

export default Back;
