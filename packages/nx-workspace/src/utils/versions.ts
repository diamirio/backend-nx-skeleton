import { PackageVersions, dependencyCalculator } from '@webundsoehne/nx-tools'

import { VERSIONS } from './versions.constants'
import { AvailableCLIs } from '@interfaces/available.constants'
import { NormalizedSchema as WorkspaceNormalizedSchema } from '@src/schematics/workspace/main.interface'

// calculate dependencies
export function calculateDependencies (cli: WorkspaceNormalizedSchema['cli']): PackageVersions {
  return dependencyCalculator([
    {
      deps: VERSIONS.base
    },
    {
      condition: cli === AvailableCLIs.NX,
      deps: VERSIONS[AvailableCLIs.NX]
    },
    {
      condition: cli === AvailableCLIs.ANGULAR,
      deps: VERSIONS[AvailableCLIs.ANGULAR]
    }
  ])
}
