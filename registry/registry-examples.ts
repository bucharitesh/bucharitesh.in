import { Registry } from "@/registry/schema";

export const examples: Registry = [
  {
    name: "pixel-icon-demo",
    type: "registry:example",
    registryDependencies: ["pixel-icon"],
    files: ["example/pixel-icon-demo.tsx"],
  },
  {
    name: "split-text-effect-demo",
    type: "registry:example",
    registryDependencies: ["split-text-effect"],
    files: ["example/split-text-effect-demo.tsx"],
  },
  {
    name: "split-text-effect-demo-2",
    type: "registry:example",
    registryDependencies: ["split-text-effect"],
    files: ["example/split-text-effect-demo-2.tsx"],
  },
  {
    name: "split-text-effect-demo-3",
    type: "registry:example",
    registryDependencies: ["split-text-effect"],
    files: ["example/split-text-effect-demo-3.tsx"],
  },
  {
    name: "view-magnifier-demo",
    type: "registry:example",
    registryDependencies: ["view-magnifier"],
    files: ["example/view-magnifier-demo.tsx"],
  },
  {
    name: "view-magnifier-demo-2",
    type: "registry:example",
    registryDependencies: ["view-magnifier"],
    files: ["example/view-magnifier-demo-2.tsx"],
  },
  // {
  //   name: "vercel-grid-demo-text",
  //   type: "registry:example",
  //   registryDependencies: ["vercel-grid"],
  //   files: ["example/vercel-grid-demo-text.tsx"],
  // },
  // {
  //   name: "book-demo",
  //   type: "registry:example",
  //   registryDependencies: ["book"],
  //   files: ["example/book-demo.tsx"],
  // },
  // {
  //   name: "book-variant-demo",
  //   type: "registry:example",
  //   registryDependencies: ["book"],
  //   files: ["example/book-variant-demo.tsx"],
  // },
];
