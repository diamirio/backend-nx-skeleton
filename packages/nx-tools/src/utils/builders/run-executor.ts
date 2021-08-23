import { BuilderContext, BuilderOutput } from '@angular-devkit/architect'
import { ExecutorContext } from '@nrwl/devkit'
import { Workspaces } from '@nrwl/tao/src/shared/workspace'
import { Observable } from 'rxjs'

import { isVerbose } from '../schematics'
import { toObservable } from '../schematics/to-observable'
import { BaseExecutor } from './base-executor'

/**
 * Run a designated builder that is extended from base builder in NX way.
 * @param Builder
 */
export function runExecutor<
  T extends new (options: ExecutorOptions, context: ExecutorContext) => BaseExecutor<ExecutorOptions, any, any>,
  ExecutorOptions extends Record<string, any>
> (Builder: T): (options: ExecutorOptions, builderContext: BuilderContext) => Observable<BuilderOutput> {
  return (options: ExecutorOptions, builderContext: BuilderContext): Observable<BuilderOutput> => {
    const workspaceConfig = new Workspaces(builderContext.workspaceRoot).readWorkspaceConfiguration()

    const context: ExecutorContext = {
      root: builderContext.workspaceRoot,
      projectName: builderContext.target.project,
      targetName: builderContext.target.target,
      configurationName: builderContext.target.configuration,
      workspace: workspaceConfig,
      cwd: process.cwd(),
      isVerbose: isVerbose()
    }

    if (builderContext.target && builderContext.target.project && builderContext.target.target) {
      context.target = workspaceConfig.projects[builderContext.target.project].targets[builderContext.target.target]
    }

    const builder = new Builder(options, context)

    return toObservable(builder.run())
  }
}
