import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/cli.ts',
  },
  outDir: 'dist',
  sourcemap: false,
  minify: false,
  dts: true,
  format: ['esm'],
  shims: true,
  clean: true,
});
