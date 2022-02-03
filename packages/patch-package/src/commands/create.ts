import { BaseCommand } from '@cenk1cenk2/boilerplate-oclif'
import { flags as Flags } from '@oclif/command'
import type { IOptionFlag } from '@oclif/parser/lib/flags'
import { detectPackageManager } from 'patch-package/dist/detectPackageManager'
import { getAppRootPath } from 'patch-package/dist/getAppRootPath'
import { makePatch } from 'patch-package/dist/makePatch'
import { isAbsolute } from 'path'

import type { ApplicationConfiguration } from '@interfaces/config.interface'

export class CreateCommand extends BaseCommand<ApplicationConfiguration> {
  static strict = false
  static description = 'Creates a new patch from scratch, just point the applications you want as package name.'
  static examples = ['Create a patch for given package: patch-package create graphql']
  static flags: Record<'directory' | 'path', IOptionFlag<string>> & Record<'include' | 'exclude', IOptionFlag<string[]>> = {
    directory: Flags.string({
      char: 'd',
      description: 'Directory for outputing the patch files.',
      default: 'patches',
      parse: (input) => {
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
    const { argv, flags } = this.parse(CreateCommand)

    const packages = argv.filter((x, i, array) => i === array.indexOf(x))

    if (packages?.length === 0) {
      this.logger.fatal('At least one package has to be specified for processing.')
      process.exit(127)
    }

    this.logger.module(`Creating patch files for modules: ${packages.join(', ')}`)

    this.logger.info(`Running against root directory: ${flags.path}`)

    await Promise.all(
      packages.map(async (pkg) => {
        makePatch({
          packagePathSpecifier: pkg,
          appPath: flags.path,
          packageManager: detectPackageManager(flags.path),
          includePaths: flags.include,
          excludePaths: flags.exclude,
          patchDir: flags.directory
        })

        this.logger.success(`Created patch: ${pkg}`)
      })
    )
  }
}
