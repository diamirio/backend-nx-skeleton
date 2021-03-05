import { BuilderOutput, createBuilder } from '@angular-devkit/architect'
import { BaseBuilder, checkNodeModulesExists, ExecaArguments, pipeProcessToLogger, runBuilder, getNodeBinaryPath } from '@webundsoehne/nx-tools'
import { SpawnOptions } from 'child_process'
import delay from 'delay'
import execa from 'execa'
import { Observable, Subscriber } from 'rxjs'

import { RunBuilderOptions } from './main.interface'

try {
  require('dotenv').config()
  // eslint-disable-next-line no-empty
} catch (e) {}

class Builder extends BaseBuilder<RunBuilderOptions, ExecaArguments, { cli: string }> {
  public async init (): Promise<void> {
    this.paths = {
      cli: getNodeBinaryPath(this.builderOptions.cli)
    }
  }

  public run (injectSubscriber?: Subscriber<BuilderOutput>): Observable<BuilderOutput> {
    // have to be observable create because of async subscriber, it causes no probs dont worry
    return Observable.create(
      async (sub: Subscriber<BuilderOutput>): Promise<void> => {
        const subscriber = injectSubscriber ?? sub

        try {
          // stop all manager tasks
          await this.manager.stop()

          checkNodeModulesExists(this.paths)

          const instance = this.manager.addPersistent(execa.node(this.paths.cli, this.options.args, this.options.spawnOptions))
          await pipeProcessToLogger(this.context, instance, { start: true })
        } catch (error) {
          // just restart it
          this.logger.error(`${this.builderOptions.cli} crashed restarting in 3 secs.`)
          this.logger.debug(error)

          await delay(3000)
          await this.manager.stop()
          await this.run(subscriber).toPromise()
        } finally {
          // clean up the zombies!
          await this.manager.stop()
          subscriber.complete()
        }
      }
    )
  }

  public normalizeOptions (options: RunBuilderOptions): ExecaArguments {
    // default options
    const args = options?.arguments.split(' ') ?? []

    // options
    const spawnOptions: SpawnOptions = {
      env: {
        NODE_ENV: 'develop',
        ...options.environment,
        ...process.env
      }
    }

    if (options.cwd) {
      spawnOptions.cwd = options.cwd
    }

    return { args, spawnOptions }
  }
}

export default createBuilder(runBuilder(Builder))
