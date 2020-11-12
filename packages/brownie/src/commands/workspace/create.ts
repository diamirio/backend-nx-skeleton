import { BaseCommand } from '@cenk1cenk2/boilerplate-oclif'
import execa from 'execa'

import { WorkspaceCreateCommandCtx } from '@context/workspace/create.interface'
import { NodeHelper } from '@helpers/node.helper'

export class WorkspaceCreateCommand extends BaseCommand {
  static description = 'Create a new workspace with NX.'
  private helpers: { node: NodeHelper }

  static flags = {}

  async run (): Promise<void> {
    // get oclif parameters
    // const { flags } = this.parse(WorkspaceCreateCommand)

    // can not initiate helpers as private since this is initiated by oclif
    this.helpers = { node: new NodeHelper(this) }

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
      {
        title: 'Checking dependency requirements...',
        task: async (ctx, task): Promise<void> => {
          const deps = await this.helpers.node.checkIfModuleInstalled([ '@webundsoehne/nx-workspace', '@nrwl/nx', '@nrwl/tao' ], {
            getVersion: true,
            global: true,
            getUpdate: true
          })
          task.title = JSON.stringify(deps)
        }
      },

      // File actions
      this.tasks.indent(
        [
          // Lock File
          {
            title: 'Adapting the lock file.',
            task: async (ctx, task): Promise<void> => {
              await this.locker.lockAll()
              task.title = 'Lock file adapted.'
            }
          }
        ],
        {},
        { title: 'Making file changes.' }
      )
    ])
  }
}
