"use client"

import ReactDOM from "react-dom"

export function PreloadResources({ url } : { url : string }) {
  ReactDOM.preload(url, { as: "image" })

  return null
}