/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { BuilderContext, BuilderOutput } from '@angular-devkit/architect'
import { createProjectGraph, ProjectGraph, ProjectGraphNode } from '@nrwl/workspace/src/core/project-graph'
import { calculateProjectDependencies, checkDependentProjectsHaveBeenBuilt, DependentBuildableProjectNode } from '@nrwl/workspace/src/utils/buildable-libs-utils'
import { Logger, ProcessManager } from '@webundsoehne/nx-tools'
import { Observable, of } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'

export function runBuilder<T extends new (options: BuilderOptions, context: BuilderContext) => BaseBuilder<BuilderOptions, any, any>, BuilderOptions extends Record<string, any>> (
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Builder: T
): (options: BuilderOptions, context: BuilderContext) => Observable<BuilderOutput> {
  return function (options: BuilderOptions, context: BuilderContext): Observable<BuilderOutput> {
    const { dependencies } = calculateProjectDependencies(createProjectGraph(), context)

    return of(checkDependentProjectsHaveBeenBuilt(context, dependencies)).pipe(
      switchMap((result) => {
        if (result) {
          const builder = new Builder(options, context)
          return builder.run()
        } else {
          return of({ success: false })
        }
      }),
      map((value) => {
        return value
      })
    )
  }
}

export abstract class BaseBuilder<
  BuilderOptions extends Record<string, any>,
  NormalizedBuilderOptions extends Record<string, any>,
  ProcessPaths extends Record<string, string> = Record<string, string>
> {
  public logger: Logger
  public projectGraph: ProjectGraph
  public projectTarget: ProjectGraphNode<Record<string, unknown>>
  public projectDependencies: DependentBuildableProjectNode[]
  public options: NormalizedBuilderOptions
  public paths: ProcessPaths
  public manager: ProcessManager

  constructor (options: BuilderOptions, public context: BuilderContext) {
    this.logger = new Logger(context)

    // create dependency
    this.projectGraph = createProjectGraph()
    const { target, dependencies } = calculateProjectDependencies(this.projectGraph, context)
    this.projectTarget = target
    this.projectDependencies = dependencies

    // normalize options
    this.options = this.normalizeOptions(options)

    // create a process manager
    this.manager = new ProcessManager(this.context)

    // initialize if defined
    this.init()
  }

  public init (): void {
    return
  }

  public abstract run (): Observable<BuilderOutput>

  public abstract normalizeOptions (options: BuilderOptions): NormalizedBuilderOptions
}
