import React, { ReactElement, ReactNode } from "react"

interface GridProps {
  rows: number
  columns: number
  children: ReactElement<GridCellProps | GridCrossProps>[]
}

interface GridCellProps {
  row: number | "auto"
  column: number | "auto"
  children: ReactNode
}

interface GridCrossProps {
  row?: number
  column?: number
  size?: number
  color?: string
  guideWidth?: number
}

const Cell: React.FC<GridCellProps> = ({ row, column, children }) => {
  return (
    <div
      className="grid-cell"
      style={{
        gridRow: row,
        gridColumn: column,
      }}
    >
      {children}
    </div>
  )
}

const Cross: React.FC<GridCrossProps> = ({
  row = -1,
  column = -1,
  size = 16,
  color = "var(--colors-gray12)",
  guideWidth = 1.5,
}) => {
  const halfSize = size / 2 + guideWidth - 0.5

  return (
    <div
      className="pointer-events-none absolute z-[2]"
      style={
        {
          "--cross-row": row,
          "--cross-column": column,
          "--guide-width": `${guideWidth}px`,
          "--cross-size": `${size}px`,
          "--cross-color": color,
          "--cross-half-size": `${halfSize}px`,
          width: "fit-content",
          height: "fit-content",
          gridColumnStart: "var(--cross-column)",
          gridRowStart: "var(--cross-row)",
          inset: `calc(var(--cross-half-size) * -1)`,
        } as React.CSSProperties
      }
    >
      <div
        className="absolute border-0"
        style={{
          width: "var(--cross-half-size)",
          height: "var(--cross-size)",
          borderRightWidth: "var(--guide-width)",
          borderColor: "var(--cross-color)",
          borderStyle: "solid",
        }}
      />
      <div
        className="absolute border-0"
        style={{
          width: "var(--cross-size)",
          height: "var(--cross-half-size)",
          borderBottomWidth: "var(--guide-width)",
          borderColor: "var(--cross-color)",
          borderStyle: "solid",
        }}
      />
    </div>
  )
}

const Grid: React.FC<GridProps> & {
  Cell: typeof Cell
  Cross: typeof Cross
} = ({ rows, columns, children }) => {
  return (
    <div
      className="grid border-2 border-r-0 border-b-0 border-gray-600 relative"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
      }}
    >
      <div className="contents">
        {Array.from({ length: rows * columns }, (_, index) => {
          const x = (index % columns) + 1
          const y = Math.floor(index / columns) + 1
          return (
            <div
              key={index}
              className="absolute inset-0 border-2 border-l-0 border-t-0 border-gray-600"
              style={{
                gridColumnStart: x,
                gridColumnEnd: "span 1",
                gridRowStart: y,
                gridRowEnd: "span 1",
              }}
            />
          )
        })}
      </div>
      {children}
    </div>
  )
}

Grid.Cell = Cell
Grid.Cross = Cross

export default Grid
