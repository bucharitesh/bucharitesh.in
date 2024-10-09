import { Registry } from "@/registry/schema";

export const examples: Registry = [
  {
    name: "pixel-icon-demo",
    type: "registry:example",
    registryDependencies: ["pixel-icon"],
    files: ["example/pixel-icon-demo.tsx"],
  },
  {
    name: "vercel-grid-demo-text",
    type: "registry:example",
    registryDependencies: ["vercel-grid"],
    files: ["example/vercel-grid-demo-text.tsx"],
  },
  {
    name: "book-demo",
    type: "registry:example",
    registryDependencies: ["book"],
    files: ["example/book-demo.tsx"],
  },
  {
    name: "book-variant-demo",
    type: "registry:example",
    registryDependencies: ["book"],
    files: ["example/book-variant-demo.tsx"],
  },
];
