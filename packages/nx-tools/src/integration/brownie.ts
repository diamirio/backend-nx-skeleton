import { Rule, Tree } from '@angular-devkit/schematics'

import { readNxWorkspaceIntegration } from '.'
import { BrownieAvailableContainers, BrownieIntegration } from './brownie.interface'
import { readProjectConfiguration, updateNxIntegration } from './integration'
import { BaseIntegration } from './integration.interface'
import { deepMergeWithUniqueMergeArray } from '@webundsoehne/deep-merge'

/**
 * Updates brownie integration by wiriting data to nx.json
 * @param name
 * @param options
 */
export function updateBrownieIntegration (host: Tree, name: string, data: BrownieIntegration): Rule {
  return updateNxIntegration<BaseIntegration>(host, name, { brownie: data }, { arrayOverwrite: false })
}

/**
 * Returns the brownie integration part of the nx.json.
 * @param name
 */
export function readBrownieIntegration (host: Tree, name: string): BrownieIntegration {
  return readProjectConfiguration<BaseIntegration>(host, name).integration?.brownie
}

/**
 * Returns sum of brownie containers read from nx.json.
 */
export function readBrownieContainers (host?: Tree): BrownieAvailableContainers[] {
  const integration = readNxWorkspaceIntegration(host)

  return Object.values(integration).reduce((o, value) => {
    if (value?.brownie) {
      o = deepMergeWithUniqueMergeArray(o, value.brownie.containers)
    }

    return o
  }, [])
}
