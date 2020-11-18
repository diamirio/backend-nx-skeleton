import { BaseCommand } from '@cenk1cenk2/boilerplate-oclif'
import { Listr } from 'listr2'

import { NxAddCommandCtx } from '@context/nx/add.interface'
import { Configuration } from '@interfaces/default-config.interface'
import { NodeHelper } from '@src/helpers/node.helper'
import { PackageManagerUsableCommands } from '@src/helpers/node.helper.interface'
import { NxSchematicsConfig } from '@src/interfaces/config/nx-schematics.config.interface'

export class NxCommand extends BaseCommand<Configuration> {
  static description = 'Configure NX modules.'

  private helpers: { node: NodeHelper }

  public async construct (): Promise<void> {
    this.helpers = { node: new NodeHelper(this) }
  }

  public async run (): Promise<void> {
    // get config
    const { config } = await this.getConfig<NxSchematicsConfig[]>('nx-schematics.config.yml')

    // initiate variables
    this.tasks.ctx = new NxAddCommandCtx()

    this.tasks.add<NxAddCommandCtx>([
      {
        task: async (ctx, task): Promise<void> => {
          ctx.prompts.schematic = await task.prompt({
            type: 'Select',
            message: 'Please select which schematic you want to use.',
            choices: config.map((c) => ({
              name: c.package,
              message: c.package,
              hint: c.description
            }))
          })

          task.title = `Package ${ctx.prompts.schematic} will be used.`
        }
      },

      {
        title: 'Checking whether this package is already installed.',
        task: async (ctx, task): Promise<void> => {
          const pkg = (await this.helpers.node.checkIfModuleInstalled(ctx.prompts.schematic, { getVersion: true, getUpdate: true })).find((p) => p.pkg === ctx.prompts.schematic)

          if (!pkg.installed) {
            ctx.packages = [ ...ctx.packages, pkg.pkg ]
            task.title = `Package ${pkg.pkg} is not installed will install it.`
          } else if (pkg.hasUpdate) {
            task.title = `Package ${pkg.pkg} already is installed. But you might consider updating it: ${pkg.updateType}`
          } else {
            task.title = `Package ${pkg.pkg} is installed and at latest version.`
          }
        }
      },

      {
        task: (ctx): Listr =>
          this.helpers.node.packageManager(
            {
              action: PackageManagerUsableCommands.ADD,
              global: true,
              force: true
            },
            ctx.packages
          )
      }
    ])
  }
}
