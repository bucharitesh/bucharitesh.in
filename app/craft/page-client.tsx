"use client";

import { Craft } from "content-collections";
import { MasonryGrid } from "./masonary-grid";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";

export default function PageClient({ crafts }: { crafts: Craft[] }) {
  return (
    <MasonryGrid
      breakpoints={{
        sm: 1,
        lg: 2,
        xl: 3,
      }}
    >
      {crafts.map((item, index) => (
        <Card
          key={`${item.title}-${index}`}
          title={item.title}
          date={item.date.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
          href={`/craft/${item.slug}`}
          src={item.video}
          blurImage={item.blurImage}
          type="video"
          craft_type={item.type}
          theme={item.theme}
        />
      ))}
    </MasonryGrid>
  );
}

export interface MediaContentProps {
  src: string;
  title: string;
  type?: "image" | "video";
  aspectRatio?: string;
  width?: number;
  height?: number;
}

export const Card: React.FC<any> = ({
  title,
  date,
  src,
  href,
  width,
  craft_type,
  theme,
  height,
  position = "bottom",
  className = "",
  blurImage,
}: any) => {
  return (
    <div
      className={cn(
        "block w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden mb-6 transition-all duration-200",
        className,
        {
          "p-1": craft_type !== "none",
        }
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          "after:content-[''] after:absolute after:w-full after:h-[200px] after:bottom-[-64px] after:transition-opacity after:duration-200 after:pointer-events-none after:bg-gradient-to-t after:via-transparent after:to-transparent after:from-black/90",
          {
            "rounded-lg": craft_type !== "none",
          }
        )}
      >
        <div
          className="relative"
          style={{ aspectRatio: `${width}/${height}` }}
        >
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            poster={blurImage}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title and metadata */}
        <div
          className={cn(
            "absolute w-full h-8 gap-3 bottom-2 left-0 p-4 z-20 whitespace-nowrap transition-opacity delay-200 justify-between items-center flex flex-nowrap flex-row",
            {
              "top-2": position === "top",
              "bottom-2": position === "bottom",
            }
          )}
        >
          <div className={cn("text-neutral-900 dark:text-neutral-100 whitespace-nowrap overflow-ellipsis overflow-hidden text-sm", {
            "text-neutral-100": theme === "light",
            "text-neutral-900": theme === "dark",
          })}>
            {title}
          </div>
          <div className={cn("text-neutral-400 dark:text-neutral-400 whitespace-nowrap overflow-ellipsis overflow-hidden text-sm", {
            "text-neutral-400": theme === "light",
            "text-neutral-100": theme === "dark",
          })}>
            {date}
          </div>
        </div>
      </div>

      {/* Action button */}
      {craft_type !== "none" && (
        <Link
          href={href}
          data-fake-button
          className="
          h-10 mt-1
      bg-neutral-100 dark:bg-neutral-800
      rounded-lg
      flex items-center justify-center gap-1.5
      text-sm font-medium
      text-neutral-900 dark:text-neutral-100
      transition-colors duration-150
      hover:bg-neutral-200 dark:hover:bg-neutral-700
        "
        >
          {craft_type === "code"
            ? "Get Code"
            : craft_type === "component"
              ? "View Prototype"
              : "Read Article"}
          <ArrowRight
            size={16}
            className={href?.startsWith("http") ? "-rotate-45" : ""}
          />
        </Link>
      )}
    </div>
  );
};
