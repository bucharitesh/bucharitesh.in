import * as React from "react"

import { Registry } from "@/registry/schema"

const ui: Registry = {
  "pixel-icon": {
    name: "pixel-icon",
    type: "components:bucharitesh",
    files: ["registry/components/bucharitesh/pixel-icon.tsx"],
  },
  "vercel-grid": {
    name: "vercel-grid",
    type: "components:bucharitesh",
    files: ["registry/components/bucharitesh/vercel-grid.tsx"],
  },
}

const example: Registry = {
  "pixel-icon-demo": {
    name: "pixel-icon-demo",
    type: "components:example",
    registryDependencies: ["pixel-icon"],
    files: ["registry/components/example/pixel-icon-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/pixel-icon-demo"),
    ),
  },
  // "vercel-grid-demo-empty": {
  //   name: "/vercel-grid-demo-empty",
  //   type: "components:example",
  //   registryDependencies: ["vercel-grid"],
  //   files: ["registry/components/example/vercel-grid-demo-empty.tsx"],
  //   component: React.lazy(
  //     () => import("@/registry/components/example/vercel-grid-demo-empty"),
  //   ),
  // },
  "vercel-grid-demo-text": {
    name: "vercel-grid-demo-text",
    type: "components:example",
    registryDependencies: ["vercel-grid"],
    files: ["registry/components/example/vercel-grid-demo-text.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/vercel-grid-demo-text"),
    ),
  },
}
export const registry: Registry = {
  ...ui,
  ...example,
}

const resolvedExamples = Object.entries(example).map(([key, value]) => ({
  ...value,
  component: () => void 0,
}))
const updatedExample: Registry = resolvedExamples.reduce(
  (acc, curr) => ({ ...acc, [curr.name]: curr }),
  {},
)
export const downloadRegistry: Registry = { ...ui, ...updatedExample }

export type ComponentName = keyof (typeof ui & typeof example)
