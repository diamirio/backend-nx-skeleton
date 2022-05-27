import type { BuilderOutput } from '@angular-devkit/architect'
import { createBuilder } from '@angular-devkit/architect'
import delay from 'delay'
import type { ExecaChildProcess } from 'execa'
import execa from 'execa'
import { pathExistsSync } from 'fs-extra'
import { join } from 'path'

import type { NormalizedRunBuilderOptions, RunBuilderOptions } from './main.interface'
import {
  BaseExecutor,
  checkPathsExists,
  getJinjaDefaults,
  getNodeBinaryPathExtensions,
  pipeProcessToLogger,
  runExecutor,
  setNodeOptionsEnvironmentVariables
} from '@webundsoehne/nx-tools'
import type { ExecaArguments, NodeBinaryPathExtensions } from '@webundsoehne/nx-tools'

try {
  require('dotenv').config()
  // eslint-disable-next-line no-empty
} catch (e) {}

class Executor extends BaseExecutor<RunBuilderOptions, NormalizedRunBuilderOptions, { command: string }> {
  pathExtensions: NodeBinaryPathExtensions

  init (): void {
    this.pathExtensions = getNodeBinaryPathExtensions()
  }

  async run (): Promise<BuilderOutput> {
    let success = false
    let error: string

    try {
      // stop all manager tasks
      await this.manager.stop()

      let instance: ExecaChildProcess

      if (this.builderOptions.executeWithNode) {
        // node script inside the repo should be run with node
        instance = this.manager.addPersistent(execa.node(this.paths.command, this.options.args, this.options.spawnOptions))
      } else {
        // any kind of global binary or node binary should be run with a child process
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

    this.logger.debug('Run executor finished.')

    return { success, error }
  }

  normalizeOptions (options: RunBuilderOptions): ExecaArguments {
    const jinja = getJinjaDefaults()

    let env = {
      NODE_ENV: 'develop',
      ...process.env,
      ...options.environment
    }

    const ctx: RunBuilderOptions = {
      ...options,
      environment: env
    }

    // interpolate with jinja
    options.command = jinja.renderString(options.command, ctx)
    options.args = jinja.renderString(Array.isArray(options.args) ? options.args.join(' ') : options.args, ctx)

    if (options.nodeOptions) {
      options.nodeOptions = jinja.renderString(options.nodeOptions, ctx)

      env = { ...env, ...setNodeOptionsEnvironmentVariables(options.nodeOptions) }
    }

    const unparsedCommand = options.command.split(' ')
    const extendedArgs = options.args.split(' ')

    const command = unparsedCommand.shift()
    const args = [...unparsedCommand, ...extendedArgs].filter(Boolean)

    if (options.node) {
      if (pathExistsSync(join(options.cwd, command))) {
        // the case where file name is given and it exists
        this.logger.debug(`Command marked as node.js script: ${command}`)

        options.executeWithNode = true

        this.paths.command = join(options.cwd, command)

        checkPathsExists(this.paths)
      } else {
        // the case where a node binary like webpack or jest is given
        this.logger.debug(`Command marked as node.js binary: ${command}`)

        this.paths.command = command

        checkPathsExists(this.paths, this.pathExtensions?.path)
      }
    } else {
      this.logger.debug(`Command marked as shell command: ${command}`)
      // the case where it will run any other shell command
      this.paths.command = command

      checkPathsExists(this.paths, this.pathExtensions?.path)
    }

    // options
    const spawnOptions: ExecaArguments['spawnOptions'] = {
      env,
      stdio: options.interactive ? 'inherit' : 'pipe',
      extendEnv: false,
      shell: true
    }

    if (options.cwd) {
      spawnOptions.cwd = options.cwd
    }

    if (this.pathExtensions?.key) {
      spawnOptions.env[this.pathExtensions.key] = this.pathExtensions.path
    }

    this.builderOptions = ctx

    this.logger.debug('Arguments: %o', args)
    this.logger.debug('Spawn options: %o', spawnOptions)

    return { args, spawnOptions }
  }
}

export default createBuilder(runExecutor(Executor))
