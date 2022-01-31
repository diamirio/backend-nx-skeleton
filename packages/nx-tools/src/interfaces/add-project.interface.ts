import type { NxProjectTypes } from '@constants/nx.constants'

/**
 * workspace.json is where all of the nx data is stored.
 */
export interface WorkspaceJSON<T extends Record<string, any> = any> {
  projects: Record<
  string,
  {
    root: string
    sourceRoot: string
    projectType: NxProjectTypes
    schematics: any
    architect: T
  }
  >
  defaultProject: string
}
