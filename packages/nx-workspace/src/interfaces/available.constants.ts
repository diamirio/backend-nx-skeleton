/**
 * All the available clis that can be generated by this schematic.
 */
export enum AvailableCLIs {
  NX = 'nx',
  ANGULAR = 'angular'
}

export enum AvailableFolderStructures {
  MULTIPLE = 'apps-and-libs',
  SINGLE = 'packages'
}

export const AvailableWorkspaceFiles: Record<AvailableCLIs, string> = {
  [AvailableCLIs.ANGULAR]: 'angular',
  [AvailableCLIs.NX]: 'workspace'
}

export const AvailableCLICommands: Record<AvailableCLIs, string> = {
  [AvailableCLIs.ANGULAR]: 'ng',
  [AvailableCLIs.NX]: 'nx'
}

/**
 * Prettified names for components to use with prompts and such.
 */
export const PrettyNamesForAvailableThingies: Record<AvailableCLIs | AvailableFolderStructures, string> = {
  [AvailableCLIs.NX]: '@nrwl/nx',
  [AvailableCLIs.ANGULAR]: '@angular/cli',
  [AvailableFolderStructures.MULTIPLE]: 'Multiple Folders: "apps-and-libs"',
  [AvailableFolderStructures.SINGLE]: 'Single Folder: "packages"'
}