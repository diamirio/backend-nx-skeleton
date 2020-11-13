import { PackageVersions } from '@webundsoehne/nx-tools'

export interface NodeHelperCtx {
  fail: Partial<Record<AvailablePackageManagers, boolean>>
}

export interface PackageManagerActions {
  action: PackageManagerUsableCommands.ADD | PackageManagerUsableCommands.REMOVE
  type?: PackageManagerDependencyTypes
  global?: boolean
  force?: boolean
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
  DEVELOPMENT,
  FORCE
}

export const PackageManagerCommands: Record<AvailablePackageManagers, Record<PackageManagerUsableCommands, string>> = {
  [AvailablePackageManagers.NPM]: {
    [PackageManagerUsableCommands.GLOBAL]: '-g',
    [PackageManagerUsableCommands.ADD]: 'install',
    [PackageManagerUsableCommands.REMOVE]: 'uninstall',
    [PackageManagerUsableCommands.DEVELOPMENT]: '--save-dev',
    [PackageManagerUsableCommands.FORCE]: '--force'
  },
  [AvailablePackageManagers.YARN]: {
    [PackageManagerUsableCommands.GLOBAL]: 'global',
    [PackageManagerUsableCommands.ADD]: 'add',
    [PackageManagerUsableCommands.REMOVE]: 'remove',
    [PackageManagerUsableCommands.DEVELOPMENT]: '-D',
    [PackageManagerUsableCommands.FORCE]: '--force'
  }
}

export interface CheckIfModuleInstalled {
  pkg: string
  installed: boolean
  version?: string
  hasUpdate?: boolean
  updateType?: string
  path?: string
  latest?: string
  parsable: PackageVersions['deps'] | PackageVersions['devDeps']
}
