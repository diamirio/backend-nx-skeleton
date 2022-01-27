import { Rule } from '@angular-devkit/schematics'
import execa from 'execa'
import { Listr } from 'listr2'

import { NormalizedSchema } from '../main.interface'
import { pipeProcessThroughListr } from '@utils/logger'
import { PackageManager } from '@utils/package-manager'

/**
 * A function that can create the application files for the given schematic.
 */
export function runCommand (options: NormalizedSchema): Rule {
  return async (): Promise<Rule> => {
    const packageManager = new PackageManager()

    await new Listr([
      {
        task: async (_, task): Promise<void> => {
          const { manager, args, env } = packageManager.parser(options.action)

          task.title = `Running workspace command: ${[ manager, args.join(' ') ].join(' ')} in ${options.root}`

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
    ]).run()

    return
  }
}
