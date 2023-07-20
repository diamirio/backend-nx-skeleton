import type { BuilderContext } from '@angular-devkit/architect'
import type { SchematicContext } from '@angular-devkit/schematics'
import type { ExecutorContext } from '@nrwl/devkit'
import type { ExecaChildProcess } from 'execa'
import { EOL } from 'os'
import pidtree from 'pidtree'

import { Logger } from '@utils'

/**
 * Process manager is an instance where it tracks current child processes.abs
 *
 * You can add long-living and short-living process to keep track of processes spawned by node.
 */
export class ProcessManager {
  private logger: Logger
  private tasks: ExecaChildProcess[] = []
  private persistentTasks: ExecaChildProcess[] = []

  constructor (context: BuilderContext | SchematicContext | ExecutorContext) {
    this.logger = new Logger(context)
  }

  /** Add a new task that is killable. */
  add (instance: ExecaChildProcess): ExecaChildProcess {
    this.tasks = [...this.tasks, instance]

    return instance
  }

  /** Add a persistent task that should not be killed until everything finishes. */
  addPersistent (instance: ExecaChildProcess): ExecaChildProcess {
    this.persistentTasks = [...this.persistentTasks, instance]

    return instance
  }

  /** Kill all non-persistent tasks. */
  async kill (): Promise<void | void[]> {
    await this.killProcesses(this.tasks)
    this.tasks = []
  }

  /** Stop the processes compeletely. */
  async stop (): Promise<void | void[]> {
    await this.kill()
    await this.killProcesses(this.persistentTasks)
    this.persistentTasks = []
  }

  /** Tree kill proceseses. */
  private async killProcesses (tasks: ExecaChildProcess[]): Promise<void | void[]> {
    if (tasks.length === 0) {
      this.logger.debug('Nothing found to kill.')

      return
    }

    await Promise.all(
      tasks.map(async (instance) => {
        const instanceName = instance.spawnargs.join(' ')

        if (typeof instance.exitCode === 'number') {
          this.logger.debug('Instance is already stopped: %s', instanceName)

          return
        }

        instance.kill()

        const pids: number[] = []

        try {
          pids.push(...await pidtree(instance.pid, { root: true }))
        } catch (e) {
          this.logger.debug('No matching PIDs has been found:%s%s', EOL, e)
        }

        await Promise.all(
          pids.map(async (pid) => {
            try {
              process.kill(pid)
            } catch (err) {
              this.logger.debug(err)
            }
          })
        )

        this.logger.warn('Killing instance: %s > %s', instanceName, pids.join(', '))
      })
    )
  }
}
