/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  name: !options.watch ? 'production' : undefined,

  entry: ['src/**/*.{js,ts}'],
  tsconfig: options.watch ? 'tsconfig.json' : 'tsconfig.build.json',

  dts: true,

  format: ['cjs'],

  target: ['es2021'],

  sourcemap: options.watch ? true : false,

  bundle: false,
  splitting: false,
  clean: true,
  minify: false,
  keepNames: true
}))
