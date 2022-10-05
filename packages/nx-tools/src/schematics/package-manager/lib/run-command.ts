import type { Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import execa from 'execa'

import type { NormalizedSchema } from '../main.interface'
import { Manager } from '@utils'
import { Logger, pipeProcessThroughListr } from '@utils/logger'
import { PackageManager } from '@utils/package-manager'

/**
 * A function that can create the application files for the given schematic.
 */
export function runCommand (options: NormalizedSchema): Rule {
  return async (_host: Tree, context: SchematicContext): Promise<Rule> => {
    const packageManager = new PackageManager()
    const log = new Logger(context)

    return new Manager(context).run<Rule>([
      {
        task: async (_, task): Promise<void> => {
          const { manager, args, env } = packageManager.parser(options.action)

          log.debug('Project root: %s', options.root)

          task.title = `Running in workspace: ${[manager, args.join(' ')].join(' ')}`

          await pipeProcessThroughListr(
            task,
            execa(manager, args, {
              stdio: 'pipe',
              shell: true,
              env,
              cwd: options.root
            })
          )
        }
      }
    ])
  }
}
