
"use client";

import React, { useState, useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Spatial Tooltip",
    date: "September 2024",
    src: "https://cdn.rauno.me/spatial-tooltip.mp4",
    aspectRatio: "2.22:1",
    type: "video",
  },
  {
    title: "Gooey Tooltip",
    date: "September 2024",
    src: "https://cdn.rauno.me/gooey-tooltip.mp4",
    aspectRatio: "1.56:1",
    type: "video",
  },
  {
    title: "Toolbar Morph",
    date: "September 2024",
    src: "https://cdn.rauno.me/toolbar-cmdk.mp4",
    aspectRatio: "1.18:1",
    type: "video",
    position: "top",
  },
  {
    title: "Staggered Text",
    date: "August 2024",
    src: "https://cdn.rauno.me/staggered-text.mp4",
    aspectRatio: "1.90:1",
    type: "video",
  },
  {
    title: "Designing Depth",
    date: "July 2024",
    src: "/static/media/og-depth.png",
    width: 2400,
    height: 1260,
    href: "/craft/depth",
    isWriting: true,
  },
  {
    title: "Logo Carousel",
    date: "May 2024",
    src: "video source",
    aspectRatio: "2.44:1",
    type: "video",
    href: "/craft/logo-carousel",
    isPrototype: true,
  },
  {
    title: "X-Ray Interaction",
    date: "May 2024",
    src: "video source",
    aspectRatio: "1.37:1",
    href: "https://vercel.com/security",
    type: "video",
  },
  {
    title: "Minimap",
    date: "April 2024",
    src: "video source",
    aspectRatio: "1.95:1",
    type: "video",
    href: "/craft/minimap",
    position: "top",
    isPrototype: true,
  },
  {
    title: "Blur Reveal",
    date: "April 2024",
    src: "video source",
    aspectRatio: "2.15:1",
    type: "video",
  },
  {
    title: "Wheel Interface",
    date: "April 2024",
    src: "video source",
    aspectRatio: "1.34:1",
    type: "video",
  },
  {
    title: "Devouring Details",
    date: "March 2024",
    src: "video source",
    aspectRatio: "1.83:1",
    href: "https://devouringdetails.com",
    position: "top",
    type: "video",
  },
  {
    title: "Running Diary",
    date: "February 2024",
    src: "video source",
    aspectRatio: "1.44:1",
    href: "/run",
    type: "video",
  },
  {
    title: "Contrasting Aesthetics",
    date: "January 2024",
    src: "/static/media/og-contrasting-aesthetics.png",
    width: 1200,
    height: 628,
    href: "/craft/contrasting-aesthetics",
    isWriting: true,
  },
  {
    title: "Word Lookup",
    date: "January 2024",
    src: "video source",
    aspectRatio: "1.47:1",
    position: "top",
    type: "video",
  },
  {
    title: "What will you ship?",
    date: "December 2023",
    src: "/static/media/og-vercel.jpg",
    width: 2048,
    height: 1660,
    href: "/craft/vercel",
    isWriting: true,
  },
  // ... Additional projects from 2023 and earlier
  {
    title: "SwiftUI MercuryOS",
    date: "September 2023",
    src: "video source",
    aspectRatio: "1.20:1",
    type: "video",
    attribution: "Designed by Jason Yuan",
  },
  {
    title: "⌘K Breadcrumbs",
    date: "December 2022",
    src: "video source",
    aspectRatio: "1.34:1",
    type: "video",
  },
];

// types.ts
export type BreakpointName = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type BreakpointConfig = {
  [key in BreakpointName]?: number;
};

export interface Project {
  title: string;
  date: string;
  src: string;
  type?: 'image' | 'video';
  aspectRatio?: string;
  width?: number;
  height?: number;
  href?: string;
  isPrototype?: boolean;
  isWriting?: boolean;
  position?: 'top' | 'bottom';
  attribution?: string;
}

export interface MasonryGridProps {
  gap?: number;
  breakpoints: BreakpointConfig;
  className?: string;
  children?: React.ReactNode;
}

export interface CardProps extends Project {
  className?: string;
}

export interface MediaContentProps {
  src: string;
  title: string;
  type?: 'image' | 'video';
  aspectRatio?: string;
  width?: number;
  height?: number;
}

// Tailwind breakpoint widths
const BREAKPOINT_WIDTHS: { [key in BreakpointName]: number } = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export const MasonryGrid: React.FC<MasonryGridProps> = ({
  gap = 1,
  breakpoints,
  className = '',
  children,
}) => {
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const calculateColumns = () => {
      const width = window.innerWidth;

      // Convert breakpoints object to sorted array
      const sortedBreakpoints = Object.entries(BREAKPOINT_WIDTHS)
        .map(([breakpoint, width]) => ({
          breakpoint: breakpoint as BreakpointName,
          width,
          columns: breakpoints[breakpoint as BreakpointName],
        }))
        .filter((bp) => bp.columns !== undefined)
        .sort((a, b) => a.width - b.width);

      // Find appropriate number of columns for current width
      let activeColumns = 1;
      for (const bp of sortedBreakpoints) {
        if (width >= bp.width && bp.columns) {
          activeColumns = bp.columns;
        }
      }

      return activeColumns;
    };

    // Initial calculation
    setColumns(calculateColumns());

    // Add resize listener
    const handleResize = () => {
      setColumns(calculateColumns());
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoints]);

  const columnElements = [...Array(columns)].map((_, columnIndex) => {
    const columnChildren = React.Children.toArray(children).filter(
      (_, index) => index % columns === columnIndex
    );

    return (
      <div
        key={columnIndex}
        className="pl-[var(--gap)] bg-clip-padding"
        style={{
          width: `${100 / columns}%`,
        }}
      >
        {columnChildren}
      </div>
    );
  });

  return (
    <main className={`flex flex-col relative min-h-screen my-auto mx-0 ${className}`}>
      <div
        style={
          {
            '--gap': gap,
          } as React.CSSProperties
        }
        className="flex pl-1 pr-2 w-auto h-screen ml-[calc(var(--gap)*-1)]"
      >
        {columnElements}
      </div>
    </main>
  );
};

const MediaContent: React.FC<MediaContentProps> = ({
  src,
  title,
  type = 'image',
  aspectRatio,
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

  const style = aspectRatio ? { aspectRatio } : { aspectRatio: `${width}/${height}` };

  if (type === 'video') {
    return (
      <div ref={mediaRef} style={style}>
        {isInView && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={src} type="video/mp4" />
          </video>
        )}
      </div>
    );
  }

  return (
    <img
      ref={mediaRef}
      src={src}
      alt={title}
      className="w-full h-full object-cover"
      style={style}
      loading="lazy"
      width={width}
      height={height}
    />
  );
};

export const Card: React.FC<any> = ({
  title,
  date,
  src,
  href,
  type = 'image',
  aspectRatio,
  width,
  height,
  position = 'bottom',
  isPrototype,
  isWriting,
  attribution,
  className = '',
}: any) => {
  const isInteractive = !!(href || isPrototype || isWriting);

  return (
    <div className={`
      block w-full bg-white dark:bg-gray-900 
      border border-gray-200 dark:border-gray-800 
      rounded-xl overflow-hidden mb-6 
      transition-all duration-200
      ${isInteractive ? 'hover:shadow-lg p-4' : ''}
      ${className}
    `}>
      <div className="relative rounded-lg overflow-hidden">
        <MediaContent 
          src={src}
          title={title}
          type={type}
          aspectRatio={aspectRatio}
          width={width}
          height={height}
        />

        {/* Gradient overlay */}
        <div className={`
          absolute inset-0 
          ${position === 'top' ? 'rotate-180' : ''}
          bg-gradient-to-t from-black/90 via-black/30 to-transparent
          transition-opacity duration-200
        `} />

        {/* Title and metadata */}
        <div className={`
          absolute w-full p-4 
          flex justify-between items-center
          ${position === 'top' ? 'top-0' : 'bottom-0'}
        `}>
          <div className="flex flex-col">
            <span className="text-white font-medium truncate">{title}</span>
            {attribution && (
              <span className="text-gray-400 text-sm">{attribution}</span>
            )}
          </div>
          <span className="text-gray-300 text-sm">{date}</span>
        </div>
      </div>

      {/* Action button */}
      {isInteractive && (
        <button className="
          w-full mt-4 h-10 
          bg-gray-100 dark:bg-gray-800 
          hover:bg-gray-200 dark:hover:bg-gray-700
          rounded-lg transition-colors
          flex items-center justify-center gap-2
          text-sm font-medium
        ">
          {isWriting ? 'Read Essay' : isPrototype ? 'View Prototype' : 'View Project'}
          <ExternalLink 
            size={16} 
            className={href?.startsWith('http') ? "-rotate-45" : ""} 
          />
        </button>
      )}
    </div>
  );
};

const Page = () => {
  return (
    <MasonryGrid
      breakpoints={{
        sm: 1,
        lg: 2,
        xl: 3,
      }}
    >
      {projects.map((item, index) => (
        <Card key={`${item.title}-${index}`} {...item} />
      ))}
    </MasonryGrid>
  );
}

export default Page;