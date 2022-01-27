import { VERSIONS } from './versions.constants'
import { AvailableCLIs } from '@interfaces/available.constants'
import { NormalizedSchema as WorkspaceNormalizedSchema } from '@schematics/workspace/main.interface'
import { PackageVersions, dependencyCalculator } from '@webundsoehne/nx-tools'

// calculate dependencies
export async function calculateDependencies (options: WorkspaceNormalizedSchema): Promise<PackageVersions> {
  return dependencyCalculator([
    {
      deps: VERSIONS.base.default
    },
    {
      condition: options.cli === AvailableCLIs.NX,
      deps: VERSIONS[AvailableCLIs.NX]
    }
  ])
}
