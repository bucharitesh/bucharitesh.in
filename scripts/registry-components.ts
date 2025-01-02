import path from "path";
import { Schema } from "./registry-schema";

type ComponentDefinition = Partial<
  Pick<
    Schema,
    | "dependencies"
    | "devDependencies"
    | "registryDependencies"
    | "cssVars"
    | "tailwind"
  >
> & {
  name: string;
  path: string;
};

export const components: ComponentDefinition[] = [
  {
    name: "accordion",
    path: path.join(__dirname, "../components/core/accordion.tsx"),
    registryDependencies: [],
    dependencies: ["motion"],
  },
];
