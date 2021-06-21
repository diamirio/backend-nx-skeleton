import { BuilderContext, BuilderOutput } from '@angular-devkit/architect'
import { createProjectGraph, ProjectGraph, ProjectGraphNode } from '@nrwl/workspace/src/core/project-graph'
import { calculateProjectDependencies, DependentBuildableProjectNode } from '@nrwl/workspace/src/utils/buildable-libs-utils'
import { Observable } from 'rxjs'

import { Logger, ProcessManager } from '@utils'

/**
 * Base builder for extending from.
 */
export abstract class BaseBuilder<
  BuilderOptions extends Record<PropertyKey, any>,
  NormalizedBuilderOptions extends Record<PropertyKey, any>,
  ProcessPaths extends Record<PropertyKey, string> = Record<PropertyKey, string>
> {
  public logger: Logger
  public projectGraph: ProjectGraph
  public projectTarget: ProjectGraphNode<Record<string, unknown>>
  public projectDependencies: DependentBuildableProjectNode[]
  public options: NormalizedBuilderOptions
  public paths: ProcessPaths
  public manager: ProcessManager

  constructor (public builderOptions: BuilderOptions, public context: BuilderContext) {
    this.logger = new Logger(context)

    // create dependency
    this.projectGraph = createProjectGraph()
    const { target, dependencies } = calculateProjectDependencies(this.projectGraph, context)
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
  public abstract run (): Observable<BuilderOutput>

  /**
   * Normalize the incoming options
   * @param options
   */
  public abstract normalizeOptions (options: BuilderOptions): NormalizedBuilderOptions
}
