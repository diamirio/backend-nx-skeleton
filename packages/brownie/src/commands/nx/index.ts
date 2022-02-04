import { BaseCommand } from '@cenk1cenk2/boilerplate-oclif'
import { flags } from '@oclif/command'
import execa from 'execa'
import type { Listr } from 'listr2'
import { createPrompt } from 'listr2'
import { EOL } from 'os'

import { NxAddCommandCtx } from '@context/nx/add.interface'
import { NodeHelper } from '@helpers/node.helper'
import type { NxSchematicsConfig } from '@interfaces/config/nx-schematics.config.interface'
import type { Configuration } from '@interfaces/default-config.interface'
import type { LocalNodeModule } from '@webundsoehne/nx-tools'
import { PackageManagerDependencyTypes, PackageManagerUsableCommands } from '@webundsoehne/nx-tools'
import { color } from '@webundsoehne/nx-tools/dist/utils/logger/colorette'
import { isDevelopmentMode, setDevelopmentMode } from '@webundsoehne/nx-tools/dist/utils/schematics/is-development-mode'

export class NxCommand extends BaseCommand<Configuration> {
  static description = 'Configure NX modules.'

  static flags = {
    'skip-updates': flags.boolean({
      description: 'Skip the dependency updates.',
      default: false,
      char: 's'
    }),
    arguments: flags.boolean({ char: 'a', description: 'Enable prompt for passing in arguments.' }),
    develop: flags.boolean({
      description: 'Puts the underlying schematics to development mode, if they support it.',
      default: false,
      char: 'd'
    })
  }

  private helpers: { node: NodeHelper }

  async construct (): Promise<void> {
    this.helpers = { node: new NodeHelper(this) }
  }

  async run (): Promise<void> {
    const { flags } = this.parse(NxCommand)

    if (flags.develop) {
      setDevelopmentMode()

      this.logger.warn('Development flag is set. Underlying schematics will run in development mode wherever possible.')
    }

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
              hint: color.yellow(c.description) + (c.registry ? color.dim(` ${c.registry}`) : '')
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

          let link: LocalNodeModule

          if (isDevelopmentMode()) {
            task.title = color.yellow('Overriding the default package check behaviour with development mode!')

            link = (
              await this.helpers.node.checkIfModuleInstalled(ctx.prompts.schematic, {
                getVersion: true,
                getUpdate: false,
                onlyLinked: true
              })
            ).find((p) => p.pkg === ctx.prompts.schematic.pkg)

            if (link.installed && !pkg.installed) {
              ctx.packages = [...ctx.packages, link.parsable]

              return
            }
          }

          if (!pkg.installed) {
            ctx.packages = [...ctx.packages, pkg.parsable]
            task.title = `Package ${pkg.pkg} is not installed will install it.`
          } else if (link?.installed) {
            task.title = color.yellow(`Package ${link.pkg} is linked!`)
          } else if (pkg.hasUpdate) {
            task.title = `Package ${pkg.pkg} already is installed. ${color.yellow('But you should consider updating it:')} ${color.yellow(pkg.updateType)}`
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
              // force: true,
              useLatest: !isDevelopmentMode() && true,
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

    const schematic = `${ctx.prompts.schematic.pkg}:${ctx.prompts.toRunSchematic.name}`

    // this is here because long prompts corrupt listr
    if (flags.arguments || ctx.prompts.toRunSchematic.forceArguments) {
      const { manager, args, env } = this.helpers.node.parser({
        action: PackageManagerUsableCommands.EXEC,
        command: 'nx',
        args: ['g', schematic, '--help', ...this.isVerbose || this.isDebug ? ['--verbose'] : []]
      })

      const help = await execa(manager, args, { shell: true, env })

      this.logger.direct(help.stdout)

      try {
        ctx.prompts.arguments = await createPrompt({ type: 'Input', message: 'Arguments:' + EOL }, { error: false })
      } catch {
        this.logger.warn('Cancelled prompt.')
      }
    }

    this.logger.module('Now will start running the schematic: %s', schematic)

    const { manager, args, env } = this.helpers.node.parser({
      action: PackageManagerUsableCommands.EXEC,
      command: 'nx',
      args: ['g', schematic, ...ctx.prompts.arguments?.split(' ')?.length > 0 ? ctx.prompts.arguments.split(' ') : [], ...this.isVerbose || this.isDebug ? ['--verbose'] : []]
    })

    // this will be the command
    await execa(manager, args, {
      stdio: 'inherit',
      shell: true,
      env
    })
  }
}
