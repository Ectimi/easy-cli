import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/*/*.ts'],
  outDir:'./lib',
  splitting: false,
  sourcemap: true,
  clean: true,
})