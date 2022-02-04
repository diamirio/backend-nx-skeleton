import type { BuilderOutput } from '@angular-devkit/architect'
import type { ExecutorContext, ProjectConfiguration, ProjectGraph, ProjectGraphNode } from '@nrwl/devkit'
import { readCachedProjectGraph } from '@nrwl/workspace/src/core/project-graph'
import type { DependentBuildableProjectNode } from '@nrwl/workspace/src/utilities/buildable-libs-utils'
import { calculateProjectDependencies } from '@nrwl/workspace/src/utilities/buildable-libs-utils'

import { Logger, ProcessManager } from '@utils'

/**
 * Base builder for extending from.
 */
export abstract class BaseExecutor<
  ExecutorOptions extends Record<PropertyKey, any>,
  NormalizedExecutorOptions extends Record<PropertyKey, any>,
  ProcessPaths extends Record<PropertyKey, string> = Record<PropertyKey, string>
> {
  public logger: Logger
  public projectGraph: ProjectGraph
  public projectTarget: ProjectGraphNode<Record<string, unknown>>
  public projectDependencies: DependentBuildableProjectNode[]
  public options: NormalizedExecutorOptions
  public paths: ProcessPaths
  public manager: ProcessManager
  public project: ProjectConfiguration

  constructor (public builderOptions: ExecutorOptions, public context: ExecutorContext) {
    this.logger = new Logger(context)

    this.paths = {} as ProcessPaths

    // create dependency
    this.projectGraph = readCachedProjectGraph()
    const { target, dependencies } = calculateProjectDependencies(this.projectGraph, context.root, context.projectName, context.targetName, context.configurationName)

    this.projectTarget = target
    this.projectDependencies = dependencies

    this.project = context.workspace.projects[context.projectName]

    // normalize options
    this.options = this.normalizeOptions(builderOptions)

    // create a process manager
    this.manager = new ProcessManager(context)

    // initialize if defined
    this.init()
  }

  /**
   * Initiate the builder first.
   */
  init (): void {
    return
  }

  /**
   * The run command about what to do
   */
  abstract run (): Promise<BuilderOutput>

  /**
   * Normalize the incoming options
   * @param options
   */
  abstract normalizeOptions (options: ExecutorOptions): NormalizedExecutorOptions
}
