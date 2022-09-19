import type { InferFlags } from '@cenk1cenk2/oclif-common'
import { Command, Flags } from '@cenk1cenk2/oclif-common'
import { detectPackageManager } from 'patch-package/dist/detectPackageManager'
import { getAppRootPath } from 'patch-package/dist/getAppRootPath'
import { makePatch } from 'patch-package/dist/makePatch'
import { isAbsolute } from 'path'

export class CreateCommand extends Command<never, InferFlags<typeof CreateCommand>> {
  static strict = false
  static description = 'Creates a new patch from scratch, just point the applications you want as package name.'
  static examples = ['Create a patch for given package: patch-package create graphql']
  static flags = {
    directory: Flags.string({
      char: 'd',
      description: 'Directory for outputting the patch files.',
      default: 'patches',
      parse: async (input) => {
        if (isAbsolute(input)) {
          throw new Error('Patch directory must be relative to the path.')
        }

        return input
      }
    }),
    path: Flags.string({
      char: 'p',
      description: 'Directory to take root as the application.',
      default: getAppRootPath()
    }),
    include: Flags.string({
      char: 'i',
      description: 'Include given regex patterns.',
      multiple: true,
      default: ['.*']
    }),
    exclude: Flags.string({
      char: 'e',
      description: 'Exclude given regex patterns.',
      multiple: true,
      default: ['package.json']
    })
  }

  async run (): Promise<void> {
    // parse arguments
    const packages = this.argv.filter((x, i, array) => i === array.indexOf(x))

    if (packages?.length === 0) {
      throw new Error('At least one package has to be specified for processing.')
    }

    this.logger.info(`Creating patch files for modules: ${packages.join(', ')}`)

    this.logger.info(`Running against root directory: ${this.flags.path}`)

    await Promise.all(
      packages.map(async (pkg) => {
        makePatch({
          packagePathSpecifier: pkg,
          appPath: this.flags.path,
          packageManager: detectPackageManager(this.flags.path),
          includePaths: this.flags.include,
          excludePaths: this.flags.exclude,
          patchDir: this.flags.directory
        })

        this.logger.info(`Created patch: ${pkg}`)
      })
    )
  }
}
