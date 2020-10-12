/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { BuilderContext, BuilderOutput } from '@angular-devkit/architect'
import { createProjectGraph } from '@nrwl/workspace/src/core/project-graph'
import { calculateProjectDependencies, checkDependentProjectsHaveBeenBuilt } from '@nrwl/workspace/src/utils/buildable-libs-utils'
import { Observable, of } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'

import { BaseBuilder } from './base-builder'

/**
 * Run a designated builder that is extended from base builder in NX way.
 * @param Builder
 */
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
