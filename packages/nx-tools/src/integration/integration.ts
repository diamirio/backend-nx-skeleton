import { Tree } from '@angular-devkit/schematics'
import {
  addProjectConfiguration,
  getProjects,
  ProjectConfiguration,
  readProjectConfiguration as baseReadProjectConfiguration,
  readWorkspaceConfiguration as baseReadWorkspaceConfiguration,
  updateProjectConfiguration,
  WorkspaceConfiguration
} from '@nrwl/devkit'
import { FsTree } from '@nrwl/tao/src/shared/tree'

import { BaseIntegration } from './integration.interface'
import { convertAngularTreeToNxTree } from './nx-integration'
import { EnrichedProjectConfiguration } from '@interfaces/nx-json.interface'
import { Logger } from '@utils'
import { deepMergeWithArrayOverwrite, deepMergeWithUniqueMergeArray } from '@webundsoehne/deep-merge'

/**
 * Updates nx integration by saving values like prior configuration or so for having a memory.
 */
export function updateNxIntegration<T extends Record<PropertyKey, any> = BaseIntegration> (host: Tree, name: string, integration: T, options?: { arrayOverwrite?: boolean }): void {
  let updated: EnrichedProjectConfiguration<T> = { integration } as EnrichedProjectConfiguration<T>
  let project: EnrichedProjectConfiguration<T>
  try {
    project = readProjectConfiguration<T>(host, name)
  } catch (e) {
    const logger = new Logger()

    logger.debug(`Project "${name}" can not be found while trying to update integration:`, JSON.stringify(e))
  }

  if (project) {
    updated = options?.arrayOverwrite ? deepMergeWithArrayOverwrite(project, { integration }) : deepMergeWithUniqueMergeArray(project, { integration })
  }

  updateProjectConfiguration(convertAngularTreeToNxTree(host), name, updated as unknown as ProjectConfiguration)
}

/**
 * Returns the integration filed of a single project in nx.json.
 */
export function readNxProjectIntegration<T extends Record<PropertyKey, any> = BaseIntegration> (host: Tree, name: string): EnrichedProjectConfiguration<T>['integration'] {
  return readProjectConfiguration<T>(host, name)?.integration
}

/**
 * Returns the integration filed of a all the projects in nx.json.
 */
export function readNxWorkspaceIntegration<T extends Record<PropertyKey, any> = BaseIntegration> (host: Tree): EnrichedProjectConfiguration<T>['integration'][] {
  const projects = readWorkspaceProjects<T>(host)

  const data = Object.values(projects).reduce((o, value) => {
    const found = value?.integration

    if (found) {
      o = deepMergeWithUniqueMergeArray(o, [ found ])
    }

    return o
  }, [] as EnrichedProjectConfiguration<T>['integration'][])

  return data
}

/**
 * Returns the workspace.json with extended typings.
 */
export function readWorkspaceConfiguration (host: Tree): WorkspaceConfiguration {
  return baseReadWorkspaceConfiguration(convertAngularTreeToNxTree(host))
}

/**
 * Reads all the workspace projects.
 */
export function readWorkspaceProjects<T extends Record<PropertyKey, any> = BaseIntegration> (host?: Tree): Record<string, EnrichedProjectConfiguration<T>> {
  return Object.fromEntries(getProjects(host ? convertAngularTreeToNxTree(host) : new FsTree(process.cwd(), false)))
}

/**
 * Returns the workspace.json configuration for a given application.
 * @param name
 */
export function readProjectConfiguration<T extends Record<PropertyKey, any> = BaseIntegration> (host: Tree, name: string): EnrichedProjectConfiguration<T> {
  return baseReadProjectConfiguration(convertAngularTreeToNxTree(host), name)
}

/**
 * Creates a new project in the workspace.
 */
export function createWorkspaceProject<T extends Record<PropertyKey, any> = BaseIntegration> (host: Tree, name: string, configuration: EnrichedProjectConfiguration<T>): void {
  const nxHost = convertAngularTreeToNxTree(host)

  try {
    addProjectConfiguration(nxHost, name, configuration, true)
  } catch (e) {
    updateProjectConfiguration(nxHost, name, configuration)
  }
}
