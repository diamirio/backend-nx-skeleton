import { CommonNodeDependency } from '@src/interfaces/dependency.interface'

export interface NodeHelperCtx {
  fail: Partial<Record<AvailablePackageManagers, boolean>>
}

export interface PackageManagerActions {
  action: PackageManagerUsableCommands.ADD | PackageManagerUsableCommands.REMOVE
  type?: PackageManagerDependencyTypes
  global?: boolean
  force?: boolean
  useLatest?: boolean
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
  REGISTRY,
  DEVELOPMENT,
  FORCE,
  EXEC
}

export const PackageManagerCommands: Record<AvailablePackageManagers, Record<PackageManagerUsableCommands, string>> = {
  [AvailablePackageManagers.NPM]: {
    [PackageManagerUsableCommands.EXEC]: 'npx',
    [PackageManagerUsableCommands.GLOBAL]: '-g',
    [PackageManagerUsableCommands.ADD]: 'install --legacy-peer-deps',
    [PackageManagerUsableCommands.REMOVE]: 'uninstall',
    [PackageManagerUsableCommands.DEVELOPMENT]: '--save-dev',
    [PackageManagerUsableCommands.FORCE]: '--force',
    [PackageManagerUsableCommands.REGISTRY]: 'npm_config_registry'
  },
  [AvailablePackageManagers.YARN]: {
    [PackageManagerUsableCommands.EXEC]: 'yarn exec',
    [PackageManagerUsableCommands.GLOBAL]: 'global',
    [PackageManagerUsableCommands.ADD]: 'add',
    [PackageManagerUsableCommands.REMOVE]: 'remove',
    [PackageManagerUsableCommands.DEVELOPMENT]: '-D',
    [PackageManagerUsableCommands.FORCE]: '--force',
    [PackageManagerUsableCommands.REGISTRY]: 'YARN_REGISTRY'
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
  parsable: CommonNodeDependency
}
