/* eslint-disable no-underscore-dangle */
import { BaseCommand, createTable } from '@cenk1cenk2/boilerplate-oclif'
import { getPackageDetailsFromPatchFilename } from 'patch-package/dist/PackageDetails'
import { join } from 'path'
import rewire from 'rewire'

import { ApplicationConfiguration } from '@src/interfaces/config.interface'

export class ListCommand extends BaseCommand<ApplicationConfiguration> {
  static description = 'Lists all the static entities that are shipped with this module.'
  static aliases = [ 'ls' ]

  private rewire: Record<'findPatchFiles', any> = {} as any

  public async construct (): Promise<void> {
    // since the underlying application is not exposing any of these methods, run time rewire is required
    this.logger.debug('Rewiring underlying module...')

    const applyPatches = rewire('patch-package/dist/applyPatches')

    await Promise.all(
      [ 'findPatchFiles' ].map(async (method) => {
        this.rewire[method] = applyPatches.__get__(method)
      })
    )
  }

  public async run (): Promise<void> {
    this.logger.module('Listing all the available patches in this module.')

    const files: string[] = this.rewire.findPatchFiles(join(this.config.root, this.constants.patchesDir))

    const table: string[][] = []
    await Promise.all(
      files.map(async (filename) => {
        const packageDetails = getPackageDetailsFromPatchFilename(filename)

        if (!packageDetails) {
          this.logger.warn(`Unrecognized patch file in patches directory: ${filename}`)

          return
        }

        const { name, version, patchFilename } = packageDetails

        table.push([ patchFilename, name, version ])
      })
    )

    this.logger.direct(createTable([ 'patch', 'package-name', 'package-version' ], table))
  }
}
