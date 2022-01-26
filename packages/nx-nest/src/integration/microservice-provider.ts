import { Tree } from '@angular-devkit/schematics'

import { NxNestProjectIntegration } from './integration.interface'
import { MicroserviceProviderWorkspaceIntegration } from './microservice-provider.interface'
import { readWorkspaceProjects } from '@webundsoehne/nx-tools'

/**
 * Reads microservice integration part of the nx.json.
 */
export function readMicroserviceProviderWorkspaceIntegration (host: Tree): MicroserviceProviderWorkspaceIntegration[] {
  const projects = readWorkspaceProjects<NxNestProjectIntegration>(host)

  return Object.entries(projects).reduce((o, [ key, value ]) => {
    if (value.integration?.nestjs?.microservice) {
      o = [
        ...o,
        {
          name: key,
          root: value.root,
          sourceRoot: value.sourceRoot,
          microservice: value.integration?.nestjs?.microservice
        }
      ]
    }

    return o
  }, [] as MicroserviceProviderWorkspaceIntegration[])
}