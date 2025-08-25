"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";

export interface MediaContentProps {
  src: string;
  title: string;
  type?: "image" | "video";
  aspectRatio?: number;
}

export const Card = ({
  title,
  date,
  src,
  href,
  craft_type,
  theme,
  aspectRatio = 4 / 3,
  position = "bottom",
  className = "",
  blurImage,
  type = "video",
}) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo = type === "video";
  const showContent = isVideo ? isVideoLoaded : isImageLoaded;

  useEffect(() => {
    if (!isVideo) return;

    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleLoaded = () => {
      if (videoElement.readyState >= 3) {
        setIsVideoLoaded(true);
      }
    };

    videoElement.addEventListener("loadeddata", handleLoaded);
    videoElement.addEventListener("canplay", handleLoaded);
    videoElement.addEventListener("playing", handleLoaded);

    if (videoElement.readyState >= 3) {
      handleLoaded();
    }

    return () => {
      videoElement.removeEventListener("loadeddata", handleLoaded);
      videoElement.removeEventListener("canplay", handleLoaded);
      videoElement.removeEventListener("playing", handleLoaded);
    };
  }, [isVideo]);

  return (
    <div
      className={cn(
        "block w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden transition-all duration-200",
        className,
        {
          "p-1": craft_type !== "none",
        },
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          "after:content-[''] after:absolute after:w-full after:h-[200px] after:bottom-[-64px] after:transition-opacity after:duration-200 after:pointer-events-none after:bg-gradient-to-t after:via-transparent after:to-transparent after:from-black/90",
          {
            "rounded-lg": craft_type !== "none",
          },
        )}
      >
        <div className="relative w-full" style={{ aspectRatio: aspectRatio }}>
          {/* Blur image - only show for videos */}
          {isVideo && (
            <img
              aria-hidden="true"
              className={cn(
                "absolute inset-0 w-full h-full transition-opacity duration-300",
                {
                  "opacity-0": showContent,
                  "opacity-100": !showContent,
                },
              )}
              src={blurImage}
              style={{
                filter: "blur(32px)",
                transform: "scale(1) translateZ(0px)",
              }}
              alt=""
            />
          )}

          {/* Main content: either video or image */}
          {isVideo ? (
            <video
              ref={videoRef}
              src={src}
              autoPlay
              loop
              muted
              playsInline
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
                {
                  "opacity-0": !isVideoLoaded,
                  "opacity-100": isVideoLoaded,
                },
              )}
            />
          ) : (
            <img
              src={src}
              onLoad={() => setIsImageLoaded(true)}
              className="absolute inset-0 w-full h-full object-cover"
              alt={title}
            />
          )}
        </div>

        {/* Title and metadata */}
        <div
          className={cn(
            "absolute w-full h-8 gap-3 bottom-2 left-0 p-4 z-20 whitespace-nowrap transition-opacity delay-200 justify-between items-center flex flex-nowrap flex-row",
            {
              "top-2": position === "top",
              "bottom-2": position === "bottom",
            },
          )}
        >
          <div
            className={cn(
              "whitespace-nowrap overflow-ellipsis overflow-hidden text-sm",
              {
                "text-neutral-100": theme === "light",
                "text-neutral-900": theme === "dark",
              },
            )}
          >
            {title}
          </div>
          <div
            className={cn(
              "whitespace-nowrap overflow-ellipsis overflow-hidden text-sm",
              {
                "text-neutral-400": theme === "light",
                "text-neutral-800/60": theme === "dark",
              },
            )}
          >
            {date}
          </div>
        </div>
      </div>

      {/* Action button */}
      {craft_type !== "none" && (
        <Link
          href={href}
          target={href?.startsWith("http") ? "_blank" : undefined}
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
          {craft_type === "project"
            ? "View Live"
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
