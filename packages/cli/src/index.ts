import { spawnSync } from 'node:child_process';
import chalk from 'chalk';
import ora from 'ora';
import { promptForRestart } from './client';
import { getDefaultConfig } from './config';
import type { ValidClient } from './types';
import { writeConfig } from './utils';

export async function install(client: ValidClient): Promise<void> {
  const capitalizedClient = client.charAt(0).toUpperCase() + client.slice(1);

  const spinner = ora(
    `Installing configuration for ${capitalizedClient}...`
  ).start();

  try {
    const config = { ...getDefaultConfig() };

    writeConfig(client, config);
    spinner.succeed(
      `Successfully installed configuration for ${capitalizedClient}`
    );

    console.log(
      chalk.green(`${capitalizedClient} configuration updated successfully`)
    );
    console.log(
      chalk.yellow(
        `You may need to restart ${capitalizedClient} to see the Magic MCP server.`
      )
    );
    await promptForRestart(client);
  } catch (error) {
    spinner.fail(`Failed to install configuration for ${capitalizedClient}`);
    console.error(
      chalk.red(
        `Error: ${error instanceof Error ? error.message : String(error)}`
      )
    );
    throw error;
  }
}

export async function addComponents(packageNames: string[]): Promise<void> {
  if (packageNames.length === 0) {
    throw new Error('No components specified');
  }

  for (const packageName of packageNames) {
    if (!packageName.trim()) {
      continue;
    }

    console.log(chalk.blue(`Adding ${packageName} component...`));

    const command = `npx -y shadcn@latest add @bucharitesh/${packageName}`;

    const result = spawnSync(command, {
      stdio: 'inherit',
      shell: true,
    });

    if (result.error) {
      throw new Error(`Failed to add ${packageName}: ${result.error.message}`);
    }

    if (result.status !== 0) {
      throw new Error(
        `Failed to add ${packageName}: Command exited with code ${result.status}`
      );
    }

    console.log(chalk.green(`✓ Successfully added ${packageName}\n`));
  }
}
