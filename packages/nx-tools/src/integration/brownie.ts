import { Rule } from '@angular-devkit/schematics'
import { readNxJson } from '@nrwl/workspace'

import { BaseIntegration, readWorkspaceJsonProject, updateNxIntegration } from '.'
import { BrownieAvailableContainers, BrownieIntegrationInterface } from './brownie.interface'
import { deepMergeWithUniqueMergeArray } from '@utils'

/**
 * Updates brownie integration by wiriting data to nx.json
 * @param name
 * @param options
 */
export function updateBrownieIntegration (name: string, data: BrownieIntegrationInterface): Rule {
  return updateNxIntegration<BaseIntegration>(name, { brownie: data }, { arrayOverwrite: false })
}

/**
 * Returns the brownie integration part of the nx.json.
 * @param name
 */
export function readBrownieIntegration (name: string): BrownieIntegrationInterface {
  return (readWorkspaceJsonProject() as EnrichedNxJson).projects?.[name]?.brownie
}

/**
 * Returns sum of brownie containers read from nx.json.
 */
export function readBrownieContainers (): BrownieAvailableContainers[] {
  const nxJson = readNxJson() as EnrichedNxJson

  return Object.values(nxJson.projects).reduce((o, value) => {
    if (value.brownie?.containers) {
      o = deepMergeWithUniqueMergeArray(o, value.brownie.containers)
    }

    return o
  }, [])
}
