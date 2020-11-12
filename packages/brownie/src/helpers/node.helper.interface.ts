export interface NodeHelperCtx {
  fail: Partial<Record<AvailablePackageManagers, boolean>>
}

export interface PackageManagerActions {
  action: PackageManagerUsableCommands.ADD | PackageManagerUsableCommands.REMOVE
  type: PackageManagerDependencyTypes
  global?: boolean
}

export enum AvailablePackageManagers {
  YARN = 'yarn',
  NPM = 'npm'
}

export enum PackageManagerDependencyTypes {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development'
}

export enum PackageManagerUsableCommands {
  GLOBAL,
  ADD,
  REMOVE,
  DEVELOPMENT
}

export const PackageManagerCommands: Record<AvailablePackageManagers, Record<PackageManagerUsableCommands, string>> = {
  [AvailablePackageManagers.NPM]: {
    [PackageManagerUsableCommands.GLOBAL]: '-g',
    [PackageManagerUsableCommands.ADD]: 'install',
    [PackageManagerUsableCommands.REMOVE]: 'uninstall',
    [PackageManagerUsableCommands.DEVELOPMENT]: '--save-dev'
  },
  [AvailablePackageManagers.YARN]: {
    [PackageManagerUsableCommands.GLOBAL]: 'global',
    [PackageManagerUsableCommands.ADD]: 'add',
    [PackageManagerUsableCommands.REMOVE]: 'remove',
    [PackageManagerUsableCommands.DEVELOPMENT]: '-D'
  }
}

export interface CheckIfModuleInstalled {
  pkg: string
  installed: boolean
  version?: string
  hasUpdate?: boolean
  updateType?: string
}
