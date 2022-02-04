/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  name: !options.watch && 'production',

  entry: ['src/**/*.{js,ts}', '!src/**/files'],
  tsconfig: options.watch ? 'tsconfig.json' : 'tsconfig.build.json',

  dts: true,

  format: ['cjs'],

  target: ['es2021'],

  sourcemap: options.watch && true,

  splitting: false,
  clean: true,
  minify: false,

  onSuccess: 'yarn run postbuild'
}))
