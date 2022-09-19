/* eslint-disable no-underscore-dangle */
import { CliUx, Command } from '@cenk1cenk2/oclif-common'
import globby from 'globby'
import { EOL } from 'os'
import { getPackageDetailsFromPatchFilename } from 'patch-package/dist/PackageDetails'
import { join } from 'path'
import rewire from 'rewire'
import wrap from 'wrap-ansi'

import { FileLocations } from '@constants/file.constants'

export class ListCommand extends Command<never, typeof ListCommand> {
  static description = 'Lists all the static entities that are shipped with this module.'
  static aliases = ['ls']

  private rewire: Record<'findPatchFiles', any> = {} as any

  async shouldRunBefore (): Promise<void> {
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
    this.logger.info('Listing all the available patches in this module.')

    const directories = await globby('*', {
      cwd: join(this.cs.root, FileLocations.PATCHES_DIR),
      onlyDirectories: true
    })

    const table: Record<'name' | 'description' | 'subtable', string>[] = []

    await Promise.all(
      directories.map(async (dir) => {
        const cwd = join(this.cs.root, FileLocations.PATCHES_DIR, dir)

        const files: string[] = this.rewire.findPatchFiles(cwd)

        const description = this.fs.exists(join(cwd, 'description.txt')) ? await this.fs.read(join(cwd, 'description.txt')) : '-'

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

        table.push({
          name: dir,
          description: wrap(description.toString(), 60),
          subtable: subtable.join(EOL)
        })
      })
    )

    CliUx.ux.table(table, {
      name: { header: 'Name' },
      description: { header: 'Description' },
      subtable: { header: 'Patches' }
    })
  }
}
