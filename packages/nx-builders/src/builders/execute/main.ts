import { BuilderOutput, createBuilder } from '@angular-devkit/architect'
import { parseTargetString, readTargetOptions, runExecutor as baseRunExecutor } from '@nrwl/devkit'
import { BaseExecutor, pipeProcessToLogger, runExecutor } from '@webundsoehne/nx-tools'
import execa from 'execa'

import { ExecuteBuilderOptions, NormalizedExecuteBuilderOptions } from './main.interface'

try {
  require('dotenv').config()
  // eslint-disable-next-line no-empty
} catch (e) {}

class Executor extends BaseExecutor<ExecuteBuilderOptions, NormalizedExecuteBuilderOptions, Record<string, never>> {
  public run (): Promise<BuilderOutput> {
    return this.handleBuild()
  }

  public normalizeOptions (options: ExecuteBuilderOptions): NormalizedExecuteBuilderOptions {
    return { watch: true, ...options }
  }

  public async handleBuild (): Promise<BuilderOutput> {
    try {
      const results = await this.runWaitUntilTargets()

      if (results.some((r) => r.success === false)) {
        throw new Error('One of the tasks specified in waitUntilTargets failed.')
      }
    } catch (e) {
      this.logger.error(e)

      return { success: false, error: e.message }
    }

    try {
      let event: BuilderOutput

      while (!event.success || this.options.watch || this.options.keepAlive) {
        event = await this.startBuild()

        await this.manager.stop()

        await this.runProcess()
      }

      return event
    } catch (e) {
      this.logger.error(e)

      return { success: false, error: e.message }
    }
  }

  public async runProcess (): Promise<void> {
    if (this.options.runAfter) {
      const instance = this.manager.addPersistent(
        execa.command(this.options.runAfter, { cwd: this.options.cwd ?? process.cwd(), env: { ...process.env, ...this.options.environment } })
      )

      await pipeProcessToLogger(this.context, instance)
    }
  }

  public async startBuild (): Promise<BuilderOutput> {
    const target = parseTargetString(this.options.buildTarget)
    const options = readTargetOptions(target, this.context)

    try {
      await baseRunExecutor(
        target,
        {
          ...options,
          ...this.options.inject,
          watch: true
        },
        this.context
      )

      return { success: true }
    } catch (e) {
      return { success: false, error: e.message }
    }
  }

  public runWaitUntilTargets (): Promise<BuilderOutput[]> {
    if (!this.options.waitUntilTargets || this.options.waitUntilTargets.length === 0) {
      return
    }

    return Promise.all(
      this.options.waitUntilTargets.map(async (waitUntilTarget) => {
        const target = parseTargetString(waitUntilTarget)
        const output = await baseRunExecutor(target, {}, this.context)

        let event = await output.next()

        while (!event.done) {
          event = await output.next()
        }

        return event.value as { success: boolean }
      })
    )
  }
}

export default createBuilder(runExecutor(Executor))
