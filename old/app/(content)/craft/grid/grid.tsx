import React, { useMemo } from "react";
import "./style.css";
import { cn } from "@/old/lib/utils";

type GridType = string | number;

interface GridRowColType {
  xs?: GridType;
  sm?: GridType;
  smd?: GridType;
  md?: GridType;
  lg?: GridType;
}

interface CustomCSSProperties extends React.CSSProperties {
  "--x"?: number;
  "--y"?: number;
  "--cross-row"?: number;
  "--cross-column"?: number;
  "--cross-half-size"?: string;
  "--cross-size"?: string;
  "--guide-width"?: string;
  "--width"?: string;
  "--sm-height"?: string;
  "--grid-rows"?: number;
  "--grid-columns"?: number;
  // Grid rows for all breakpoints
  "--xs-grid-rows"?: GridType;
  "--sm-grid-rows"?: GridType;
  "--smd-grid-rows"?: GridType;
  "--md-grid-rows"?: GridType;
  "--lg-grid-rows"?: GridType;
  // Grid columns for all breakpoints
  "--xs-grid-columns"?: GridType;
  "--sm-grid-columns"?: GridType;
  "--smd-grid-columns"?: GridType;
  "--md-grid-columns"?: GridType;
  "--lg-grid-columns"?: GridType;
  // Grid row positions for all breakpoints
  "--xs-grid-row"?: string;
  "--sm-grid-row"?: string;
  "--smd-grid-row"?: string;
  "--md-grid-row"?: string;
  "--lg-grid-row"?: string;
  // Grid column positions for all breakpoints
  "--xs-grid-column"?: string;
  "--sm-grid-column"?: string;
  "--smd-grid-column"?: string;
  "--md-grid-column"?: string;
  "--lg-grid-column"?: string;
  // Cell rows for all breakpoints
  "--xs-cell-rows"?: string | number;
  "--sm-cell-rows"?: string | number;
  "--smd-cell-rows"?: string | number;
  "--md-cell-rows"?: string | number;
  "--lg-cell-rows"?: string | number;
  // Cell columns for all breakpoints
  "--xs-cell-columns"?: string | number;
  "--sm-cell-columns"?: string | number;
  "--smd-cell-columns"?: string | number;
  "--md-cell-columns"?: string | number;
  "--lg-cell-columns"?: string | number;
}

interface GridProps {
  height?: string;
  columns?: GridType | GridRowColType;
  rows?: GridType | GridRowColType;
  children?: React.ReactNode;
  hideGuides?: "row" | "column";
}

interface GridCellProps {
  children: React.ReactNode;
  column?: GridType | GridRowColType;
  row?: GridType | GridRowColType;
  solid?: boolean;
}

interface GridSystemProps {
  debug?: boolean;
  guideWidth?: number;
  children: React.ReactNode;
}

interface GridCrossProps {
  row: number;
  column: number;
}

const Guide = ({
  x,
  y,
  borderRight,
  borderBottom,
  classNames,
}: {
  x: number;
  y: number;
  borderRight: boolean;
  borderBottom: boolean;
  classNames?: string;
}) => {
  return (
    <div
      aria-hidden="true"
      className={cn("grid_guide__Ei25j", classNames)}
      style={
        {
          "--x": x,
          "--y": y,
          "border-right": borderRight ? "none" : undefined,
          "border-bottom": borderBottom ? "none" : undefined,
        } as CustomCSSProperties
      }
    />
  );
};

const Grid = ({
  columns,
  rows,
  height,
  children,
  hideGuides,
}: {
  height?: string;
  columns?: GridType | GridRowColType;
  rows?: GridType | GridRowColType;
  children?: React.ReactNode;
  hideGuides?: "row" | "column";
}) => {
  const generateGuides = useMemo(() => {
    if (typeof columns === "number" && typeof rows === "number") {
      const guides: React.ReactNode[] = [];
      for (let y = 1; y < rows + 1; y++) {
        for (let x = 1; x < columns + 1; x++) {
          guides.push(
            <Guide
              key={`${x}-${y}`}
              x={x}
              y={y}
              borderRight={x === columns || hideGuides === "column"}
              borderBottom={y === rows || hideGuides === "row"}
            />
          );
        }
      }
      return (
        <div
          key="single-breakpoint-guides"
          aria-hidden="true"
          className="grid_guides__XbybQ"
          data-grid-guides="true"
        >
          {guides}
        </div>
      );
    }

    if (typeof columns === "object" && typeof rows === "object") {
      const breakpointGuide: React.ReactNode[] = [];
      const breakpoints = ["xs", "sm", "smd", "md", "lg"] as const;

      const getNextAvailableValue = (
        obj: GridRowColType,
        currentBreakpoint: string
      ): number => {
        const index = breakpoints.indexOf(currentBreakpoint as any);
        for (let i = index; i < breakpoints.length; i++) {
          const value = obj[breakpoints[i] as keyof typeof obj];
          if (typeof value === "number") {
            return value;
          }
        }
        return 1;
      };

      breakpoints.forEach((breakpoint) => {
        const guides: React.ReactNode[] = [];

        const colCount = getNextAvailableValue(
          columns as GridRowColType,
          breakpoint
        );
        const rowCount = getNextAvailableValue(
          rows as GridRowColType,
          breakpoint
        );

        for (let y = 1; y < rowCount + 1; y++) {
          for (let x = 1; x < colCount + 1; x++) {
            guides.push(
              <Guide
                key={`${breakpoint}-${x}-${y}`}
                x={x}
                y={y}
                borderRight={colCount === x || hideGuides === "column"}
                borderBottom={rowCount === y || hideGuides === "row"}
                classNames={cn("", {
                  grid_xsGuide__Xupsz: breakpoint === "xs",
                  grid_smGuide__dhwwf: breakpoint === "sm",
                  grid_smdGuide__pWYK7: breakpoint === "smd",
                  grid_mdGuide__Kf1OM: breakpoint === "md",
                  grid_lgGuide__2OXaB: breakpoint === "lg",
                })}
              />
            );
          }
        }

        breakpointGuide.push(
          <div
            key={`breakpoint-${breakpoint}`}
            aria-hidden="true"
            className="grid_guides__XbybQ"
            data-grid-guides="true"
          >
            {guides}
          </div>
        );
      });

      return breakpointGuide;
    }

    return null;
  }, [columns, rows, hideGuides]);

  const getStyle = (): CustomCSSProperties => {
    let style: CustomCSSProperties = {};

    if (height) {
      if (height === "preserve-aspect-ratio") {
        style["--sm-height"] =
          "calc(var(--width) / var(--grid-columns) * var(--grid-rows))";
      } else {
        style["--sm-height"] = height;
      }
    }

    if (typeof rows === "object" && typeof columns === "object") {
      const breakpoints = ["xs", "sm", "smd", "md", "lg"] as const;
      breakpoints.forEach((bp) => {
        if (rows[bp]) style[`--${bp}-grid-rows`] = rows[bp];
        if (columns[bp]) style[`--${bp}-grid-columns`] = columns[bp];
      });
    }

    if (typeof rows === "number" && typeof columns === "number") {
      style["--grid-rows"] = rows;
      style["--grid-columns"] = columns;
    }

    return style;
  };

  return (
    <section className="grid_grid__MIUsj" data-grid style={getStyle()}>
      {children}
      {generateGuides}
    </section>
  );
};

const GridCell: React.FC<GridCellProps> = ({
  children,
  column,
  row,
  solid = false,
}) => {
  const css = (value: string | number | undefined): string => {
    if (typeof value === "number") return `${value} / span 1`;
    if (typeof value === "string") return value;
    return "auto";
  };

  const getStyle = (): CustomCSSProperties => {
    if (typeof row === "string" && typeof column === "string") {
      return {
        "--sm-grid-row": row,
        "--sm-grid-column": column,
      };
    }

    if (typeof row === "object" && typeof column === "object") {
      const style: CustomCSSProperties = {};
      const breakpoints = ["xs", "sm", "smd", "md", "lg"] as const;

      breakpoints.forEach((bp) => {
        if (row?.[bp]) style[`--${bp}-grid-row`] = css(row[bp]);
        if (column?.[bp]) style[`--${bp}-grid-column`] = css(column[bp]);
      });

      return style;
    }

    return {
      "--sm-grid-row": "auto",
      "--sm-grid-column": "auto",
    };
  };

  return (
    <div className="grid_block__lyImu" data-grid-cell style={getStyle()}>
      {children}
    </div>
  );
};

const GridCross = ({ row, column }: GridCrossProps) => (
  <div
    className="grid_cross__fUKA7"
    data-grid-cross
    style={
      {
        "--cross-row": row,
        "--cross-column": column,
      } as CustomCSSProperties
    }
  >
    <div
      className="grid_crossLine__BTLQL"
      style={
        {
          width: "var(--cross-half-size)",
          height: "var(--cross-size)",
          borderRightWidth: "var(--guide-width)",
        } as CustomCSSProperties
      }
    />
    <div
      className="grid_crossLine__BTLQL"
      style={
        {
          width: "var(--cross-size)",
          height: "var(--cross-half-size)",
          borderBottomWidth: "var(--guide-width)",
        } as CustomCSSProperties
      }
    />
  </div>
);

const GridSystem = ({
  debug = false,
  guideWidth = 1,
  children,
}: GridSystemProps) => (
  <div className="grid_unstable_gridSystemWrapper__9OFL9">
    <div
      className={cn("grid_gridSystem__LtQ2f", {
        grid_systemDebug__U9mKm: debug,
      })}
      style={{ "--guide-width": `${guideWidth}px` } as CustomCSSProperties}
    >
      {children}
      <div className="grid_gridSystemLazyContent__qAuyX" />
      {debug && (
        <div className="before:flex before:border before:border-dashed before:border-[var(--guide-color)] before:bg-black before:text-white before:text-xs before:absolute before:right-2 before:top-2 before:p-1 before:px-2 before:xs:content-['xs'] before:sm:content-['smd'] before:md:content-['md'] before:lg:content-['lg'] before:animate-[disappear_2s_ease-out_forwards]" />
      )}
    </div>
  </div>
);

Grid.Cell = GridCell;
Grid.Cross = GridCross;
Grid.System = GridSystem;

export default Grid;
