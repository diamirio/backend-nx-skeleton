import { ProjectGraph, ProjectGraphDependency } from '@nrwl/workspace/src/core/project-graph'

export function resolveDependencies (dependencies: Record<string, ProjectGraphDependency[]>, project: string): string[] {
  const resolveDependencies: string[] = []
  let unresolvedDependencies = dependencies[project]

  while (unresolvedDependencies.length > 0) {
    const { target } = unresolvedDependencies.pop()

    if (!resolveDependencies.includes(target)) {
      resolveDependencies.push(target)

      unresolvedDependencies = [ ...unresolvedDependencies, ...dependencies[target] ]
    }
  }

  return resolveDependencies
}

export function dependenciesForProject (graph: ProjectGraph, project: string): Record<string, any> {
  const { dependencies, nodes } = graph

  const localDependencies = []

  if (project in dependencies) {
    const projectDependencies = resolveDependencies(dependencies, project)

    projectDependencies.forEach((target) => {
      if (nodes[target].type === 'lib') {
        localDependencies.push(nodes[target])
      }
    })
  } else {
    throw new Error('Project not found in dependency graph')
  }

  return {
    localDependencies
  }
}
