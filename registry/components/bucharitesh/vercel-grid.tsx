import React from "react"

const Grid = ({ columns, rows, children }) => {
  const gridClass = `grid grid-cols-${columns} grid-rows-${rows} border-2 border-gray-600 border-r-0 border-b-0 relative`

  return (
    <div className={gridClass}>
      <div className="contents">
        {Array.from({ length: rows * columns }, (_, index) => {
          const x = (index % columns) + 1
          const y = Math.floor(index / columns) + 1
          return (
            <div
              key={index}
              className="absolute inset-0 border-2 border-gray-600 border-l-0 border-t-0"
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

const Cell = ({ column, row, children }) => {
  return (
    <div
      className="p-2"
      style={{
        gridColumn: column,
        gridRow: row,
      }}
    >
      {children}
    </div>
  )
}

const Cross = ({ column, row }) => {
  return (
    <div
      className="absolute w-2 h-2 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
      style={{
        gridColumn: column,
        gridRow: row,
      }}
    />
  )
}

Grid.Cell = Cell
Grid.Cross = Cross

export default Grid;