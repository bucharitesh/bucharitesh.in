import { buildRegistry } from "./build-registry.mts";
import { buildLlmsFiles } from "./llms.mts";
import { registrySchema } from "shadcn/schema";
import { registry } from "../registry";

try {
  console.log("🧠 Building llms files...");
  await buildLlmsFiles();
  console.log("✅ llms-min.txt and llms.txt built successfully");

  console.log("💅 Building registry.json...");
  const result = registrySchema.safeParse(registry);

  if (!result.success) {
    console.error(result.error);
    process.exit(1);
  }

  await buildRegistry(result.data);
  console.log("✅ Registry JSON file built successfully");
} catch (error) {
  console.error(error);
  process.exit(1);
}
