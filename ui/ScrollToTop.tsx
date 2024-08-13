"use client"

import React from "react"

export const ScrollToTop = ({ children }: { children: React.ReactNode }) => {
  return (
    <button
      className="text-sm text-lavender-200/30 hover:text-lavender-200/70"
      onClick={() => {
        window.scrollTo({ top: 0 })
      }}
    >
      {children}
    </button>
  )
}
