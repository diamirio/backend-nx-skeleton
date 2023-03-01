import type { BuilderOutput } from '@angular-devkit/architect'
import type { ExecutorContext, ProjectConfiguration, ProjectGraph, ProjectGraphProjectNode } from '@nrwl/devkit'
import { createProjectGraphAsync } from '@nrwl/workspace/src/core/project-graph'
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
  public projectTarget: ProjectGraphProjectNode<any>
  public projectDependencies: DependentBuildableProjectNode[]
  public options: NormalizedExecutorOptions
  public paths: ProcessPaths
  public manager: ProcessManager
  public project: ProjectConfiguration

  constructor (public builderOptions: ExecutorOptions, public context: ExecutorContext) {}

  /**
   * Initiate the builder first.
   */
  init (): void | Promise<void> {
    return
  }

  async setup (): Promise<void> {
    this.logger = new Logger(this.context)

    this.paths = {} as ProcessPaths

    // create dependency
    this.projectGraph = await createProjectGraphAsync()
    const { target, dependencies } = calculateProjectDependencies(
      this.projectGraph,
      this.context.root,
      this.context.projectName,
      this.context.targetName,
      this.context.configurationName
    )

    this.projectTarget = target
    this.projectDependencies = dependencies

    this.project = this.context.workspace.projects[this.context.projectName]

    // normalize options
    this.options = this.normalizeOptions(this.builderOptions)

    // create a process manager
    this.manager = new ProcessManager(this.context)

    // initialize if defined
    await this.init()
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
