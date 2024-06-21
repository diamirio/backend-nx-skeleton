/* eslint-disable import/no-extraneous-dependencies */
import cpy from 'cpy'
import execa from 'execa'
import { defineConfig } from 'tsup'

export default defineConfig(() => ({
  name: 'production',
  entry: ['src/**/*.{js,ts}', 'plugin/*.{js,ts}'],
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
    await cpy(['**/*.json'], '../dist/src/', {
      cwd: './src',
      dot: true,
      overwrite: true,
      parents: true
    })
    // to build a flat package from ./dist
    await cpy(['package.json', 'executors.json', 'LICENSE', '*.md'], './dist/', {
      overwrite: true
    })

    await execa.command('yarn exec tsconfig-replace-paths', { stdout: process.stdout, stderr: process.stderr })
  }
}))
