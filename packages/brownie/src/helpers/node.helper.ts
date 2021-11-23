import { BaseCommand } from '@cenk1cenk2/boilerplate-oclif'
import { pipeProcessThroughListr } from '@webundsoehne/nx-tools'
import execa from 'execa'
import { readJson, statSync } from 'fs-extra'
import { Listr } from 'listr2'
import { dirname, join } from 'path'
import notifier from 'update-notifier2'

import {
  AvailablePackageManagers,
  CheckIfModuleInstalled,
  NodeHelperCtx,
  PackageManagerActions,
  PackageManagerCommands,
  PackageManagerDependencyTypes,
  PackageManagerUsableCommands
} from './node.helper.interface'
import { Configuration } from '@interfaces/default-config.interface'
import { NodeDependency } from '@src/interfaces/dependency.interface'

export class NodeHelper {
  public globalFolder: string[] = []
  public manager: AvailablePackageManagers
  private ctx: NodeHelperCtx = { fail: {} }

  constructor (private readonly cmd: BaseCommand<Configuration>) {
    this.manager = cmd.constants.package_manager

    Object.values(AvailablePackageManagers).forEach((manager) => {
      try {
        execa.sync(manager, [ '--version' ], {
          shell: true,
          stdio: [ 'ignore', 'ignore', 'ignore' ]
        })
      } catch {
        cmd.logger.debug(`Package manager not found: ${this.manager}`)
        this.ctx.fail[manager] = true
      }
    })

    cmd.logger.debug(`NodeHelper initiated with package manager: ${this.manager}`)
  }

  /**
   * This gets ctx.packages as input to perform the required operation
   * @param options
   */
  public packageManager (options: PackageManagerActions, packages: NodeDependency[]): Listr {
    return this.cmd.tasks.newListr(
      [
        {
          title: 'Working on dependencies...',
          skip: (): boolean => packages.length === 0,
          task: (_, task): Listr =>
            task.newListr(
              packages.map((p) => ({
                title: `Working on: ${typeof p === 'string' ? p : p.pkg}`,
                task: async (_, task): Promise<void> => {
                  const currentPkg: NodeDependency = {
                    pkg: typeof p === 'string' ? p : p.pkg,
                    registry: typeof p !== 'string' && p.registry
                  }

                  // parse according to package manager and type
                  const command: string[] = []

                  const argumentParser = [
                    { condition: options.global, arg: PackageManagerUsableCommands.GLOBAL },
                    { condition: options.force, arg: PackageManagerUsableCommands.FORCE },
                    { condition: options.type === PackageManagerDependencyTypes.DEVELOPMENT, arg: PackageManagerUsableCommands.DEVELOPMENT },
                    { condition: options.action === PackageManagerUsableCommands.ADD, arg: PackageManagerUsableCommands.ADD },
                    { condition: options.action === PackageManagerUsableCommands.REMOVE, arg: PackageManagerUsableCommands.REMOVE }
                  ]

                  argumentParser.forEach((a) => {
                    if (a.condition) {
                      const cmd = PackageManagerCommands[this.manager][a.arg]
                      command.push(cmd)
                    }
                  })

                  const envParser = [
                    {
                      condition: !!currentPkg.registry,
                      arg: PackageManagerUsableCommands.REGISTRY,
                      val: currentPkg.registry
                    }
                  ]

                  const env = envParser.reduce((o, e) => {
                    if (e.condition ?? true) {
                      o = { ...o, [PackageManagerCommands[this.manager][e.arg]]: e.val }
                    }

                    return o
                  }, {})

                  const pkgWithVersion = options.useLatest ? `${currentPkg.pkg}@${currentPkg.latest ?? 'latest'}` : currentPkg.pkg

                  const args = [ ...command, pkgWithVersion ]
                  this.cmd.logger.debug('Running command for node helper: %s with args %o for packages %o, env: %o', this.manager, args, packages, env)

                  await pipeProcessThroughListr(
                    task as any,
                    execa(this.manager, args, {
                      stdio: 'pipe',
                      shell: true,
                      env
                    })
                  )
                }
              }))
            )
        }
      ],
      {
        concurrent: false
      }
    )
  }

  // i will leave this as is and just use direct proxy
  // FIXME: when the issue is resolved and merge complete use the upstream one instead of fork
  // * https://github.com/yeoman/update-notifier/issues/100 open issue with the update check for global registry npmrc stuff
  // FIXME: this is a bit weird have to be improved up on
  public async checkIfModuleInstalled (
    pkg: NodeDependency | NodeDependency[],
    options?: { global?: boolean, cwd?: string[], getVersion?: boolean, getUpdate?: boolean }
  ): Promise<CheckIfModuleInstalled[]> {
    // we will later generate a log warn if we are using the linked folder since it shows we are in develop mode
    let yarnLinkFolder: string

    // get the global modules folder with trickery
    if (options?.global) {
      if (this.globalFolder.length === 0) {
        let yarnGlobalFolder: string

        // yarn link folder should take predence over others, because that is what we use tho develop this library.
        if (!this.ctx.fail[AvailablePackageManagers.YARN]) {
          yarnGlobalFolder = join(
            (await execa(AvailablePackageManagers.YARN, [ PackageManagerCommands[AvailablePackageManagers.YARN][PackageManagerUsableCommands.GLOBAL], 'dir' ])).stdout,
            'node_modules'
          )

          // always add link folder, since this repository uses link to link stuff, important for testing through here
          yarnLinkFolder = join(yarnGlobalFolder, '../../', 'link')
          this.globalFolder.push(yarnLinkFolder)
          this.cmd.logger.verbose('Yarn link folder added to search: %s', yarnLinkFolder)
        }

        // these are the global folders that modules can be found
        if (!this.ctx.fail[AvailablePackageManagers.NPM] && this.manager === AvailablePackageManagers.NPM) {
          const npmGlobalFolder = join(
            (await execa(AvailablePackageManagers.NPM, [ PackageManagerCommands[AvailablePackageManagers.NPM][PackageManagerUsableCommands.GLOBAL], 'root' ])).stdout
          )

          this.globalFolder.push(npmGlobalFolder)

          this.cmd.logger.verbose('NPM global folder added to search: %s', npmGlobalFolder)
        }

        if (!this.ctx.fail[AvailablePackageManagers.YARN] && this.manager === AvailablePackageManagers.YARN) {
          this.globalFolder.push(yarnGlobalFolder)

          this.cmd.logger.verbose('YARN global folder added to search: %s', yarnGlobalFolder)
        }
      }

      options.cwd = this.globalFolder
    } else {
      this.cmd.logger.verbose('Global search folders have already been initiated in the prior run.')
    }

    if (!Array.isArray(pkg)) {
      pkg = [ pkg ]
    }

    this.cmd.logger.debug(
      'Searching for deps %o in cwd %o.',
      pkg.map((p) => typeof p === 'string' ? p : p.pkg),
      options.cwd ?? process.cwd()
    )

    // ugly function need refactoring
    return Promise.all(
      pkg.map(async (p) => {
        const currentPkg: NodeDependency = {
          pkg: typeof p === 'string' ? p : p.pkg,
          registry: typeof p !== 'string' && p.registry
        }
        // can be string legacy or the object so have to parse it manually

        const o = { pkg: currentPkg.pkg, installed: false } as CheckIfModuleInstalled

        if (options.cwd && options.cwd.length > 0) {
          const found = await Promise.all(
            options.cwd.map(async (v) => {
              this.cmd.logger.debug('Using global package directory for package: %s', currentPkg.pkg)

              try {
                const packagePath = join(v, currentPkg.pkg)

                statSync(packagePath)

                this.cmd.logger.verbose('Package available in path: %s -> %s', currentPkg.pkg, packagePath)

                return { path: packagePath, installed: true }
                // eslint-disable-next-line no-empty
              } catch (e) {
                this.cmd.logger.verbose('Can not find package in global directory: %s -> %o', v, e.message)
              }
            })
          )

          const foundIn = found.filter((f) => f?.installed === true && f?.path)

          if (foundIn.length > 0) {
            const firstOccurence = foundIn.shift()
            o.path = firstOccurence.path
            o.installed = firstOccurence.installed

            if (yarnLinkFolder && o.path.startsWith(yarnLinkFolder)) {
              this.cmd.logger.warn('Using linked package directory for package, please remove the link if we are not in development mode: %s', currentPkg.pkg)
            }

            this.cmd.logger.verbose('Will use the first occurrence of the package: %s -> %s', currentPkg.pkg, firstOccurence.path)
          }
        } else {
          // fallback method for non root directories
          try {
            this.cmd.logger.debug('Using local node package directory for package: %s', currentPkg.pkg)

            const packagePath = dirname(require.resolve(join(currentPkg.pkg, 'package.json')))

            statSync(packagePath)

            o.path = packagePath

            o.installed = true

            this.cmd.logger.verbose('Package found in local directory: %s -> %o', currentPkg.pkg, o.path)
          } catch (e) {
            this.cmd.logger.verbose('Can not find package in local directory: %s -> %o', currentPkg.pkg, e.message)
          }
        }

        if (o.installed) {
          this.cmd.logger.debug('Package found: %s -> %s', o.pkg, o.path)

          // get version from stuff
          const packageJson = join(o.path, 'package.json')

          if (options.getVersion) {
            try {
              o.version = (await readJson(packageJson))?.version
            } catch {
              this.cmd.message.warn('Can not read package version of package: %o', p)
            }
          }

          // get updates if available
          if (o?.version && options?.getUpdate) {
            try {
              // instead fetchinfo use checknpm old way
              // trickery for console.log since this module is s*
              // eslint-disable-next-line no-console
              const mock = console.log
              // eslint-disable-next-line no-console
              console.log = (): void => null
              const updatable = await notifier({ pkg: { name: currentPkg.pkg, version: o.version }, registryUrl: currentPkg?.registry }).checkNpm()
              // eslint-disable-next-line no-console
              console.log = mock

              if (yarnLinkFolder && o.path.startsWith(yarnLinkFolder)) {
                o.hasUpdate = false

                this.cmd.logger.warn('Updates disabled for the package since it is linked: %s', currentPkg.pkg)
              } else if (updatable.type !== 'latest') {
                o.hasUpdate = true
                o.updateType = `${updatable.type}: ${updatable.current} -> ${updatable.latest}`
                o.latest = updatable.latest
              } else {
                o.hasUpdate = false
              }
            } catch (e) {
              this.cmd.message.warn(`Can not check for current version: ${currentPkg.pkg}`)
              this.cmd.message.debug(e.message)
            }
          }
        } else {
          this.cmd.message.debug('Package can not be found in cwd: %s', o.pkg)
        }

        o.parsable = {
          pkg: currentPkg.pkg,
          registry: currentPkg?.registry,
          version: o?.version,
          latest: o?.latest ?? 'latest'
        }

        // idiomatic can sometimes happen if package not set
        if (!o.pkg) {
          throw new Error('There is no package defined while checking for dependencies.')
        }

        return o
      })
    )
  }
}
