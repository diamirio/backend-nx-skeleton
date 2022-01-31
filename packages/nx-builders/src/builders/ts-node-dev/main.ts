import type { BuilderOutput } from '@angular-devkit/architect'
import { createBuilder } from '@angular-devkit/architect'
import delay from 'delay'
import execa from 'execa'

import type { TsNodeBuilderOptions } from './main.interface'
import type { ExecaArguments } from '@webundsoehne/nx-tools'
import { BaseExecutor, checkPathsExists, getNodeBinaryPath, pipeProcessToLogger, removePathRoot, runExecutor } from '@webundsoehne/nx-tools'

try {
  require('dotenv').config()
  // eslint-disable-next-line no-empty
} catch (e) {}

class Executor extends BaseExecutor<TsNodeBuilderOptions, ExecaArguments, { tsNodeDev: string }> {
  async init (): Promise<void> {
    this.paths = {
      tsNodeDev: getNodeBinaryPath('ts-node-dev')
    }
  }

  async run (): Promise<BuilderOutput> {
    try {
      // stop all manager tasks
      await this.manager.stop()

      checkPathsExists(this.paths)
    } catch (e) {
      this.logger.fatal(e.message)
      this.logger.debug(e.stack)

      return { success: false, error: e.message }
    }

    try {
      const instance = this.manager.addPersistent(execa.node(this.paths.tsNodeDev, this.options.args, this.options.spawnOptions))

      await pipeProcessToLogger(this.context, instance, { start: true })
    } catch (error) {
      // just restart it
      this.logger.error('ts-node-dev crashed restarting in 3 secs.')
      this.logger.debug(error)

      await delay(3000)
      await this.manager.stop()

      return this.run()
    } finally {
      // clean up the zombies!
      await this.manager.stop()
    }

    this.logger.debug('Executor finished.')

    return { success: true }
  }

  normalizeOptions (options: TsNodeBuilderOptions): ExecaArguments {
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

    const spawnOptions: ExecaArguments['spawnOptions'] = {
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

export default createBuilder(runExecutor(Executor))
