import type { AvailablePackageManagers, PackageManagerDependencyTypes, PackageManagerUsableCommands } from './package-manager.constants'

export interface PackageManagerCtx {
  fail: Partial<Record<AvailablePackageManagers, boolean>>
}

export type PackageManagerActions = PackageManagerPackageAction | PackageManagerWithoutCommandAction | PackageManagerWithCommandAction

export type PackageManagerPackageAction = {
  action: PackageManagerUsableCommands.ADD | PackageManagerUsableCommands.REMOVE
  package: NodeDependency
  type?: PackageManagerDependencyTypes
  useLatest?: boolean
} & PackageManagerCommonAction

export type PackageManagerWithoutCommandAction = {
  action: PackageManagerUsableCommands.INSTALL | PackageManagerUsableCommands.ROOT
} & PackageManagerCommonAction

export type PackageManagerWithCommandAction = {
  action: PackageManagerUsableCommands.RUN | PackageManagerUsableCommands.EXEC
  command: string
  args?: string[]
} & PackageManagerCommonAction

export interface PackageManagerCommonAction {
  force?: boolean
  global?: boolean
}

export interface PackageManagerParsedCommand {
  manager: AvailablePackageManagers
  args: string[]
  env: Record<string, string>
}

export type NodeDependency = string | CommonNodeDependency

export interface CommonNodeDependency {
  pkg: string
  registry?: string
  version?: string
  latest?: string
  linkable?: boolean
}

export interface LocalNodeModule {
  pkg: string
  installed: boolean
  linked?: boolean
  version?: string
  hasUpdate?: boolean
  updateType?: string
  path?: string
  latest?: string
  parsable: CommonNodeDependency
}

export interface CheckNodeModuleInstalledOptions {
  global?: boolean
  onlyLinked?: boolean
  cwd?: string[]
  getVersion?: boolean
  getUpdate?: boolean
}

export type PackageManagerArgumentParser = { condition: boolean, command?: PackageManagerUsableCommands, args?: string | string[] }[]
export type PackageManagerEnvironmentParser = { condition: boolean, command?: PackageManagerUsableCommands, args?: string, value: string }[]
