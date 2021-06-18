import { BaseCommand } from '@cenk1cenk2/boilerplate-oclif'
import { pipeProcessThroughListr } from '@webundsoehne/nx-tools'
import execa from 'execa'
import { readJson, stat } from 'fs-extra'
import { Listr } from 'listr2'
import { join } from 'path'
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

    try {
      execa.sync(this.manager, [ '--version' ], {
        shell: true,
        stdio: [ 'ignore', 'ignore', 'ignore' ]
      })
    } catch {
      cmd.logger.debug(`Package manager not found: ${this.manager}`)
      this.ctx.fail[this.manager] = true
    }

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
  // FIXME: this is a bit wierd have to be improved up on
  public async checkIfModuleInstalled (
    pkg: NodeDependency | NodeDependency[],
    options?: { global?: boolean, cwd?: string | string[], getVersion?: boolean, getUpdate?: boolean }
  ): Promise<CheckIfModuleInstalled[]> {
    // get the global modules folder with trickery
    if (options?.global) {
      // these are the global folders that modules can be found
      if (this.globalFolder.length === 0) {
        if (!this.ctx.fail[AvailablePackageManagers.YARN]) {
          const yarnGlobalFolder = join(
            (await execa(AvailablePackageManagers.YARN, [ PackageManagerCommands[AvailablePackageManagers.YARN][PackageManagerUsableCommands.GLOBAL], 'dir' ])).stdout,
            'node_modules'
          )
          const yarnLinkFolder = join(yarnGlobalFolder, '../../', 'link')

          this.globalFolder.push(yarnGlobalFolder, yarnLinkFolder)
        }

        if (!this.ctx.fail[AvailablePackageManagers.NPM]) {
          const npmGlobalFolder = join(
            (await execa(AvailablePackageManagers.NPM, [ PackageManagerCommands[AvailablePackageManagers.NPM][PackageManagerUsableCommands.GLOBAL], 'root' ])).stdout
          )

          this.globalFolder.push(npmGlobalFolder)
        }
      }

      options.cwd = this.globalFolder
    }

    // set default cwd
    if (!options?.cwd) {
      options.cwd = join(process.cwd(), 'node_modules')
    }

    // better to have cwd as array to look for multiple places
    if (!Array.isArray(options.cwd)) {
      options.cwd = [ options.cwd ]
    }

    if (!Array.isArray(pkg)) {
      pkg = [ pkg ]
    }

    this.cmd.logger.debug(
      'Searching for deps %o in cwd %o.',
      pkg.map((p) => typeof p === 'string' ? p : p.pkg),
      options.cwd
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

        await Promise.all(
          (options.cwd as string[]).map(async (v) => {
            try {
              const packagePath = join(v, currentPkg.pkg)

              ;(await stat(packagePath)).isDirectory()
              o.installed = true
              o.path = packagePath

              // get version from stuff
              const packageJson = join(packagePath, 'package.json')
              if (options.getVersion) {
                try {
                  o.version = (await readJson(packageJson))?.version
                } catch {
                  this.cmd.message.warn(`Can not read package version of package: ${p}`)
                }
              }
              // dont care about the catch case since this will look at multiple cwds
              // eslint-disable-next-line no-empty
            } catch {}
          })
        )

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

            if (updatable.type !== 'latest') {
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

        o.parsable = {
          pkg: currentPkg.pkg,
          registry: currentPkg.registry,
          version: o.version,
          latest: o.latest ?? 'latest'
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
