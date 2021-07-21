import { readNxJson, readWorkspaceJson } from '@nrwl/workspace'

import { BackendInterfacesIntegrationInterface } from './backend-interfaces.interface'
import { EnrichedNxJson } from '@interfaces/nx-json.interface'

/**
 * Reads the backend interface integration part of the nx.json.
 */
export function readBackendInterfaceIntegration (): BackendInterfacesIntegrationInterface[] {
  const nxJson = readNxJson() as EnrichedNxJson
  const workspaceJson = readWorkspaceJson()

  return Object.entries(nxJson.projects).reduce((o, [ key, value ]) => {
    if (value.integration?.dbAdapters) {
      o = [
        ...o,
        {
          name: key,
          root: workspaceJson.projects[key].root,
          sourceRoot: workspaceJson.projects[key].sourceRoot,
          dbAdapter: value.integration.dbAdapters
        }
      ]
    }

    return o
  }, [])
}
