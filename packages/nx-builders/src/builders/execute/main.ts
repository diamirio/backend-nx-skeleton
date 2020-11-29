import { BuilderContext, BuilderOutput, createBuilder, scheduleTargetAndForget, targetFromTargetString } from '@angular-devkit/architect'
import { BaseBuilder, pipeProcessToLogger, runBuilder } from '@webundsoehne/nx-tools'
import execa from 'execa'
import { from, iif, Observable, of, zip } from 'rxjs'
import { concatMap, filter, first, map, mapTo, tap } from 'rxjs/operators'

import { ExecuteBuilderOptions, NormalizedExecuteBuilderOptions } from './main.interface'

try {
  require('dotenv').config()
  // eslint-disable-next-line no-empty
} catch (e) {}

class Builder extends BaseBuilder<ExecuteBuilderOptions, NormalizedExecuteBuilderOptions, Record<string, never>> {
  public run (): Observable<BuilderOutput> {
    return this.handleBuild()
  }

  public normalizeOptions (options: ExecuteBuilderOptions): NormalizedExecuteBuilderOptions {
    return { watch: true, ...options }
  }

  public handleBuild (): Observable<BuilderOutput> {
    return this.runWaitUntilTargets().pipe(
      concatMap((v) => {
        if (!v.success) {
          this.logger.error('One of the tasks specified in waitUntilTargets failed.')
          return of({ success: false })
        }
        return this.startBuild().pipe(
          concatMap((event: BuilderOutput) => {
            if (!event.success) {
              this.logger.error('There was an error with the build.')
            }

            return this.handleEvent(event).pipe(mapTo(event))
          })
        )
      })
    )
  }

  public handleEvent (event: BuilderOutput): Observable<BuilderContext> {
    return iif(() => !event.success || this.options.watch || this.options.keepAlive, this.manager.stop(), of(undefined)).pipe(tap(async () => await this.runProcess(event)))
  }

  public async runProcess (event: BuilderOutput): Promise<void> {
    if (!event.success) {
      return
    }

    if (this.options.runAfter) {
      const instance = this.manager.addPersistent(
        execa.command(this.options.runAfter, { cwd: this.options.cwd ?? process.cwd(), env: { ...process.env, ...this.options.environment } })
      )

      await pipeProcessToLogger(this.context, instance)
    }
  }

  public startBuild (): Observable<BuilderOutput> {
    const target = targetFromTargetString(this.options.buildTarget)

    return from(
      Promise.all([ this.context.getTargetOptions(target), this.context.getBuilderNameForTarget(target) ]).then(([ options, builderName ]) =>
        this.context.validateOptions(options, builderName)
      )
    ).pipe(
      concatMap((options) =>
        scheduleTargetAndForget(this.context, target, {
          ...options,
          ...this.options.inject,
          watch: true
        })
      )
    )
  }

  public runWaitUntilTargets (): Observable<BuilderOutput> {
    if (!this.options.waitUntilTargets || this.options.waitUntilTargets.length === 0) {
      return of({ success: true })
    }

    return zip(
      ...this.options.waitUntilTargets.map((b) => {
        return scheduleTargetAndForget(this.context, targetFromTargetString(b)).pipe(
          // some internal angular stuff causes type problem it should be okay
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          filter((e) => e.success !== undefined),
          first()
        )
      })
    ).pipe(
      map((results) => {
        return { success: !results.some((r) => !r.success) }
      })
    )
  }
}

export default createBuilder(runBuilder(Builder))
