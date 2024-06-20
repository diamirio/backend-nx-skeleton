/* eslint-disable import/no-extraneous-dependencies */
import cpy from 'cpy'
import execa from 'execa'
import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  name: !options.watch ? 'production' : undefined,

  entry: ['src/**/*.{js,ts}'],
  tsconfig: 'tsconfig.build.json',
  dts: true,
  format: ['cjs'],
  target: ['es2021'],
  sourcemap: false,

  bundle: false,
  splitting: false,
  clean: true,
  minify: false,
  keepNames: true,

  onSuccess: async (): Promise<void> => {
    await cpy(['**/*.json', '**/files/**', '**/assets/**'], '../dist', {
      cwd: './src',
      dot: true,
      overwrite: true,
      parents: true
    })

    await execa.command('yarn exec tsconfig-replace-paths', { stdout: process.stdout, stderr: process.stderr })
  }
}))
