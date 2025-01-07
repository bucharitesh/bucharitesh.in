import React, { useMemo } from "react";
// import "./style.css";
import { cn } from "@/lib/utils";

const Guide = ({ x, y, borderRight, borderBottom, classNames }: any) => {
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
        } as React.CSSProperties
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
  columns:
    | {
        xs?: number;
        sm?: number;
        smd?: number;
        md?: number;
        lg?: number;
      }
    | number;
  rows:
    | {
        xs?: number;
        sm?: number;
        smd?: number;
        md?: number;
        lg?: number;
      }
    | number;
  children?: any;
  hideGuides?: "row" | "column";
}) => {
  const generateGuides = useMemo(() => {
    if (typeof columns === "number" && typeof rows === "number") {
      const guides: any = [];
      for (let y = 1; y < rows + 1; y++) {
        for (let x = 1; x < columns + 1; x++) {
          guides.push(
            <Guide
              key={`${x}-${y}`}
              x={x}
              y={y}
              borderRight={
                x === columns || (hideGuides && hideGuides === "column")
              }
              borderBottom={y === rows || (hideGuides && hideGuides === "row")}
            />
          );
        }
      }
      return (
        <div
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
        obj: typeof columns | typeof rows,
        currentBreakpoint: string
      ): number => {
        const index = breakpoints.indexOf(currentBreakpoint as any);
        for (let i = index; i < breakpoints.length; i++) {
          const value = obj[breakpoints[i] as keyof typeof obj];
          if (typeof value === "number") {
            return value;
          }
        }
        return 1; // Default to 1 if no value is found
      };

      breakpoints.forEach((breakpoint) => {
        const guides: React.ReactNode[] = [];

        const colCount = getNextAvailableValue(columns, breakpoint);
        const rowCount = getNextAvailableValue(rows, breakpoint);

        for (let y = 1; y < rowCount + 1; y++) {
          for (let x = 1; x < colCount + 1; x++) {
            guides.push(
              <Guide
                key={`${breakpoint}-${x}-${y}`}
                x={x}
                y={y}
                borderRight={colCount === x}
                borderBottom={rowCount === y}
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
  }, [columns, rows]);

  const getStyle = () => {
    let style = {};

    if (height) {
      if (height === "preserve-aspect-ratio") {
        style = {
          "--sm-height":
            "calc(var(--width) / var(--grid-columns) * var(--grid-rows))",
        };
      } else {
        style = {
          "--sm-height": height,
        };
      }
    } else {
      style = {
        "--sm-height": "fit content",
      };
    }

    if (typeof rows === "object" && typeof columns === "object") {
      style = {
        ...style,
        "--sm-grid-rows": rows.sm,
        "--md-grid-rows": rows.md,
        "--lg-grid-rows": rows.lg,
        "--sm-grid-columns": columns.sm,
        "--md-grid-columns": columns.md,
        "--lg-grid-columns": columns.lg,
      } as React.CSSProperties;
    }

    if (typeof rows === "number" && typeof columns === "number") {
      style = {
        ...style,
        "--grid-rows": rows,
        "--grid-columns": columns,
      };
    }

    style = {
      ...style,
    } as React.CSSProperties;

    return style as React.CSSProperties;
  };

  return (
    <section
      className="grid_grid__MIUsj"
      data-grid
      style={
        {
          ...getStyle(),
        } as React.CSSProperties
      }
    >
      {children}
      {generateGuides}
    </section>
  );
};

const GridCross = ({ row, column }: { row: number; column: number }) => {
  return (
    <div
      className="grid_cross__fUKA7"
      data-grid-cross
      style={
        {
          "--cross-row": row,
          "--cross-column": column,
        } as React.CSSProperties
      }
    >
      <div
        className="grid_crossLine__BTLQL"
        style={
          {
            width: "var(--cross-half-size)",
            height: "var(--cross-size)",
            "border-right-width": "var(--guide-width)",
          } as React.CSSProperties
        }
      ></div>
      <div
        className="grid_crossLine__BTLQL"
        style={
          {
            width: "var(--cross-size)",
            height: "var(--cross-half-size)",
            "border-bottom-width": "var(--guide-width)",
          } as React.CSSProperties
        }
      ></div>
    </div>
  );
};

Grid.Cross = GridCross;

interface GridCellProps {
  children: React.ReactNode;
  column?: any;
  row?: any;
  solid?: boolean;
}

const GridCell: React.FC<GridCellProps> = ({
  children,
  column,
  row,
  solid = true,
}: {
  children: any;
  solid?: boolean;
  column?:
    | {
        sm: string;
        md: string;
        lg: string;
      }
    | string;
  row?:
    | {
        sm: string;
        md: string;
        lg: string;
      }
    | string;
}) => {
  const css = (_a: string | number) => {
    if (typeof _a === "number") {
      return `${_a} / span 1`;
    }
    return _a;
  };

  function calculateDifference(input: string | number): any {
    if (typeof input === "number") {
      return input;
    }

    if (typeof input === "string") {
      const [numerator, denominator] = input.split("/").map(Number);

      // Calculate the difference (denominator - numerator)
      return denominator - numerator;
    }

    return "NaN";
  }

  const getStyle = () => {
    if (typeof row === "string" && typeof column === "string") {
      return {
        // 1/3 1/3
        "--sm-grid-row": row,
        "--sm-grid-column": column,
        "--sm-cell-rows": calculateDifference(row),
        "--sm-cell-columns": calculateDifference(column),
      } as React.CSSProperties;
    }

    if (typeof row === "object" && typeof column === "object") {
      return {
        "--sm-grid-row": css(row.sm),
        "--sm-grid-column": css(column.sm),

        "--smd-grid-row": css(row.md),
        "--smd-grid-column": css(column.md),

        "--lg-grid-row": css(row.lg),
        "--lg-grid-column": css(column.lg),

        "--sm-cell-rows": calculateDifference(row.sm),
        "--sm-cell-columns": calculateDifference(column.sm),

        "--smd-cell-rows": calculateDifference(row.sm),
        "--smd-cell-columns": calculateDifference(column.sm),

        // "--sm-cell-rows": "2",
        // "--smd-cell-rows": "1",

        // "--sm-cell-columns": "1",
        // "--smd-cell-columns": "",

        // column={{ sm: "1", md: "1/3" }}
        // row={{ sm: "1/3", md: 1 }}

        // "--xs-cell-columns": "NaN",
        // "--sm-cell-columns": "NaN",
        // "--smd-cell-columns": "",

        // column={{ sm: 1, md: "1/3", lg: "2/4" }}
        // row={{ sm: "5/7", md: 3, lg: 2 }}

        // "--sm-cell-columns": "1",
        // "--smd-cell-columns": "",
      } as React.CSSProperties;
    }

    return {
      "--sm-grid-row": "auto",
      "--sm-grid-column": "auto",
      "--sm-cell-rows": "auto",
      "--sm-cell-columns": "auto",
    } as React.CSSProperties;
  };

  return (
    <div className={`grid_block__lyImu`} data-grid-cell style={getStyle()}>
      {children}
    </div>
  );
};

Grid.Cell = GridCell;

const GridSystem = ({
  debug = false,
  guideWidth = 1,
  children,
}: {
  debug?: boolean;
  guideWidth?: number;
  children: any;
}) => {
  return (
    <div className="grid_unstable_gridSystemWrapper__9OFL9">
      <div
        className={cn("grid_gridSystem__LtQ2f", {
          grid_systemDebug__U9mKm: debug,
        })}
        style={{ "--guide-width": `${guideWidth}px` } as React.CSSProperties}
      >
        {children}
        <div className="grid_gridSystemLazyContent__qAuyX"></div>
        {debug && (
          <div
            className="before:flex before:border before:border-dashed before:border-[var(--guide-color)] before:bg-black before:text-white before:text-xs before:absolute before:right-2 before:top-2 before:p-1 before:px-2
                    before:xs:content-['xs'] before:sm:content-['smd'] before:md:content-['md'] before:lg:content-['lg'] before:animate-[disappear_2s_ease-out_forwards]"
          />
        )}
      </div>
    </div>
  );
};

Grid.System = GridSystem;

export default Grid;
