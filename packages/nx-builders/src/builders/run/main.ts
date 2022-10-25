import type { BuilderOutput } from '@angular-devkit/architect'
import { createBuilder } from '@angular-devkit/architect'
import delay from 'delay'
import type { ExecaChildProcess } from 'execa'
import execa from 'execa'
import { statSync, pathExistsSync } from 'fs-extra'
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

      this.logger.debug('Will run with options: %o', this.builderOptions)

      let instance: ExecaChildProcess

      if (this.builderOptions.node && this.builderOptions.executeWithNode) {
        // node script inside the repo should be run with node
        instance = this.manager.addPersistent(execa.node(this.paths.command, this.options.args, this.options.spawnOptions))
      } else {
        // any kind of global binary or node binary should be run with a child process
        instance = this.manager.addPersistent(execa(this.paths.command, this.options.args, this.options.spawnOptions))
      }

      this.logger.debug('Spawned application: %s', instance.spawnargs)

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
        this.logger.error('Crashed restarting in 3 secs: %s', this.builderOptions.command)
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
    ctx.command = jinja.renderString(ctx.command, ctx)
    ctx.args = jinja.renderString(Array.isArray(ctx.args) ? ctx.args.join(' ') : ctx.args, ctx)

    if (ctx.nodeOptions) {
      ctx.nodeOptions = jinja.renderString(ctx.nodeOptions, ctx)

      env = { ...env, ...setNodeOptionsEnvironmentVariables(ctx.nodeOptions) }
    }

    const unparsedCommand = ctx.command.split(' ')
    const extendedArgs = ctx.args.split(' ')

    const command = unparsedCommand.shift()
    const args = [...unparsedCommand, ...extendedArgs].filter(Boolean)

    this.paths.command = command

    if (ctx.node) {
      if (pathExistsSync(join(ctx.cwd, command)) && statSync(join(ctx.cwd, command)).isFile()) {
        // the case where file name is given and it exists
        this.logger.debug('Command marked as node.js script: %s', command)

        ctx.executeWithNode = true
      } else {
        // the case where a node binary like webpack or jest is given
        this.logger.debug('Command marked as node.js binary: %s', command)

        checkPathsExists(this.paths, this.pathExtensions?.path)
      }
    } else {
      this.logger.debug('Command marked as shell command: %s', command)
      // the case where it will run any other shell command

      checkPathsExists(this.paths, this.pathExtensions?.path)
    }

    // options
    const spawnOptions: ExecaArguments['spawnOptions'] = {
      env,
      stdio: ctx.interactive ? 'inherit' : 'pipe',
      extendEnv: false,
      shell: true
    }

    if (ctx.cwd) {
      spawnOptions.cwd = ctx.cwd
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
