/* eslint-disable no-underscore-dangle */
import { BaseCommand } from '@cenk1cenk2/boilerplate-oclif'
import { flags as Flags } from '@oclif/command'
import type { IBooleanFlag, IOptionFlag } from '@oclif/parser/lib/flags'
import fs from 'fs-extra'
import globby from 'globby'
import { getAppRootPath } from 'patch-package/dist/getAppRootPath'
import { getPackageDetailsFromPatchFilename } from 'patch-package/dist/PackageDetails'
import { packageIsDevDependency } from 'patch-package/dist/packageIsDevDependency'
import { join, resolve, isAbsolute, basename } from 'path'
import rewire from 'rewire'
import tmp from 'tmp-promise'

import type { ApplicationConfiguration } from '@interfaces/config.interface'

export class PatchCommand extends BaseCommand<ApplicationConfiguration> {
  static strict = false
  static description = 'Patches or reserves given patches in a directory.'
  static examples = [ 'Only apply certain patches with: patch-package apply graphql+15.5.0 class-validator+0.4.0', 'Use extended glob patterns: patch-package patch "graphql*"' ]
  static aliases = [ 'apply' ]
  static flags: Record<'path' | 'directory', IOptionFlag<string>> & Record<'exitOnError' | 'reverse', IBooleanFlag<boolean>> = {
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

  public async construct (): Promise<void> {
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

  public async run (): Promise<void> {
    // get arguments
    const { flags, argv } = this.parse(PatchCommand)

    // set default arguments
    flags.directory = flags.directory
      ? isAbsolute(flags.directory)
        ? flags.directory
        : join(getAppRootPath(), flags.directory)
      : join(this.config.root, this.constants.patchesDir)

    this.logger.module(`${flags.reverse ? 'Reversing' : 'Applying'} patches to path: %s`, flags.path)

    const limit = argv.length === 0 ? [ '*' ] : argv

    // check for missing patches when limited to
    let matched = []
    const missingPatches = []

    this.logger.info('Limitting patches: %s', limit.join(', '))

    await Promise.all(
      limit.map(async (path) => {
        this.logger.info('Importing patches from directory: %s', join(flags.directory, path))

        try {
          const glob = await globby(`${path ?? '.'}/*.patch`, {
            cwd: flags.directory,
            onlyFiles: true,
            absolute: true
          })

          matched.push(...glob)

          this.logger.debug(`Matched from subdirectory ${path}: ${glob.join(', ')}`)

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
      this.logger.fatal(`Some of the patches you limit to is not appropriate: ${missingPatches.join(', ')}`)

      process.exit(127)
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
    flags.directory = this.temp.path

    // apply patches
    let shouldTerminate = false

    try {
      await this.applyPatchesForApp({
        appPath: flags?.path,
        reverse: flags?.reverse,
        patchDir: flags.directory
      })
    } catch (e) {
      shouldTerminate = flags?.exitOnError === true ? true : false
    } finally {
      if (this.temp) {
        this.logger.debug('Cleaning up temporary directory: %s', this.temp.path)

        await this.temp.cleanup()
      }
    }

    if (shouldTerminate) {
      this.logger.fatal('Terminating application with exit code 127.')
      process.exit(127)
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
            this.logger.warn(`Skipping dev-only: ${pathSpecifier}@${version}`)

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

            this.logger.success(`${pathSpecifier}@${version}`)
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
      this.logger.fail(error)
    }

    this.logger.module('Finished execution.')

    if (warnings.length) {
      this.logger.warn(`${warnings.length} warning(s).`)
    }

    if (errors.length) {
      this.logger.fatal(`${errors.length} error(s).`)
      throw new Error('Encountered errors.')
    }
  }
}
