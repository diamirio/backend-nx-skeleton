import { Tree } from '@angular-devkit/schematics'

import { NxNestProjectIntegration } from './integration.interface'
import { MicroserviceProviderIntegration } from './microservice-provider.interface'
import { readWorkspaceProjects } from '@webundsoehne/nx-tools'

/**
 * Reads microservice integration part of the nx.json.
 */
export function readMicroserviceIntegration (host: Tree): MicroserviceProviderIntegration[] {
  const projects = readWorkspaceProjects<NxNestProjectIntegration>(host)

  return Object.entries(projects).reduce((o, [ key, value ]) => {
    if (value.integration?.microserviceProvider) {
      o = [
        ...o,
        {
          name: key,
          root: value.root,
          sourceRoot: value.sourceRoot,
          microservice: value.integration.microserviceProvider
        }
      ]
    }

    return o
  }, [])
}
