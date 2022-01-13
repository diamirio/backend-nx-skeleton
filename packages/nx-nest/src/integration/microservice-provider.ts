import { NxNestProjectIntegration } from './integration.interface'
import { MicroserviceProviderIntegration } from './microservice-provider.interface'
import { readWorkspaceJson } from '@webundsoehne/nx-tools'

/**
 * Reads microservice integration part of the nx.json.
 */
export function readMicroserviceIntegration (): MicroserviceProviderIntegration[] {
  const workspaceJson = readWorkspaceJson<NxNestProjectIntegration>()

  return Object.entries(workspaceJson.projects).reduce((o, [ key, value ]) => {
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
