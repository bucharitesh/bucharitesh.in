import clsx from "clsx"
import React from "react"

const StylishBlueGrid = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div
      className={clsx(
        "antialiased bg-[radial-gradient(circle_768px_at_top_right,#3730a3bf,#0f172abf_80%,#0f172a),url(https://res.cloudinary.com/bucha/image/upload/grid_yxub4a.svg)] bg-right-top bg-no-repeat bg-white min-h-full text-slate-700 dark:bg-articles-dark dark:bg-slate-900 dark:text-slate-200",
        className,
      )}
    >
      {children}
    </div>
  )
}

export default StylishBlueGrid
