/* eslint-disable import/no-extraneous-dependencies */
import cpy from 'cpy'
import execa from 'execa'
import rimraf from 'rimraf'
import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  name: !options.watch ? 'production' : undefined,

  outDir: 'dist',
  entry: ['src/**/*.{js,ts}', '!src/**/files'],
  tsconfig: options.watch ? 'tsconfig.json' : 'tsconfig.build.json',

  dts: true,

  format: ['cjs'],

  target: ['es2021'],

  sourcemap: options.watch ? true : false,

  bundle: false,
  splitting: false,
  clean: true,
  minify: false,

  onSuccess: async (): Promise<void> => {
    await Promise.all(
      ['dist/**/assets/', 'dist/**/files/'].map(
        async (path) =>
          new Promise((resolve, reject) =>
            rimraf(path, {}, (error) => {
              if (error) {
                reject(error)
              }

              // eslint-disable-next-line no-console
              console.log('Cleaned up directory:', path)
              resolve(null)
            })
          )
      )
    )

    const copied = await cpy(['**/*.json', '**/files/**', '**/assets/**'], '../dist', {
      cwd: './src',
      dot: true,
      overwrite: true,
      parents: true
    })

    // eslint-disable-next-line no-console
    console.log('Copied assets:', copied.join(', '))

    await Promise.all([execa.command('yarn exec tsconfig-replace-paths', { stdout: process.stdout, stderr: process.stderr })])
  }
}))
