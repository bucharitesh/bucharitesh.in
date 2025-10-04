#!/usr/bin/env node

// Thanks https://github.com/haydenbleasel/kibo/blob/main/scripts/index.ts

import { spawnSync } from "node:child_process";

const args = process.argv.slice(2);

if (args.length < 2 || args[0] !== "add") {
  console.log("Usage: npx bucharitesh add [components...]");
  process.exit(1);
}

const packageNames = args.slice(1);

for (const packageName of packageNames) {
  if (!packageName.trim()) {
    continue;
  }

  console.log(`Adding ${packageName} component...`);

  const command = `npx -y shadcn@latest add @bucharitesh/${packageName}`;

  const result = spawnSync(command, {
    stdio: "inherit",
    shell: true,
  });

  if (result.error) {
    console.error(`Failed to add ${packageName}:`, result.error.message);
    process.exit(1);
  } else if (result.status !== 0) {
    console.error(`Command failed with exit code ${result.status}`);
    process.exit(1);
  }
}
