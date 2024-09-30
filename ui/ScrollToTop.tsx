"use client"

import React from "react"

export function useWindowScroll() {
  const [state, setState] = React.useState<any>({
    x: null,
    y: null,
  })

  const scrollTo = React.useCallback((...args) => {
    if (typeof args[0] === "object") {
      window.scrollTo(args[0])
    } else if (typeof args[0] === "number" && typeof args[1] === "number") {
      window.scrollTo(args[0], args[1])
    } else {
      throw new Error(
        `Invalid arguments passed to scrollTo. See here for more info. https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo`,
      )
    }
  }, [])

  React.useLayoutEffect(() => {
    const handleScroll = () => {
      setState({ x: window.scrollX, y: window.scrollY })
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return [state, scrollTo]
}

export const ScrollToTop = ({ children }: { children: React.ReactNode }) => {
  const [{ y }, scrollTo] = useWindowScroll()

  if (y < 500) {
    return null
  }

  return (
    <button
      className="text-sm text-primary-200/30 hover:text-primary-200/70"
      onClick={() => {
        scrollTo({ top: 0, behavior: "smooth" })
      }}
    >
      {children}
    </button>
  )
}
