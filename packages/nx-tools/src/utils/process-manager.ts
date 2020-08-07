import { BuilderContext } from '@angular-devkit/architect'
import { SchematicContext } from '@angular-devkit/schematics'
import { ExecaChildProcess } from 'execa'
import pidtree from 'pidtree'

import { Logger } from './logger'

export class ProcessManager {
  private logger: Logger
  private tasks: ExecaChildProcess[] = []
  private persistentTasks: ExecaChildProcess[] = []

  constructor (context: BuilderContext | SchematicContext) {
    this.logger = new Logger(context)
  }

  public add (instance: ExecaChildProcess): ExecaChildProcess {
    this.tasks = [ ...this.tasks, instance ]
    return instance
  }

  public addPersistent (instance: ExecaChildProcess): ExecaChildProcess {
    this.persistentTasks = [ ...this.persistentTasks, instance ]
    return instance
  }

  public async kill (): Promise<void | void[]> {
    await this.killProcesses(this.tasks)
    this.tasks = []
  }

  public async stop (): Promise<void | void[]> {
    await this.kill()
    await this.killProcesses(this.persistentTasks)
    this.persistentTasks = []
  }

  private async killProcesses (tasks: ExecaChildProcess[]): Promise<void | void[]> {
    if (tasks.length === 0) {
      this.logger.debug('Nothing found to kill.')
    } else {
      await Promise.all(
        tasks.map(async (instance) => {
          const instanceName = instance.spawnargs.join(' ')

          if (typeof instance.exitCode !== 'number') {
            let pids: number[]
            try {
              pids = await pidtree(instance.pid, { root: true })
            } catch (e) {
              this.logger.debug(`No matching PIDs has been found:\n${e}`)
            }

            await Promise.all(
              pids.map(async (pid) => {
                try {
                  process.kill(pid)
                  // eslint-disable-next-line no-empty
                } catch (err) {}
              })
            )

            this.logger.warn(`Killing instance: ${instanceName} (${pids.join(', ')})`)
          } else {
            this.logger.debug(`Instance is already stopped: ${instanceName}`)
          }
        })
      )
    }
  }
}
