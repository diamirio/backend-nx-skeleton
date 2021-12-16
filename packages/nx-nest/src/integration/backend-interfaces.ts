import { readWorkspaceJson } from '@webundsoehne/nx-tools'

import { BackendInterfacesIntegrationInterface } from './backend-interfaces.interface'
import { NxNestProjectIntegration } from './integration.interface'

/**
 * Reads the backend interface integration part of the nx.json.
 */
export function readBackendInterfaceIntegration (): BackendInterfacesIntegrationInterface[] {
  const workspaceJson = readWorkspaceJson<NxNestProjectIntegration>()

  return Object.entries(workspaceJson.projects).reduce((o, [ key, value ]) => {
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
