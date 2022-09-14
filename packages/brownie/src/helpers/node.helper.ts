import type { Command } from '@cenk1cenk2/oclif-common'
import { pipeProcessThroughListr } from '@cenk1cenk2/oclif-common'
import execa from 'execa'
import type { Listr } from 'listr2'

import type { AvailablePackageManagers, NodeDependency, PackageManagerPackageAction } from '@webundsoehne/nx-tools'
import { PackageManager } from '@webundsoehne/nx-tools'

export class NodeHelper extends PackageManager {
  constructor (private readonly cmd: Command, options?: { manager?: AvailablePackageManagers }) {
    super({ manager: options?.manager })
  }

  /**
   * This gets ctx.packages as input to perform the required operation
   * @param options
   */
  packageManager (options: Omit<PackageManagerPackageAction, 'package'>, packages: NodeDependency[]): Listr {
    return this.cmd.tasks.newListr<any, 'default'>(
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
