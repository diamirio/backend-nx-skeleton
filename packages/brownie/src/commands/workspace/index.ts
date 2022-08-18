import { Command, MergeStrategy } from '@cenk1cenk2/oclif-common'
import { Flags } from '@oclif/core'
import execa from 'execa'
import type { Listr } from 'listr2'
import { join } from 'path'

import { WorkspaceCreateCommandCtx } from '@context/workspace/create.interface'
import { NodeHelper } from '@helpers/node.helper'
import type { WorkspaceConfig } from '@interfaces/config/workspace.config.interface'
import type { Configuration } from '@interfaces/default-config.interface'
import { PackageManagerUsableCommands } from '@webundsoehne/nx-tools/dist/utils/package-manager/package-manager.constants'
import { setDevelopmentMode } from '@webundsoehne/nx-tools/dist/utils/schematics/is-development-mode'

export class WorkspaceCreateCommand extends Command<WorkspaceCreateCommandCtx, Configuration> {
  static description = 'Create a new workspace with NX.'
  static aliases = ['ws']
  static flags = {
    ['skip-updates']: Flags.boolean({
      description: 'Skip the dependency updates.',
      default: false,
      char: 's'
    }),
    force: Flags.boolean({
      description: 'Force override for schematic.',
      default: false,
      char: 'f'
    }),
    develop: Flags.boolean({
      description: 'Puts the underlying schematics to development mode, if they support it.',
      default: false,
      char: 'd'
    })
  }

  private helpers: { node: NodeHelper }

  async shouldRunBefore (): Promise<void> {
    // can not initiate helpers as private since this is initiated by oclif
    this.helpers = { node: new NodeHelper(this) }

    this.tasks.options = { rendererSilent: this.isSilent, rendererFallback: this.isDebug }
  }

  async run (): Promise<void> {
    // get oclif parameters
    const { flags } = await this.parse(WorkspaceCreateCommand)

    if (flags.develop) {
      setDevelopmentMode()

      this.logger.warn('Development flag is set. Underlying schematics will run in development mode wherever possible.')
    }

    // initiate variables#
    this.setDefaultsInCtx({
      default: [
        new WorkspaceCreateCommandCtx(),
        {
          workspaces: await this.cs.extend<WorkspaceConfig[]>(
            MergeStrategy.OVERWRITE,
            ...[this.cs.defaults, this.cs.oclif.configDir].map((path) => join(path, 'workspace.config.yml'))
          )
        }
      ]
    })

    this.tasks.add<WorkspaceCreateCommandCtx>([
      this.tasks.indent(
        [
          // ensure that git is installed
          {
            title: 'Being sure that GIT is installed.',
            task: async (_, task): Promise<void> => {
              try {
                const gitVersion = await execa('git', ['--version'])

                task.title = `Found git version: ${gitVersion.stdout}`
              } catch {
                throw new Error('GIT not available on the system or can not reach it!. Quitting.')
              }
            }
          }
        ],
        { rendererOptions: { collapse: false } },
        { title: 'Performing primary actions.' }
      ),

      // Get which workspace to use.
      {
        enabled: (ctx): boolean => Object.keys(ctx?.workspaces).length > 0,
        task: async (ctx, task): Promise<void> => {
          ctx.prompts.workspace = await task.prompt({
            type: 'Select',
            message: 'Which workspace library you want to use?',
            choices: ctx.workspaces.map((w) => w.pkg)
          })

          ctx.workspace = ctx.workspaces.find((c) => c.pkg === ctx.prompts.workspace)
          this.logger.debug('Selected workspace package is: %o', ctx.workspace)
        }
      },

      // check dependencies
      this.tasks.indent(
        [
          {
            title: 'Checking dependency requirements...',
            task: async (ctx, task): Promise<void> => {
              ctx.deps = await this.helpers.node.checkIfModuleInstalled([...this.cs.config.workspace.requiredDependencies, ctx.workspace], {
                getVersion: true,
                global: true,
                getUpdate: true
              })

              this.logger.debug('Checking required dependencies: %o', ctx.deps)

              task.title = 'Dependency requirements already satisfied.'
            }
          },

          // offer to upgrade them as required
          {
            title: 'Checking for required dependency updates...',
            skip: (): boolean => flags['skip-updates'],
            task: async (ctx, task): Promise<void> => {
              const updatable = ctx.deps.filter((d) => d.hasUpdate)

              if (updatable.length > 0) {
                const updateDeps = await task.prompt({
                  type: 'MultiSelect',
                  message: 'These dependencies have updates, select the ones you want to update.',
                  choices: updatable.map((d) => ({
                    name: d.pkg,
                    message: d.pkg,
                    hint: d.updateType
                  }))
                })

                const parsedToUpdate = updatable.filter((d) => updateDeps.includes(d.pkg)).map((u) => u.parsable)

                ctx.packages = [...ctx.packages, ...parsedToUpdate]

                this.logger.debug('Dependencies in update queue: %o', parsedToUpdate)

                task.title = `Dependencies ${parsedToUpdate.map((p) => p.pkg).join(', ')} will be updated.`
              } else {
                task.title = 'All dependencies are up-to-date.'
              }
            }
          },

          // add dependencies that should be installed to list
          {
            title: 'Looking for missing dependencies...',
            task: async (ctx, task): Promise<void> => {
              const shouldBeInstalled = ctx.deps.filter((d) => !d.installed)

              if (shouldBeInstalled.length > 0) {
                const parsedToInstall = shouldBeInstalled.map((i) => i.parsable)

                ctx.packages = [...ctx.packages, ...parsedToInstall]

                this.logger.debug('Dependencies in install queue: %o', parsedToInstall)

                task.title = `Dependencies ${parsedToInstall.map((p) => p.pkg).join(', ')} will be installed.`
              } else {
                task.title = 'All dependencies are already installed.'
              }
            }
          },

          {
            skip: (): boolean => flags['skip-updates'],
            task: (ctx): Listr =>
              this.helpers.node.packageManager(
                {
                  action: PackageManagerUsableCommands.ADD,
                  global: true,
                  // force: true,
                  useLatest: true
                },
                ctx.packages
              )
          }
        ],
        { rendererOptions: { collapse: true }, concurrent: false },
        { title: 'Performing required dependency operations.' }
      )
    ])

    // run finally prematurely
    const { ctx } = await this.finally()

    this.logger.info('Now will start generating the workspace: %s', ctx.workspace.pkg)

    const workspace = (
      await this.helpers.node.checkIfModuleInstalled([ctx.workspace], {
        getVersion: true,
        global: true,
        getUpdate: true
      })
    ).find((c) => c.pkg === ctx.workspace.pkg)

    // this will be the command
    await execa('ng', ['new', '--collection', `${workspace.path}/${ctx.workspace.collection}`, ...flags.force ? ['-f'] : []], {
      stdio: 'inherit',
      shell: true,
      env: {
        NG_DEBUG: String(this.isVerbose || this.isDebug)
      }
    })
  }
}
