import type { BuilderOutput } from '@angular-devkit/architect'
import { createBuilder } from '@angular-devkit/architect'
import delay from 'delay'
import type { ExecaChildProcess } from 'execa'
import execa from 'execa'
import fs from 'fs'
import { join } from 'path'

import type { NormalizedRunBuilderOptions, RunBuilderOptions } from './main.interface'
import type { ExecaArguments } from '@webundsoehne/nx-tools'
import { BaseExecutor, checkPathsExists, getJinjaDefaults, getNodeBinaryPath, pipeProcessToLogger, runExecutor } from '@webundsoehne/nx-tools'

try {
  require('dotenv').config()
  // eslint-disable-next-line no-empty
} catch (e) {}

class Executor extends BaseExecutor<RunBuilderOptions, NormalizedRunBuilderOptions, { command: string }> {
  async run (): Promise<BuilderOutput> {
    let success = false
    let error: string

    try {
      // stop all manager tasks
      await this.manager.stop()

      let instance: ExecaChildProcess

      if (this.builderOptions.node) {
        instance = this.manager.addPersistent(execa.node(this.paths.command, this.options.args, this.options.spawnOptions))
      } else {
        instance = this.manager.add(execa(this.paths.command, this.options.args, this.options.spawnOptions))
      }

      if (this.builderOptions.interactive) {
        this.logger.debug('This command is an interactive one, will hijack stdio.')
        await instance
      } else {
        await pipeProcessToLogger(this.context, instance, { start: true })
      }

      success = true
    } catch (e) {
      if (this.builderOptions.watch) {
        // just restart it
        this.logger.error(`${this.builderOptions.command} crashed restarting in 3 secs.`)
        this.logger.debug(e)

        await delay(3000)

        await this.manager.stop()

        return this.run()
      }

      success = false
      error = e.message
    } finally {
      // clean up the zombies!
      await this.manager.stop()
    }
    this.logger.debug('run runner finished.')

    return { success, error }
  }

  normalizeOptions (options: RunBuilderOptions): ExecaArguments {
    const jinja = getJinjaDefaults()

    const env = {
      NODE_ENV: 'develop',
      ...process.env,
      ...options.environment
    }

    const ctx = { ...options, environment: env }

    // interpolate with jinja
    options.command = jinja.renderString(options.command, ctx)
    options.args = jinja.renderString(Array.isArray(options.args) ? options.args.join(' ') : options.args, ctx)

    if (options.nodeOptions) {
      options.nodeOptions = jinja.renderString(options.nodeOptions, ctx)
    }

    const unparsedCommand = options.command.split(' ')
    const extendedArgs = options.args.split(' ')

    const command = unparsedCommand.shift()
    const args = [...unparsedCommand, ...extendedArgs].filter(Boolean)

    this.logger.debug(`Command, arguments: ${JSON.stringify(command, null, 2)}, ${JSON.stringify(args, null, 2)}`)

    if (options.node && fs.existsSync(join(options.cwd, command))) {
      // the case where file name is given and it exists
      this.logger.debug(`Command marked as node script: ${command}`)

      this.paths.command = command
    } else if (options.node) {
      // the case where a node binary like webpack or jest is given
      this.logger.debug(`Command marked as node binary: ${command}`)

      this.paths.command = getNodeBinaryPath(command)

      checkPathsExists(this.paths)
    } else {
      this.logger.debug(`Command marked as shell command: ${command}`)
      // the case where it will run any other shell command
      this.paths.command = command
    }

    // options
    const spawnOptions: ExecaArguments['spawnOptions'] = {
      env,
      stdio: options.interactive ? 'inherit' : 'pipe',
      extendEnv: false,
      shell: true,
      ...options.node && options?.nodeOptions?.length > 0 ? { nodeOptions: options.nodeOptions.split(' ') } : {}
    }

    if (options.cwd) {
      spawnOptions.cwd = options.cwd
    }

    return { args, spawnOptions }
  }
}

export default createBuilder(runExecutor(Executor))
