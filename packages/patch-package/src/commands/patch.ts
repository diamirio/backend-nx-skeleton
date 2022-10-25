/* eslint-disable no-underscore-dangle */
import type { InferFlags } from '@cenk1cenk2/oclif-common'
import { Command, Flags, fs } from '@cenk1cenk2/oclif-common'
import globby from 'globby'
import { getAppRootPath } from 'patch-package/dist/getAppRootPath'
import { getPackageDetailsFromPatchFilename } from 'patch-package/dist/PackageDetails'
import { packageIsDevDependency } from 'patch-package/dist/packageIsDevDependency'
import { basename, isAbsolute, join, resolve } from 'path'
import rewire from 'rewire'
import tmp from 'tmp-promise'

import { FileLocations } from '@constants/file.constants'

export class PatchCommand extends Command<never, InferFlags<typeof PatchCommand>> {
  static strict = false
  static description = 'Patches or reserves given patches in a directory.'
  static examples = ['Only apply certain patches with: patch-package apply graphql+15.5.0 class-validator+0.4.0', 'Use extended glob patterns: patch-package patch "graphql*"']
  static aliases = ['apply']
  static flags = {
    directory: Flags.string({
      char: 'd',
      description: 'Directory to apply the patches from.'
    }),
    path: Flags.string({
      char: 'p',
      description: 'Directory to apply patches to.',
      default: getAppRootPath()
    }),
    exitOnError: Flags.boolean({
      char: 'e',
      description: 'Whether to exit on error if the patching process fails or not.',
      default: false
    }),
    reverse: Flags.boolean({
      char: 'r',
      description: 'Reverses the patches, if they were applied before.',
      default: false
    })
  }

  private temp: tmp.DirectoryResult
  private rewire: Record<
  | 'getInstalledPackageVersion'
  | 'createVersionMismatchWarning'
  | 'createBrokenPatchFileError'
  | 'createPatchApplictionFailureError'
  | 'createUnexpectedError'
  | 'PatchApplicationError'
  | 'findPatchFiles'
  | 'applyPatch',
  any
  > = {} as any

  async construct (): Promise<void> {
    // since the underlying application is not exposing any of these methods, run time rewire is required
    this.logger.debug('Rewiring underlying module...')

    const applyPatches = rewire('patch-package/dist/applyPatches')

    await Promise.all(
      [
        'getInstalledPackageVersion',
        'createVersionMismatchWarning',
        'createBrokenPatchFileError',
        'createPatchApplictionFailureError',
        'createUnexpectedError',
        'PatchApplicationError',
        'findPatchFiles',
        'applyPatch'
      ].map(async (method) => {
        this.rewire[method] = applyPatches.__get__(method)
      })
    )
  }

  async run (): Promise<void> {
    // get arguments

    // set default arguments
    this.flags.directory = this.flags.directory
      ? isAbsolute(this.flags.directory)
        ? this.flags.directory
        : join(getAppRootPath(), this.flags.directory)
      : join(this.config.root, FileLocations.PATCHES_DIR)

    this.logger.info('%s patches to path: %s', this.flags.reverse ? 'Reversing' : 'Applying', this.flags.path)

    const limit = this.argv.length === 0 ? ['*'] : this.argv

    // check for missing patches when limited to
    let matched = []
    const missingPatches = []

    this.logger.info('Limitting patches: %s', limit.join(', '))

    await Promise.all(
      limit.map(async (path) => {
        this.logger.info('Importing patches from directory: %s', join(this.flags.directory, path))

        try {
          const glob = await globby(`${path ?? '.'}/*.patch`, {
            cwd: this.flags.directory,
            onlyFiles: true,
            absolute: true
          })

          matched.push(...glob)

          this.logger.debug('Matched from subdirectory %s: %s', path, glob.join(', '))

          if (glob.length === 0) {
            throw new Error('Can not match pattern.')
          }
        } catch (err) {
          this.logger.debug('Missing file: %s with error %s', path, err.message)

          missingPatches.push(path)
        }
      })
    )

    if (missingPatches.length > 0) {
      throw new Error(`Some of the patches you limit to is not appropriate: ${missingPatches.join(', ')}`)
    }

    // create temporary directory and move the patches there
    this.temp = await tmp.dir({ unsafeCleanup: true })
    this.logger.debug('Created a temporary directory: %s', this.temp.path)

    // move limited patches to the temporary directory
    matched = matched.filter((x, i, array) => i === array.indexOf(x))

    await Promise.all(
      matched.map(async (patch) => {
        await fs.copyFile(patch, join(this.temp.path, `${basename(patch)}`))
      })
    )

    // set patch directory to temporary directory
    this.flags.directory = this.temp.path

    // apply patches
    let shouldTerminate = false

    try {
      await this.applyPatchesForApp({
        appPath: this.flags?.path,
        reverse: this.flags?.reverse,
        patchDir: this.flags.directory
      })
    } catch (e) {
      shouldTerminate = this.flags?.exitOnError === true ? true : false
    } finally {
      if (this.temp) {
        this.logger.debug('Cleaning up temporary directory: %s', this.temp.path)

        await this.temp.cleanup()
      }
    }

    if (shouldTerminate) {
      throw new Error('Could not apply all the patches.')
    }
  }

  private async applyPatchesForApp ({ appPath, reverse, patchDir }: { appPath: string, reverse: boolean, patchDir: string }): Promise<void> {
    const files: string[] = this.rewire.findPatchFiles(patchDir)

    if (files.length === 0) {
      this.logger.fatal('No patch files found.')

      return
    }

    const errors: string[] = []
    const warnings: string[] = []

    await Promise.all(
      files.map(async (filename) => {
        try {
          const packageDetails = getPackageDetailsFromPatchFilename(filename)

          if (!packageDetails) {
            errors.push(`Unrecognized patch file in patches directory: ${filename}`)

            return
          }

          const { name, version, path, pathSpecifier, isDevOnly, patchFilename } = packageDetails

          const installedPackageVersion = this.rewire.getInstalledPackageVersion({
            appPath,
            path,
            pathSpecifier,
            isDevOnly:
              isDevOnly ||
              // check for direct-dependents in prod
              process.env.NODE_ENV === 'production' && packageIsDevDependency({ appPath, packageDetails }),
            patchFilename
          })

          if (!installedPackageVersion) {
            // it's ok we're in production mode and this is a dev only package
            this.logger.warn('Skipping dev-only: %s@%s', pathSpecifier, version)

            return
          }

          if (
            this.rewire.applyPatch({
              patchFilePath: resolve(patchDir, filename) as string,
              reverse,
              packageDetails,
              patchDir
            })
          ) {
            // yay patch was applied successfully
            // print warning if version mismatch
            if (installedPackageVersion !== version) {
              warnings.push(
                this.rewire.createVersionMismatchWarning({
                  packageName: name,
                  actualVersion: installedPackageVersion,
                  originalVersion: version,
                  pathSpecifier,
                  path
                })
              )
            }

            this.logger.info('%s@%s', pathSpecifier, version)
          } else if (installedPackageVersion === version) {
            // completely failed to apply patch
            // TODO: propagate useful error messages from patch application
            errors.push(
              this.rewire.createBrokenPatchFileError({
                packageName: name,
                patchFileName: filename,
                pathSpecifier,
                path
              })
            )
          } else {
            errors.push(
              this.rewire.createPatchApplictionFailureError({
                packageName: name,
                actualVersion: installedPackageVersion,
                originalVersion: version,
                patchFileName: filename,
                path,
                pathSpecifier
              })
            )
          }
        } catch (error) {
          if (error instanceof this.rewire.PatchApplicationError) {
            errors.push(error.message)
          } else {
            errors.push(this.rewire.createUnexpectedError({ filename, error }))
          }
        }
      })
    )

    for (const warning of warnings) {
      this.logger.warn(warning)
    }

    for (const error of errors) {
      this.logger.error(error)
    }

    this.logger.info('Finished execution.')

    if (warnings.length) {
      this.logger.warn('%d warning(s).', warnings.length)
    }

    if (errors.length) {
      this.logger.fatal('%d error(s).', errors.length)

      throw new Error('Encountered errors.')
    }
  }
}
