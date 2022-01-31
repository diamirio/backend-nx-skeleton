import execa from 'execa'
import { readJson, statSync } from 'fs-extra'
import { dirname, join } from 'path'
import notifier from 'update-notifier2'

import { AvailablePackageManagers, PackageManagerCommands, PackageManagerDependencyTypes, PackageManagerUsableCommands } from './package-manager.constants'
import type {
  LocalNodeModule,
  NodeDependency,
  CheckNodeModuleInstalledOptions,
  PackageManagerActions,
  PackageManagerArgumentParser,
  PackageManagerCtx,
  PackageManagerEnvironmentParser,
  PackageManagerPackageAction,
  PackageManagerParsedCommand,
  PackageManagerWithCommandAction,
  PackageManagerWithoutCommandAction
} from './package-manager.interface'
import { findNxRoot } from '@utils/file-system'
import { Logger } from '@utils/logger'

export class PackageManager {
  static instance: PackageManager
  public globalFolder: string[] = []
  public globalLinkFolder: string[] = []
  public manager: AvailablePackageManagers
  private ctx: PackageManagerCtx = { fail: {} }
  private logger: Logger

  constructor (options?: { manager?: AvailablePackageManagers }) {
    if (PackageManager.instance instanceof PackageManager) {
      return PackageManager.instance
    }

    options = {
      manager: AvailablePackageManagers.NPM,
      ...options
    }

    this.manager = options.manager
    this.logger = new Logger()

    Object.values(AvailablePackageManagers).forEach((manager) => {
      try {
        execa.sync(manager, [ '--version' ], {
          shell: true,
          stdio: [ 'ignore', 'ignore', 'ignore' ]
        })
      } catch {
        this.logger.debug(`Package manager not found: ${this.manager}`)
        this.ctx.fail[manager] = true
      }
    })

    if (Object.values(AvailablePackageManagers).length === Object.values(this.ctx.fail).length) {
      throw new Error('All package managers that are supported has failed.')
    }

    this.logger.debug(`PackageManager initiated with package manager: ${this.manager}`)

    PackageManager.instance = this
  }

  /**
   * Returns the selected commands from the current package manager.
   */
  command (command: PackageManagerUsableCommands, manager?: AvailablePackageManagers): string {
    return PackageManagerCommands[manager ?? this.manager][command]
  }

  /**
   * This gets ctx.packages as input to perform the required operation
   * @param actions
   */
  parser (action: PackageManagerActions): PackageManagerParsedCommand {
    const argumentParser: PackageManagerArgumentParser = [
      // common arguments
      { condition: action.global === true, command: PackageManagerUsableCommands.GLOBAL },
      { condition: action.force === true, command: PackageManagerUsableCommands.FORCE }
    ]

    const envParser: PackageManagerEnvironmentParser = []

    if (this.isPackageManagerPackageAction(action)) {
      argumentParser.push(
        // arguments for add/remove
        { condition: action.type === PackageManagerDependencyTypes.DEVELOPMENT, command: PackageManagerUsableCommands.DEVELOPMENT },
        { condition: action.action === PackageManagerUsableCommands.ADD, command: PackageManagerUsableCommands.ADD },
        { condition: action.action === PackageManagerUsableCommands.REMOVE, command: PackageManagerUsableCommands.REMOVE }
      )

      const currentPkg: NodeDependency = {
        pkg: typeof action.package === 'string' ? action.package : action.package.pkg,
        registry: typeof action.package !== 'string' && action.package.registry,
        latest: typeof action.package !== 'string' && action.package.latest
      }

      const pkg = action.useLatest ? `${typeof action.package === 'string' ? action.package : action.package.pkg}@${currentPkg.latest ?? 'latest'}` : currentPkg.pkg

      argumentParser.push({ condition: true, args: pkg })

      envParser.push({
        condition: !!currentPkg.registry,
        command: PackageManagerUsableCommands.REGISTRY,
        value: currentPkg.registry
      })
    } else if (this.isPackageManagerPackageWithCommandAction(action)) {
      argumentParser.push(
        { condition: action.action === PackageManagerUsableCommands.RUN, command: PackageManagerUsableCommands.RUN },
        { condition: action.action === PackageManagerUsableCommands.EXEC, command: PackageManagerUsableCommands.EXEC },
        { condition: true, args: action.command },
        { condition: this.manager === AvailablePackageManagers.NPM && action.args?.length > 0, command: PackageManagerUsableCommands.RUN_ARGS },
        { condition: true, args: action.args }
      )
    } else if (this.isPackageManagerPackageWithoutCommandAction(action)) {
      argumentParser.push(
        // arguments for install
        { condition: action.action === PackageManagerUsableCommands.INSTALL, command: PackageManagerUsableCommands.INSTALL },
        { condition: action.action === PackageManagerUsableCommands.ROOT, command: PackageManagerUsableCommands.ROOT }
      )
    } else {
      throw new Error('Can not resolve the package manager task.')
    }

    const args = argumentParser.reduce((o, a) => {
      if (a.condition === true) {
        if (a.command) {
          const cmd = PackageManagerCommands[this.manager][a.command]

          o = [ ...o, cmd ]
        }

        if (a.args) {
          a.args = Array.isArray(a.args) ? a.args : [ a.args ]

          o = [ ...o, ...a.args ]
        }
      }

      return o
    }, [])

    const env = envParser.reduce((o, e) => {
      if (e.condition) {
        if (e.command) {
          o = { ...o, [PackageManagerCommands[this.manager][e.command]]: e.value }
        } else if (e.args) {
          o = { ...o, [e.args]: e.value }
        }
      }

      return o
    }, {})

    return {
      manager: this.manager,
      args: args.flatMap((a) => a.split(' ')),
      env
    }
  }

  // i will leave this as is and just use direct proxy
  // FIXME: when the issue is resolved and merge complete use the upstream one instead of fork
  // * https://github.com/yeoman/update-notifier/issues/100 open issue with the update check for global registry npmrc stuff
  // FIXME: this is a bit weird have to be improved up on
  async checkIfModuleInstalled (pkg: NodeDependency | NodeDependency[], options?: CheckNodeModuleInstalledOptions): Promise<LocalNodeModule[]> {
    // we will later generate a log warn if we are using the linked folder since it shows we are in develop mode
    let yarnGlobalFolder: string

    if (options?.onlyLinked || options?.global) {
      if (this.globalLinkFolder.length === 0) {
        // yarn link folder should take predence over others, because that is what we use tho develop this library.
        if (!this.ctx.fail[AvailablePackageManagers.YARN]) {
          yarnGlobalFolder = join(
            (
              await execa(AvailablePackageManagers.YARN, [
                this.command(PackageManagerUsableCommands.GLOBAL, AvailablePackageManagers.YARN),
                this.command(PackageManagerUsableCommands.ROOT, AvailablePackageManagers.YARN)
              ])
            ).stdout,
            'node_modules'
          )

          // always add link folder, since this repository uses link to link stuff, important for testing through here
          const yarnLinkFolder = join(yarnGlobalFolder, '../../', 'link')

          this.globalLinkFolder.push(yarnLinkFolder)

          this.logger.debug(`Yarn link folder added to search: ${yarnLinkFolder}`)
        }
      } else {
        this.logger.debug('Global linked search folders have already been initiated in the prior run.')
      }

      if (options?.onlyLinked) {
        options.cwd = this.globalLinkFolder
      }
    }

    // get the global modules folder with trickery
    if (options?.global) {
      if (this.globalFolder.length === 0) {
        if (this.globalLinkFolder.length > 0) {
          this.globalFolder.push(...this.globalLinkFolder)
        }

        // these are the global folders that modules can be found
        if (!this.ctx.fail[AvailablePackageManagers.NPM] && this.manager === AvailablePackageManagers.NPM) {
          const npmGlobalFolder = join(
            (
              await execa(AvailablePackageManagers.NPM, [
                this.command(PackageManagerUsableCommands.GLOBAL, AvailablePackageManagers.NPM),
                this.command(PackageManagerUsableCommands.ROOT, AvailablePackageManagers.NPM)
              ])
            ).stdout
          )

          this.globalFolder.push(npmGlobalFolder)

          this.logger.debug(`NPM global folder added to search: ${npmGlobalFolder}`)
        }

        if (!this.ctx.fail[AvailablePackageManagers.YARN] && this.manager === AvailablePackageManagers.YARN) {
          this.globalFolder.push(yarnGlobalFolder)

          this.logger.debug(`YARN global folder added to search: ${yarnGlobalFolder}`)
        }
      } else {
        this.logger.debug('Global search folders have already been initiated in the prior run.')
      }

      options.cwd = this.globalFolder
    }

    if (!Array.isArray(pkg)) {
      pkg = [ pkg ]
    }

    this.logger.debug(
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

        const o = { pkg: currentPkg.pkg, installed: false } as LocalNodeModule

        if (options.cwd && options.cwd.length > 0) {
          this.logger.debug('Using global package directory for package: %s', currentPkg.pkg)

          const found = await Promise.all(
            options.cwd.map(async (v) => {
              try {
                const packagePath = join(v, currentPkg.pkg)

                statSync(packagePath)

                this.logger.debug('Package available in path: %s -> %s', currentPkg.pkg, packagePath)

                return { path: packagePath, installed: true }
                // eslint-disable-next-line no-empty
              } catch (e) {
                this.logger.debug('Can not find package in global directory: %s -> %o', v, e.message)
              }
            })
          )

          const foundIn = found.filter((f) => f?.installed === true && f?.path)

          if (foundIn.length > 0) {
            const firstOccurence = foundIn.shift()

            o.path = firstOccurence.path
            o.installed = firstOccurence.installed

            if (this.globalLinkFolder.length > 0 && this.globalLinkFolder.some((path) => o.path.startsWith(path))) {
              this.logger.warn('Using linked package directory for package, please remove the link if we are not in development mode: %s', currentPkg.pkg)

              o.linked = true
            }

            this.logger.debug('Will use the first occurrence of the package: %s -> %s', currentPkg.pkg, firstOccurence.path)
          }
        } else {
          // fallback method for non root directories
          try {
            this.logger.debug('Using local node package directory for package: %s', currentPkg.pkg)

            const packagePath = join(findNxRoot(), 'node_modules', currentPkg.pkg, 'package.json')

            statSync(packagePath)

            o.path = dirname(packagePath)

            o.installed = true

            this.logger.debug('Package found in local directory: %s -> %o', currentPkg.pkg, o.path)
          } catch (e) {
            this.logger.debug('Can not find package in local directory: %s -> %o', currentPkg.pkg, e.message)
          }
        }

        if (o.installed) {
          this.logger.debug('Package found: %s -> %s', o.pkg, o.path)

          // get version from stuff
          const packageJson = join(o.path, 'package.json')

          if (options.getVersion) {
            try {
              o.version = (await readJson(packageJson))?.version
            } catch {
              this.logger.warn('Can not read package version of package: %o', p)
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

              if (o.linked) {
                o.hasUpdate = false

                this.logger.warn('Updates disabled for the package since it is linked: %s', currentPkg.pkg)
              } else if (updatable.type !== 'latest') {
                o.hasUpdate = true
                o.updateType = `${updatable.type}: ${updatable.current} -> ${updatable.latest}`
                o.latest = updatable.latest
              } else {
                o.hasUpdate = false
              }
            } catch (e) {
              this.logger.warn(`Can not check for current version: ${currentPkg.pkg}`)
              this.logger.debug(e.message)
            }
          }
        } else {
          this.logger.debug('Package can not be found in cwd: %s', o.pkg)
        }

        if (!o.linked) {
          o.parsable = {
            pkg: currentPkg.pkg,
            registry: currentPkg?.registry,
            version: o?.version,
            latest: o?.latest ?? 'latest'
          }
        } else {
          o.parsable = {
            pkg: o.path,
            version: o?.version
          }
        }

        // idiomatic can sometimes happen if package not set
        if (!o.pkg) {
          throw new Error('There is no package defined while checking for dependencies.')
        }

        return o
      })
    )
  }

  private isPackageManagerPackageAction (data: PackageManagerActions): data is PackageManagerPackageAction {
    if ([ PackageManagerUsableCommands.ADD, PackageManagerUsableCommands.REMOVE ].includes(data.action)) {
      return true
    }

    return false
  }

  private isPackageManagerPackageWithCommandAction (data: PackageManagerActions): data is PackageManagerWithCommandAction {
    if ([ PackageManagerUsableCommands.RUN, PackageManagerUsableCommands.EXEC ].includes(data.action)) {
      return true
    }

    return false
  }

  private isPackageManagerPackageWithoutCommandAction (data: PackageManagerActions): data is PackageManagerWithoutCommandAction {
    if ([ PackageManagerUsableCommands.INSTALL, PackageManagerUsableCommands.ROOT ].includes(data.action)) {
      return true
    }

    return false
  }
}
