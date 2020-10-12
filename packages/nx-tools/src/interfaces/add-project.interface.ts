/**
 * workspace.json is where all of the nx data is stored.
 */
export type WorkspaceJSON<T extends Record<string, any> = any> = {
  projects: {
    [name: string]: {
      root: string
      sourceRoot: string
      projectType: 'application' | 'library'
      schematics: any
      architect: T
    }
  }
  defaultProject: string
}
