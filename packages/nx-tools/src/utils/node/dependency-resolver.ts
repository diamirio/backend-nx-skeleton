/**
 * Merge multiple set of dependencies together.
 * @param dependenciesObjects
 */
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
