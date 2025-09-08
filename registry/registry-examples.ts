import type { Registry } from "shadcn/schema";

export const examples: Registry["items"] = [
  {
    name: "book-demo",
    type: "registry:example",
    registryDependencies: ["@bucharitesh/book"],
    files: [
      {
        path: "examples/book-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "book-variant-demo",
    type: "registry:example",
    registryDependencies: ["@bucharitesh/book"],
    files: [
      {
        path: "examples/book-variant-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "game-of-life-demo",
    type: "registry:example",
    registryDependencies: ["@bucharitesh/game-of-life"],
    files: [
      {
        path: "examples/game-of-life-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "game-of-life-demo-2",
    type: "registry:example",
    registryDependencies: ["@bucharitesh/game-of-life"],
    files: [
      {
        path: "examples/game-of-life-demo-2.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "magical-mouse-demo",
    type: "registry:example",
    registryDependencies: ["@bucharitesh/magical-mouse"],
    files: [
      {
        path: "examples/magical-mouse-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "modern-progress-demo",
    type: "registry:example",
    registryDependencies: ["@bucharitesh/modern-progress"],
    files: [
      {
        path: "examples/modern-progress-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "pixel-icon-demo",
    type: "registry:example",
    registryDependencies: ["@bucharitesh/pixel-icon"],
    files: [
      {
        path: "examples/pixel-icon-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "split-text-effect-demo",
    type: "registry:example",
    registryDependencies: ["@bucharitesh/split-text-effect"],
    files: [
      {
        path: "examples/split-text-effect-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "split-text-effect-demo-2",
    type: "registry:example",
    registryDependencies: ["@bucharitesh/split-text-effect"],
    files: [
      {
        path: "examples/split-text-effect-demo-2.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "split-text-effect-demo-3",
    type: "registry:example",
    registryDependencies: ["@bucharitesh/split-text-effect"],
    files: [
      {
        path: "examples/split-text-effect-demo-3.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "view-magnifier-demo",
    type: "registry:example",
    registryDependencies: ["@bucharitesh/view-magnifier"],
    files: [
      {
        path: "examples/view-magnifier-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "view-magnifier-demo-2",
    type: "registry:example",
    registryDependencies: ["@bucharitesh/view-magnifier"],
    files: [
      {
        path: "examples/view-magnifier-demo-2.tsx",
        type: "registry:component",
      },
    ],
  },
];
