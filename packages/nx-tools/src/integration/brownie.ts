import type { Rule, Tree } from '@angular-devkit/schematics'

import type { BrownieAvailableContainers, BrownieIntegration } from './brownie.interface'
import { readNxWorkspaceIntegration, readProjectConfiguration } from './integration'
import type { BaseIntegration } from './integration.interface'
import { updateNxIntegrationRule } from '@rules/integration.rule'
import { ArrayMergeBehavior, merge } from '@webundsoehne/deep-merge'

/**
 * Updates brownie integration by wiriting data to nx.json
 * @param name
 * @param options
 */
export function updateBrownieIntegrationRule (name: string, data: BrownieIntegration): Rule {
  return updateNxIntegrationRule<BaseIntegration>(name, { brownie: data }, { arrayOverwrite: false })
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
export function readBrownieWorkspaceContainers (host?: Tree): BrownieAvailableContainers[] {
  const integration = readNxWorkspaceIntegration(host)

  return Object.values(integration).reduce((o, value) => {
    if (value?.brownie) {
      o = merge({ arrayMerge: ArrayMergeBehavior.UNIQUE }, o, value.brownie.containers)
    }

    return o
  }, [])
}
