import { Rule } from '@angular-devkit/schematics'
import { createProjectGraphAsync, ProjectGraph, reverse } from '@nrwl/workspace/src/core/project-graph'

import { Schema } from '../main.interface'

/**
 * Check whether the project to be removed is depended on by another project
 *
 * Throws an error if the project is in use, unless the `--forceRemove` option is used.
 *
 * @param schema The options provided to the schematic
 */
export async function checkDependencies (schema: Schema): Promise<Rule> {
  if (schema.forceRemove) {
    return
  }

  const graph: ProjectGraph = await createProjectGraphAsync()

  const reverseGraph = reverse(graph)

  const deps = reverseGraph.dependencies[schema.projectName] || []

  if (deps.length > 0) {
    throw new Error(`${schema.projectName} is still depended on by the following projects:\n${deps.map((x) => x.target).join('\n')}`)
  }
}
