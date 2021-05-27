import { BaseCommand, LogLevels } from '@cenk1cenk2/boilerplate-oclif'
import { flags } from '@oclif/command'
import chalk from 'chalk'
import execa from 'execa'
import { createPrompt, Listr } from 'listr2'
import { EOL } from 'os'

import { NxAddCommandCtx } from '@context/nx/add.interface'
import { Configuration } from '@interfaces/default-config.interface'
import { NodeHelper } from '@src/helpers/node.helper'
import { PackageManagerDependencyTypes, PackageManagerUsableCommands } from '@src/helpers/node.helper.interface'
import { NxSchematicsConfig } from '@src/interfaces/config/nx-schematics.config.interface'

export class NxCommand extends BaseCommand<Configuration> {
  static description = 'Configure NX modules.'

  static flags = {
    'skip-updates': flags.boolean({
      description: 'Skip the dependency updates.',
      default: false,
      char: 's'
    }),
    arguments: flags.boolean({ char: 'a', description: 'Enable prompt for passing in arguments.' })
  }

  private helpers: { node: NodeHelper }

  public async construct (): Promise<void> {
    this.helpers = { node: new NodeHelper(this) }
  }

  public async run (): Promise<void> {
    const { flags } = this.parse(NxCommand)
    // get config
    const { config } = await this.getConfig<NxSchematicsConfig[]>('nx-schematics.config.yml')

    // initiate variables
    this.tasks.ctx = new NxAddCommandCtx()

    this.tasks.add<NxAddCommandCtx>([
      {
        task: async (ctx, task): Promise<void> => {
          const schematic = await task.prompt({
            type: 'AutoComplete',
            message: 'Please select which schematic you want to use.',
            choices: config.map((c) => ({
              name: c.pkg,
              message: c.pkg,
              hint: chalk.yellow(c.description) + (c.registry ? chalk.dim(` ${c.registry}`) : '')
            }))
          })

          ctx.prompts.schematic = config.find((c) => c.pkg === schematic)

          task.title = `Package ${ctx.prompts.schematic.pkg} will be used.`
        }
      },

      {
        title: 'Checking whether this package is already installed.',
        task: async (ctx, task): Promise<void> => {
          const pkg = (
            await this.helpers.node.checkIfModuleInstalled(ctx.prompts.schematic, {
              getVersion: true,
              getUpdate: true,
              global: false
            })
          ).find((p) => p.pkg === ctx.prompts.schematic.pkg)

          if (!pkg.installed) {
            ctx.packages = [ ...ctx.packages, pkg.parsable ]
            task.title = `Package ${pkg.pkg} is not installed will install it.`
          } else if (pkg.hasUpdate) {
            task.title = `Package ${pkg.pkg} already is installed. But you might consider updating it: ${pkg.updateType}`
          } else {
            task.title = `Package ${pkg.pkg} is installed and at latest version.`
          }
        }
      },

      {
        skip: (): boolean => flags['skip-updates'],
        task: (ctx): Listr =>
          this.helpers.node.packageManager(
            {
              action: PackageManagerUsableCommands.ADD,
              force: true,
              useLatest: true,
              type: PackageManagerDependencyTypes.DEVELOPMENT
            },
            ctx.packages
          )
      },

      {
        task: async (ctx, task): Promise<void> => {
          const toRunSchematic = await task.prompt({
            type: 'AutoComplete',
            message: `Please select which schematic you want to run from ${ctx.prompts.schematic.pkg}?`,
            choices: ctx.prompts.schematic.schematics.map((s) => ({
              name: s.name,
              message: s.name,
              hint: s.description
            }))
          })

          ctx.prompts.toRunSchematic = ctx.prompts.schematic.schematics.find((s) => s.name === toRunSchematic)

          task.title = `Will run schematic: ${ctx.prompts.toRunSchematic.name}`
        }
      }
    ])

    // run finally prematurely
    const { ctx } = await this.finally<NxAddCommandCtx>()

    // this is here because long prompts corrupt listr
    if (flags.arguments || ctx.prompts.toRunSchematic.forceArguments) {
      const help = await execa(this.helpers.node.manager, [ 'run', 'nx', 'g', `${ctx.prompts.schematic.pkg}:${ctx.prompts.toRunSchematic.name}`, '--', '--help' ], { shell: true })
      this.logger.direct(help.stdout)

      try {
        ctx.prompts.arguments = await createPrompt({ type: 'Input', message: 'Arguments:' + EOL }, { error: false })
      } catch {
        this.logger.warn('Cancelled prompt.')
      }
    }

    this.logger.module('Now will start running the schematic...')

    // this will be the command
    await execa(
      this.helpers.node.manager,
      [
        'run',
        'nx',
        'g',
        `${ctx.prompts.schematic.pkg}:${ctx.prompts.toRunSchematic.name}`,
        ...ctx.prompts?.arguments?.split(' ').length > 0 ? ctx.prompts?.arguments?.split(' ') : [],
        ...[ LogLevels.verbose, LogLevels.debug ].includes(this.constants.loglevel as LogLevels) ? [ '--', '--verbose' ] : []
      ],
      { stdio: 'inherit', shell: true }
    )
  }
}
