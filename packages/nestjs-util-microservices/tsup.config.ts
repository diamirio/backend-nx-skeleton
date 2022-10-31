/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  name: !options.watch ? 'production' : undefined,

  entry: ['src/**/*.{js,ts}'],
  tsconfig: options.watch ? 'tsconfig.json' : 'tsconfig.build.json',

  dts: options.watch ? true : false,

  format: ['cjs'],

  target: ['es2021'],

  sourcemap: options.watch ? true : false,

  splitting: false,
  clean: true,
  minify: false,
  keepNames: true
}))
