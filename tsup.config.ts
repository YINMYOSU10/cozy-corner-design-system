import { defineConfig } from 'tsup';

// Type definitions are emitted by `tsc` (see build:lib): tsup 9's dts step
// needs the TypeScript compiler API, which TypeScript 7 does not ship.
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  clean: true,
  external: ['react', 'react-dom', 'react/jsx-runtime'],
});
