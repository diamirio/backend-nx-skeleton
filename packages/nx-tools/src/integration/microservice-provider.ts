import { readNxJson, readWorkspaceJson } from '@nrwl/workspace'

import { MicroserviceIntegrationInterface } from './microservice-provider.interface'
import { EnrichedNxJson } from '@interfaces/nx-json.interface'

/**
 * Reads microservice integration part of the nx.json.
 */
export function readMicroserviceIntegration (): MicroserviceIntegrationInterface[] {
  const nxJson = readNxJson() as EnrichedNxJson
  const workspaceJson = readWorkspaceJson()

  return Object.entries(nxJson.projects).reduce((o, [ key, value ]) => {
    if (value.integration?.microservice) {
      o = [
        ...o,
        {
          name: key,
          root: workspaceJson.projects[key].root,
          sourceRoot: workspaceJson.projects[key].sourceRoot,
          microservice: value.integration.microservice
        }
      ]
    }

    return o
  }, [])
}
