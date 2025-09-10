import path from 'node:path';
import { rimraf } from 'rimraf';

const files = ['.next', '.bucharitesh', 'node_modules'];

for (const file of files) {
  await rimraf(path.join(process.cwd(), file));
}

console.log('Cache cleaned successfully');
