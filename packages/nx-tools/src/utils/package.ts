import { ProjectGraph } from '@nrwl/workspace/src/core/project-graph'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

export function readPackageJsonFromPath (path: string): string {
  try {
    return JSON.parse(readFileSync(join(path, 'package.json'), 'utf8'))
  } catch (error) {
    throw new Error('Could not read package.json')
  }
}

export function writePackageJsonToPath (packageJson: object, path: string): void {
  try {
    return writeFileSync(join(path, 'package.json'), JSON.stringify(packageJson, null, 4), 'utf8')
  } catch (error) {
    throw new Error('Could not write package.json')
  }
}

export function createDependenciesForProjectFromGraph (graph: ProjectGraph, project: string): Record<string, string> {
  const npmDependencies: Record<string, string> = {}
  const projects: string[] = [ project ]

  while (projects.length > 0) {
    const project = projects.shift()

    graph.dependencies[project].forEach((dependency) => {
      try {
        const { type, name, data } = graph.nodes[dependency.target]

        switch (type) {
        case 'npm':
          npmDependencies[name] = data.version
          break
        case 'lib':
          projects.push(name)
          break
        }
      } catch (error) {
        throw new Error(`Could not resolve dependency for ${dependency.target}`)
      }
    })
  }

  return npmDependencies
}

export function mergeDependencies (...dependenciesObjects: Record<string, string>[]): Record<string, string> {
  const mergedDependencies: Record<string, string> = {}

  dependenciesObjects.forEach((dependencies) => {
    Object.entries(dependencies).forEach(([ dependency, version ]) => {
      if (dependency in mergedDependencies && version !== mergedDependencies[dependency]) {
        throw new Error(`Could not merge dependencies for ${dependency}: Version mismatch ${version} <-> ${mergedDependencies[dependency]}`)
      } else {
        mergedDependencies[dependency] = version
      }
    })
  })

  return mergedDependencies
}
