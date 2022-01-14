import { Rule } from '@angular-devkit/schematics'
import {
  getProjects,
  readProjectConfiguration as baseReadProjectConfiguration,
  readWorkspaceConfiguration as baseReadWorkspaceConfiguration,
  Tree,
  updateProjectConfiguration,
  WorkspaceConfiguration
} from '@nrwl/devkit'

import { BaseIntegration } from './integration.interface'
import { EnrichedProjectConfiguration } from '@interfaces/nx-json.interface'
import { deepMergeWithArrayOverwrite, deepMergeWithUniqueMergeArray } from '@webundsoehne/deep-merge'

/**
 * Updates nx integration by saving values like prior configuration or so for having a memory.
 */
export function updateNxIntegration<T extends Record<PropertyKey, any> = BaseIntegration> (host: Tree, name: string, data: T, options?: { arrayOverwrite?: boolean }): Rule {
  const project = readProjectConfiguration(host, name)

  const updated = options?.arrayOverwrite ? deepMergeWithArrayOverwrite(project, { integration: data }) : deepMergeWithUniqueMergeArray(project, { integration: data })

  return (): void => updateProjectConfiguration(host, name, updated)
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
  return baseReadWorkspaceConfiguration(host)
}

/**
 * Reads all the workspace projects.
 */
export function readWorkspaceProjects<T extends Record<PropertyKey, any> = BaseIntegration> (host: Tree): Record<string, EnrichedProjectConfiguration<T>> {
  return Object.fromEntries(getProjects(host))
}

/**
 * Returns the workspace.json configuration for a given application.
 * @param name
 */
export function readProjectConfiguration<T extends Record<PropertyKey, any> = BaseIntegration> (host: Tree, name: string): EnrichedProjectConfiguration<T> {
  return baseReadProjectConfiguration(host, name)
}
