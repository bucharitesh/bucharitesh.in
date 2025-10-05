#!/usr/bin/env node

import chalk from 'chalk';
import { Command } from 'commander';
import { addComponents, install } from './index';
import { VALID_CLIENTS } from './types';

const program = new Command();

program
  .name('@bucharitesh/cli')
  .description('CLI for Bucharitesh Components and MCP configuration')
  .version('1.0.0');

program
  .command('install')
  .description('Install MCP configuration for a specific client')
  .argument(
    '<client>',
    `The client to install for (${VALID_CLIENTS.join(', ')})`
  )
  .action(async (client: string) => {
    if (!VALID_CLIENTS.includes(client as any)) {
      console.error(
        chalk.red(
          `Invalid client "${client}". Available clients: ${VALID_CLIENTS.join(
            ', '
          )}`
        )
      );
      process.exit(1);
    }

    try {
      await install(client as any);
    } catch (error) {
      console.error(
        chalk.red(
          error instanceof Error ? error.message : 'Unknown error occurred'
        )
      );
      process.exit(1);
    }
  });

program
  .command('add')
  .description('Add Bucharitesh components to your project')
  .argument('<components...>', 'Component name(s) to add')
  .action(async (components: string[]) => {
    try {
      await addComponents(components);
      console.log(chalk.green('\n✨ All components installed successfully!'));
    } catch (error) {
      console.error(
        chalk.red(
          `\n❌ ${error instanceof Error ? error.message : 'Unknown error occurred'}`
        )
      );
      process.exit(1);
    }
  });

program.parse();
