import type { BaseCommand } from '@cenk1cenk2/boilerplate-oclif'
import execa from 'execa'
import type { Listr } from 'listr2'

import type { Configuration } from '@interfaces/default-config.interface'
import type { NodeDependency, PackageManagerPackageAction } from '@webundsoehne/nx-tools'
import { PackageManager } from '@webundsoehne/nx-tools'
import { pipeProcessThroughListr } from '@webundsoehne/nx-tools/dist/utils/logger/pipe-process-to-listr'

export class NodeHelper extends PackageManager {
  constructor (private readonly cmd: BaseCommand<Configuration>) {
    super({ manager: cmd.constants.package_manager })
  }

  /**
   * This gets ctx.packages as input to perform the required operation
   * @param options
   */
  public packageManager (options: Omit<PackageManagerPackageAction, 'package'>, packages: NodeDependency[]): Listr {
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
                  const { manager, args, env } = this.parser({ ...options, package: p })

                  this.cmd.logger.debug('Running command: %s with args %o, env: %o for package %o', manager, args, env, p)

                  await pipeProcessThroughListr(
                    task,
                    execa(manager, args, {
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
}
