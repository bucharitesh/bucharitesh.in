"use client";

import { Post } from "content-collections";
import { MasonryGrid } from "./masonary-grid";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/old/lib/utils";

export default function PageClient({ posts }: { posts: Post[] }) {
  return (
    <MasonryGrid
      breakpoints={{
        sm: 1,
        lg: 2,
        xl: 3,
      }}
    >
      {posts.map((item, index) => (
        <Card
          key={`${item.title}-${index}`}
          title={item.title}
          date={"121312312"}
          src={item.video}
          type="video"
          craft_type={item.type}
          // position={index % 3 === 0 ? "top" : "bottom"}
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

const MediaContent: React.FC<MediaContentProps> = ({
  src,
  title,
  type = "image",
  width,
  height,
}) => {
  const mediaRef = useRef<any>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!mediaRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(mediaRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="relative"
      ref={mediaRef}
      style={{ aspectRatio: `${width}/${height}` }}
    >
      <img
        aria-hidden="true"
        ref={mediaRef}
        src={src}
        alt={title}
        style={{
          filter: "blur(32px)",
          transform: "scale(1) translateZ(0px)",
        }}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        width={width}
        height={height}
      />
      {isInView && (
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};

export const Card: React.FC<any> = ({
  title,
  date,
  src,
  href,
  type = "image",
  width,
  craft_type,
  height,
  position = "bottom",
  className = "",
}: any) => {
  return (
    <div
      className={cn(
        "block w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6 transition-all duration-200",
        className,
        {
          "p-1": craft_type !== "none",
        }
      )}
    >
      <div
        className={cn("relative overflow-hidden", 
        "after:content-[''] after:absolute after:w-full after:h-[200px] after:bottom-[-64px] after:transition-opacity after:duration-200 after:pointer-events-none after:bg-gradient-to-t after:from-white/90 after:via-transparent after:to-transparent dark:after:from-black/90",
          {
            "rounded-lg": craft_type !== "none",
          }
        )}
      >
        <MediaContent
          src={src}
          title={title}
          type={type}
          width={width}
          height={height}
        />

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
          <div className="text-[#171717] whitespace-nowrap overflow-ellipsis overflow-hidden text-sm">
            {title}
          </div>
          <div className="text-[#171717] whitespace-nowrap overflow-ellipsis overflow-hidden text-sm">
            {date}
          </div>
        </div>
      </div>

      {/* Action button */}
      {craft_type !== "none" && (
        <div
          data-fake-button
          className="
          h-10 mt-1
      bg-gray-100 dark:bg-gray-800
      rounded-lg
      flex items-center justify-center gap-1.5
      text-sm font-medium
      text-gray-900 dark:text-gray-100
      transition-colors duration-150
      hover:bg-gray-200 dark:hover:bg-gray-700
        "
        >
          {craft_type === "essay"
            ? "Read Essay"
            : craft_type === "demo"
              ? "View Prototype"
              : "Read Article"}
          <ArrowRight
            size={16}
            className={href?.startsWith("http") ? "-rotate-45" : ""}
          />
        </div>
      )}
    </div>
  );
};
