import { BaseCommand } from '@cenk1cenk2/boilerplate-oclif'
import { flags } from '@oclif/command'
import execa from 'execa'

import { WorkspaceCreateCommandCtx } from '@context/workspace/create.interface'
import { pipeProcessThroughListr } from '@helpers/execa.helper'
import { NodeHelper } from '@helpers/node.helper'
import { PackageManagerUsableCommands } from '@helpers/node.helper.interface'
import { Configuration } from '@interfaces/default-config.interface'

export class WorkspaceCreateCommand extends BaseCommand<Configuration> {
  static description = 'Create a new workspace with NX.'
  private helpers: { node: NodeHelper }

  static flags = {
    'skip-updates': flags.boolean({ description: 'Skip the dependency updates.', default: false })
  }

  async construct () {
    // can not initiate helpers as private since this is initiated by oclif
    this.helpers = { node: new NodeHelper(this) }
  }

  async run (): Promise<void> {
    // get oclif parameters
    const { flags } = this.parse(WorkspaceCreateCommand)

    // initiate variables
    this.tasks.ctx = new WorkspaceCreateCommandCtx()

    // get config
    const { config } = await this.getConfig('workspace.config.yml')

    // add configuration in on ctx
    this.tasks.options.ctx.workspaces = config

    this.tasks.add<WorkspaceCreateCommandCtx>([
      this.tasks.indent(
        [
          // ensure that git is installed
          {
            title: 'Being sure that GIT is installed.',
            task: async (ctx, task): Promise<void> => {
              try {
                const gitVersion = await execa('git', [ '--version' ])
                task.title = `Found git version: ${gitVersion.stdout}`
              } catch (e) {
                this.logger.debug(e)
                this.logger.fail('GIT not available on the sytem or can not reach it!. Quitting.')
                process.exit(10)
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
        task: async (ctx, task): Promise<string> =>
          ctx.prompts.workspace = await task.prompt({
            type: 'Select',
            message: 'Which workspace library you want to use?',
            choices: ctx.workspaces.map((w) => w.package)
          })
      },

      // check dependencies
      this.tasks.indent(
        (ctx) => [
          {
            title: 'Checking dependency requirements...',
            task: async (ctx, task): Promise<void> => {
              ctx.deps = await this.helpers.node.checkIfModuleInstalled([ ...this.constants.workspace.requiredDependencies, ctx.prompts.workspace ], {
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

                const parsedToUpdate = this.helpers.node.parseDependencies(updatable.filter((d) => updateDeps.includes(d.pkg)).reduce((o, d) => ({ ...o, ...d.parsable }), {}))

                ctx.installDeps = [ ...ctx.installDeps, ...parsedToUpdate ]

                this.logger.debug('Dependencies in update queue: %o', parsedToUpdate)

                task.title = `Dependencies ${parsedToUpdate.join(', ')} will be updated.`
              } else {
                task.title = 'All dependencies are up-to-date.'
              }
            }
          },

          // add dependencies that should be installed to list
          {
            title: 'Looking for missing dependencies...',
            task: async (ctx, task) => {
              const shouldBeInstalled = ctx.deps.filter((d) => !d.installed)

              if (shouldBeInstalled.length > 0) {
                const parsedToInstall = this.helpers.node.parseDependencies(shouldBeInstalled.reduce((o, d) => ({ ...o, ...d.parsable }), {}))

                ctx.installDeps = [ ...ctx.installDeps, ...parsedToInstall ]

                this.logger.debug('Dependencies in install queue: %o', parsedToInstall)

                task.title = `Dependencies ${parsedToInstall.join(', ')} will be installed.`
              } else {
                task.title = 'All dependencies are already installed.'
              }
            }
          },

          this.helpers.node.packageManager(
            {
              action: PackageManagerUsableCommands.ADD,
              global: true,
              force: true
            },
            ctx.installDeps
          )
        ],
        { rendererOptions: { collapse: true }, concurrent: false },
        { title: 'Performing required dependency operations.' }
      ),

      {
        title: 'Generating workspace...',
        task: async (ctx, task) => {
          console.log(ctx.deps)
          await pipeProcessThroughListr(
            task,
            execa('yarn', [ 'exec', 'tao', 'new', '--collection', `${ctx.prompts.workspace}/schematics.json`, '--preset', 'workspace' ], { stdio: 'inherit', shell: true })
          )
        }
      }
    ])
  }
}
