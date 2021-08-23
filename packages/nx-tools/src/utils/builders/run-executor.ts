import { BuilderContext, BuilderOutput } from '@angular-devkit/architect'
import { ExecutorContext } from '@nrwl/devkit'
import { Workspaces } from '@nrwl/tao/src/shared/workspace'
import { Observable } from 'rxjs'

import { toObservable } from '../schematics/to-observable'
import { BaseExecutor } from './base-executor'

/**
 * Run a designated builder that is extended from base builder in NX way.
 * @param Builder
 */
export function runBuilder<
  T extends new (options: ExecutorOptions, context: ExecutorContext) => BaseExecutor<ExecutorOptions, any, any>,
  ExecutorOptions extends Record<string, any>
> (Builder: T): () => BuilderOutput {
  const builderFunction = (options: ExecutorOptions, builderContext: BuilderContext): Observable<any> => {
    const workspaceConfig = new Workspaces(builderContext.workspaceRoot).readWorkspaceConfiguration()
    const context: ExecutorContext = {
      root: builderContext.workspaceRoot,
      projectName: builderContext.target.project,
      targetName: builderContext.target.target,
      configurationName: builderContext.target.configuration,
      workspace: workspaceConfig,
      cwd: process.cwd(),
      isVerbose: false
    }

    if (builderContext.target && builderContext.target.project && builderContext.target.target) {
      context.target = workspaceConfig.projects[builderContext.target.project].targets[builderContext.target.target]
    }

    const builder = new Builder(options, context)

    return toObservable(builder.run())
  }

  return require('@angular-devkit/architect').createBuilder(builderFunction)
}
