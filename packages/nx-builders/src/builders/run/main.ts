import { BuilderOutput, createBuilder } from '@angular-devkit/architect'
import { BaseBuilder, checkNodeModulesExists, ExecaArguments, getNodeBinaryPath, pipeProcessToLogger, runBuilder } from '@webundsoehne/nx-tools'
import delay from 'delay'
import execa, { ExecaChildProcess } from 'execa'
import { Observable, Subscriber } from 'rxjs'

import { RunBuilderOptions } from './main.interface'

try {
  require('dotenv').config()
  // eslint-disable-next-line no-empty
} catch (e) {}

class Builder extends BaseBuilder<RunBuilderOptions, ExecaArguments, { command: string }> {
  public run (injectSubscriber?: Subscriber<BuilderOutput>): Observable<BuilderOutput> {
    // have to be observable create because of async subscriber, it causes no probs dont worry
    return Observable.create(async (sub: Subscriber<BuilderOutput>): Promise<void> => {
      const subscriber = injectSubscriber ?? sub

      try {
        // stop all manager tasks
        await this.manager.stop()

        let instance: ExecaChildProcess

        if (this.builderOptions.node) {
          checkNodeModulesExists(this.paths)

          instance = this.manager.addPersistent(execa.node(this.paths.command, this.options.args, this.options.spawnOptions))
        } else {
          instance = this.manager.add(execa(this.paths.command, this.options.args, this.options.spawnOptions))
        }

        await pipeProcessToLogger(this.context, instance, { start: true })

        subscriber.next({ success: true })
      } catch (error) {
        if (this.builderOptions.watch) {
          // just restart it
          this.logger.error(`${this.builderOptions.command} crashed restarting in 3 secs.`)
          this.logger.debug(error)

          await delay(3000)
          await this.manager.stop()
          await this.run(subscriber).toPromise()
        }

        subscriber.next({ success: false })
      } finally {
        // clean up the zombies!
        await this.manager.stop()

        subscriber.complete()
      }
    })
  }

  public normalizeOptions (options: RunBuilderOptions): ExecaArguments {
    const unparsedCommand = options.command.split(' ')

    const command = unparsedCommand.shift()
    const args = unparsedCommand

    this.paths = {
      command: options.node ? getNodeBinaryPath(command) : command
    }

    // options
    const spawnOptions: ExecaArguments['spawnOptions'] = {
      env: {
        NODE_ENV: 'develop',
        ...options.environment,
        ...process.env
      },
      ...options.node && options?.nodeOptions?.length > 0 ? { nodeOptions: options.nodeOptions.split(' ') } : {}
    }

    if (options.cwd) {
      spawnOptions.cwd = options.cwd
    }

    return { args, spawnOptions }
  }
}

export default createBuilder(runBuilder(Builder))
