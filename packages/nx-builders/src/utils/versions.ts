import { VERSIONS } from './versions.constants'
import { AvailableBuilders } from '@interfaces/available.constants'
import { Schema } from '@src/schematics/init/main.interface'
import { PackageVersions, dependencyCalculator } from '@webundsoehne/nx-tools'

// calculate dependencies
export function calculateDependencies (options: Schema['items']): PackageVersions {
  return dependencyCalculator([
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
