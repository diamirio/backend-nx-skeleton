import { PackageVersions, dependencyCalculator } from '@webundsoehne/nx-tools'

import { VERSIONS } from './versions.constants'
import { AvailableBuilders } from '@interfaces/available.constants'
import { Schema } from '@src/schematics/init/main.interface'

// calculate dependencies
export function calculateDependencies (options: Schema['items']): PackageVersions {
  return dependencyCalculator([
    {
      deps: VERSIONS.base.default
    },
    {
      condition: options.includes(AvailableBuilders.TSC),
      deps: VERSIONS[AvailableBuilders.TSC]
    },
    {
      condition: options.includes(AvailableBuilders.TS_NODE_DEV),
      deps: VERSIONS[AvailableBuilders.TS_NODE_DEV]
    }
  ])
}
