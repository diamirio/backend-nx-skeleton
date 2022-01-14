import { Rule } from '@angular-devkit/schematics'
import { Tree } from '@nrwl/devkit'
import { FsTree } from '@nrwl/tao/src/shared/tree'

import { BrownieAvailableContainers, BrownieIntegration } from './brownie.interface'
import { readProjectConfiguration, readWorkspaceProjects, updateNxIntegration } from './integration'
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
  host = host ?? new FsTree(process.cwd(), false)
  const projects = readWorkspaceProjects<BaseIntegration>(host)

  return Object.values(projects).reduce((o, value) => {
    if (value.integration?.brownie?.containers) {
      o = deepMergeWithUniqueMergeArray(o, value.integration.brownie.containers)
    }

    return o
  }, [])
}
