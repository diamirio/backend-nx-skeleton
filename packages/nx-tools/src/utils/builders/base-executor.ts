import { ExecutorContext } from '@nrwl/devkit'
import { createProjectGraph, ProjectGraph, ProjectGraphNode } from '@nrwl/workspace/src/core/project-graph'
import { calculateProjectDependencies, DependentBuildableProjectNode } from '@nrwl/workspace/src/utilities/buildable-libs-utils'

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

  constructor (public builderOptions: ExecutorOptions, public context: ExecutorContext) {
    this.logger = new Logger(context)

    this.paths = {} as ProcessPaths

    // create dependency
    this.projectGraph = createProjectGraph()
    const { target, dependencies } = calculateProjectDependencies(this.projectGraph, context.root, context.projectName, context.targetName, context.configurationName)
    this.projectTarget = target
    this.projectDependencies = dependencies

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
  public init (): void {
    return
  }

  /**
   * The run command about what to do
   */
  public abstract run (): Promise<{ success: boolean }>

  /**
   * Normalize the incoming options
   * @param options
   */
  public abstract normalizeOptions (options: ExecutorOptions): NormalizedExecutorOptions
}
