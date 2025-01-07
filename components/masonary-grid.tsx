"use client";

import React from "react";
import { useEffect, useState } from "react";

export type BreakpointName = "sm" | "md" | "lg" | "xl" | "2xl";

export type BreakpointConfig = {
  [key in BreakpointName]?: number;
};

export interface MasonryGridProps {
  gap?: number;
  breakpoints: BreakpointConfig;
  className?: string;
  children?: React.ReactNode;
}

// Tailwind breakpoint widths
const BREAKPOINT_WIDTHS: { [key in BreakpointName]: number } = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export const MasonryGrid: React.FC<MasonryGridProps> = ({
  gap = 4,
  breakpoints,
  className = "",
  children,
}) => {
  const [columns, setColumns] = useState(3);

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
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoints]);

  const columnElements = [...Array(columns)].map((_, columnIndex) => {
    const columnChildren = React.Children.toArray(children).filter(
      (_, index) => index % columns === columnIndex,
    );

    return (
      <div
        key={columnIndex}
        className="bg-clip-padding"
        style={
          {
            "--gap": gap,
            paddingLeft: gap,
            paddingBottom: gap,
            width: `${100 / columns}%`,
          } as React.CSSProperties
        }
      >
        {columnChildren.map((child, index) => (
          <div
            key={index}
            style={{
              marginBottom: index < columnChildren.length - 1 ? gap : 0,
            }}
          >
            {child}
          </div>
        ))}
      </div>
    );
  });

  return (
    <div
      className={`flex pt-2 pl-1 flex-col relative min-h-screen my-auto mx-0 ${className}`}
    >
      <div
        style={
          {
            "--gap": gap,
            marginLeft: `calc(${gap}*-1)`,
          } as React.CSSProperties
        }
        className="flex pl-1 pr-2 w-auto h-screen"
      >
        {columnElements}
      </div>
    </div>
  );
};
