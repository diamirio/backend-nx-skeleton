import { NxProjectTypes } from '@constants/nx.constants'

/**
 * workspace.json is where all of the nx data is stored.
 */
export type WorkspaceJSON<T extends Record<string, any> = any> = {
  projects: {
    [name: string]: {
      root: string
      sourceRoot: string
      projectType: NxProjectTypes
      schematics: any
      architect: T
    }
  }
  defaultProject: string
}
