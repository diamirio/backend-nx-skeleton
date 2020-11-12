import { BuilderOutput, createBuilder } from '@angular-devkit/architect'
import { checkNodeModulesExists, ExecaArguments, pipeProcessToLogger, removePathRoot, BaseBuilder, runBuilder } from '@webundsoehne/nx-tools'
import { SpawnOptions } from 'child_process'
import execa from 'execa'
import { join } from 'path'
import { Observable, Subscriber } from 'rxjs'

import { TsNodeBuilderOptions } from './main.interface'

try {
  require('dotenv').config()
  // eslint-disable-next-line no-empty
} catch (e) {}

class Builder extends BaseBuilder<TsNodeBuilderOptions, ExecaArguments, { tsNodeDev: string }> {
  public async init (): Promise<void> {
    this.paths = {
      tsNodeDev: join(execa.sync('npm', [ 'bin' ]).stdout, 'ts-node-dev')
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

          const instance = this.manager.addPersistent(execa.node(this.paths.tsNodeDev, this.options.args, this.options.spawnOptions))
          await pipeProcessToLogger(this.context, instance, { start: true })
        } catch (error) {
          this.logger.error('ts-node-dev crashed restarting.')

          this.run(subscriber)
        } finally {
          // clean up the zombies!
          await this.manager.stop()
          subscriber.complete()
        }
      }
    )
  }

  public normalizeOptions (options: TsNodeBuilderOptions): ExecaArguments {
    const { main, tsConfig, debounce, interval, debug, cwd, environment, inspect } = options

    // default options
    let args = [ '-r', 'tsconfig-paths/register' ]

    const argParser: { condition: boolean, args: string[] }[] = [
      { condition: !!tsConfig, args: [ '--project', cwd ? removePathRoot(tsConfig, cwd) : tsConfig ] },
      { condition: !!debounce, args: [ '--debounce', `${debounce}` ] },
      { condition: !!interval, args: [ '--interval', `${interval}` ] },
      { condition: !!debug, args: [ '--debug' ] },
      { condition: !!inspect, args: [ `--inspect=0.0.0.0:${options.inspect}` ] }
    ]

    argParser.forEach((a) => {
      if (a.condition) {
        args = [ ...args, ...a.args ]
      }
    })

    // options

    if (!main) {
      throw new Error('No entry point set.')
    }

    // run path
    args = [ ...args, cwd ? removePathRoot(main, cwd) : main ]

    const spawnOptions: SpawnOptions = {
      env: {
        NODE_ENV: 'develop',
        ...environment,
        ...process.env
      }
    }

    if (cwd) {
      spawnOptions.cwd = cwd
    }

    return { args, spawnOptions }
  }
}

export default createBuilder(runBuilder(Builder))
