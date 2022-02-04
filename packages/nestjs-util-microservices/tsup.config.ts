import { esbuildDecorators } from '@anatine/esbuild-decorators'
import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  name: !options.watch && 'production',

  entry: ['src/**/*.{js,ts}'],
  tsconfig: options.watch ? 'tsconfig.json' : 'tsconfig.build.json',

  dts: true,

  format: ['cjs'],

  target: ['es2021'],

  sourcemap: options.watch && true,

  esbuildPlugins: [esbuildDecorators()],

  splitting: false,
  clean: true,
  minify: false
}))
