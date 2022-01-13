import { Rule } from '@angular-devkit/schematics'

import { BrownieAvailableContainers, BrownieIntegration } from './brownie.interface'
import { readWorkspaceJson, readWorkspaceJsonProject, updateNxIntegration } from './integration'
import { BaseIntegration } from './integration.interface'
import { deepMergeWithUniqueMergeArray } from '@webundsoehne/deep-merge'

/**
 * Updates brownie integration by wiriting data to nx.json
 * @param name
 * @param options
 */
export function updateBrownieIntegration (name: string, data: BrownieIntegration): Rule {
  return updateNxIntegration<BaseIntegration>(name, { brownie: data }, { arrayOverwrite: false })
}

/**
 * Returns the brownie integration part of the nx.json.
 * @param name
 */
export function readBrownieIntegration (name: string): BrownieIntegration {
  return readWorkspaceJsonProject<BaseIntegration>(name).integration?.brownie
}

/**
 * Returns sum of brownie containers read from nx.json.
 */
export function readBrownieContainers (): BrownieAvailableContainers[] {
  const nxJson = readWorkspaceJson<BaseIntegration>()

  return Object.values(nxJson.projects).reduce((o, value) => {
    if (value.integration?.brownie?.containers) {
      o = deepMergeWithUniqueMergeArray(o, value.integration.brownie.containers)
    }

    return o
  }, [])
}
