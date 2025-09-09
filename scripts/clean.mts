import { rimraf } from "rimraf";
import path from "node:path";

const files = [".next", ".bucharitesh", "node_modules"];

for (const file of files) {
  await rimraf(path.join(process.cwd(), file));
}

console.log("Cache cleaned successfully");