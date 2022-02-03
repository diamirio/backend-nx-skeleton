/* eslint-disable no-underscore-dangle */
import { BaseCommand, createTable } from '@cenk1cenk2/boilerplate-oclif'
import fs from 'fs-extra'
import globby from 'globby'
import { EOL } from 'os'
import { getPackageDetailsFromPatchFilename } from 'patch-package/dist/PackageDetails'
import { join } from 'path'
import rewire from 'rewire'
import wrap from 'wrap-ansi'

import type { ApplicationConfiguration } from '@interfaces/config.interface'

export class ListCommand extends BaseCommand<ApplicationConfiguration> {
  static description = 'Lists all the static entities that are shipped with this module.'
  static aliases = ['ls']

  private rewire: Record<'findPatchFiles', any> = {} as any

  async construct (): Promise<void> {
    // since the underlying application is not exposing any of these methods, run time rewire is required
    this.logger.debug('Rewiring underlying module...')

    const applyPatches = rewire('patch-package/dist/applyPatches')

    await Promise.all(
      ['findPatchFiles'].map(async (method) => {
        this.rewire[method] = applyPatches.__get__(method)
      })
    )
  }

  async run (): Promise<void> {
    this.logger.module('Listing all the available patches in this module.')

    const directories = await globby('*', {
      cwd: join(this.config.root, this.constants.patchesDir),
      onlyDirectories: true
    })

    const table: string[][] = []

    await Promise.all(
      directories.map(async (dir) => {
        const cwd = join(this.config.root, this.constants.patchesDir, dir)

        const files: string[] = this.rewire.findPatchFiles(cwd)

        const description = fs.existsSync(join(cwd, 'description.txt')) ? await fs.readFile(join(cwd, 'description.txt')) : '-'

        const subtable: string[] = []

        await Promise.all(
          files.map(async (filename) => {
            const packageDetails = getPackageDetailsFromPatchFilename(filename)

            if (!packageDetails) {
              this.logger.warn(`Unrecognized patch file in patches directory: ${filename}`)

              return
            }

            const { name, version, patchFilename } = packageDetails

            subtable.push(`${patchFilename} -> ${name}@${version}`)
          })
        )

        table.push([dir, wrap(description.toString(), 60), subtable.join(EOL)])
      })
    )

    this.logger.direct(createTable(['name', 'description', 'patches'], table))
  }
}
