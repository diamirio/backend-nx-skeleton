import { PackageVersions, deepMerge } from '@webundsoehne/nx-tools'

import { VERSIONS } from './versions.constants'
import { AvailableBuilders } from '@src/interfaces/available.constants'
import { Schema } from '@src/schematics/init/main.interface'

// calculate dependencies
export function calculateDependencies (options: Schema['items']): PackageVersions {
  let dependencies: PackageVersions = VERSIONS.base.default

  if (options.includes(AvailableBuilders.TSC)) {
    dependencies = deepMerge(dependencies, VERSIONS[AvailableBuilders.TSC])
  }

  if (options.includes(AvailableBuilders.TS_NODE_DEV)) {
    dependencies = deepMerge(dependencies, VERSIONS[AvailableBuilders.TS_NODE_DEV])
  }

  return dependencies
}
