import { Rule, Tree } from '@angular-devkit/schematics'
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

/**
 * Updates nx integration by saving values like prior configuration or so for having a memory.
 */
// , options?: { arrayOverwrite?: boolean }
export function updateNxIntegration<T extends Record<PropertyKey, any> = BaseIntegration> (host: Tree, name: string, integration: T): Rule {
  // const updated: EnrichedProjectConfiguration<T> = { integration } as EnrichedProjectConfiguration<T>
  // try {
  //   const project = readProjectConfiguration(nxHost, name)

  // updated = options?.arrayOverwrite
  //   ? (deepMergeWithArrayOverwrite<EnrichedProjectConfiguration<T>>(project, { integration }) as unknown as EnrichedProjectConfiguration<T>)
  //   : (deepMergeWithUniqueMergeArray<EnrichedProjectConfiguration<T>>(project, { integration })) as unknown as EnrichedProjectConfiguration<T>)
  // eslint-disable-next-line no-empty
  // } catch {}

  return (): void => updateProjectConfiguration(convertAngularTreeToNxTree(host), name, { integration } as unknown as ProjectConfiguration)
}

/**
 * Returns the integration filed of nx.json.
 * @param name
 */
export function readNxIntegration<T extends Record<PropertyKey, any> = BaseIntegration> (host: Tree, name: string): EnrichedProjectConfiguration<T>['integration'] {
  return readProjectConfiguration<T>(host, name)?.integration
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
