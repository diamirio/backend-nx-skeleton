export enum AvailablePackageManagers {
  YARN = 'yarn',
  NPM = 'npm'
}

export enum PackageManagerDependencyTypes {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development'
}

export enum PackageManagerUsableCommands {
  GLOBAL = 'GLOBAL',
  ADD = 'ADD',
  REMOVE = 'REMOVE',
  REGISTRY = 'REGISTRY',
  DEVELOPMENT = 'DEVELOPMENT',
  FORCE = 'FORCE',
  EXEC = 'EXEC',
  INSTALL = 'INSTALL',
  RUN = 'RUN',
  RUN_ARGS = 'RUN_ARGS'
}

export const PackageManagerCommands: Record<AvailablePackageManagers, Record<PackageManagerUsableCommands, string>> = {
  [AvailablePackageManagers.NPM]: {
    [PackageManagerUsableCommands.EXEC]: 'exec',
    [PackageManagerUsableCommands.GLOBAL]: '-g',
    [PackageManagerUsableCommands.ADD]: 'install --legacy-peer-deps',
    [PackageManagerUsableCommands.REMOVE]: 'uninstall',
    [PackageManagerUsableCommands.DEVELOPMENT]: '--save-dev',
    [PackageManagerUsableCommands.FORCE]: '--force',
    [PackageManagerUsableCommands.REGISTRY]: 'npm_config_registry',
    [PackageManagerUsableCommands.INSTALL]: 'install',
    [PackageManagerUsableCommands.RUN]: 'run',
    [PackageManagerUsableCommands.RUN_ARGS]: '--'
  },
  [AvailablePackageManagers.YARN]: {
    [PackageManagerUsableCommands.EXEC]: 'exec',
    [PackageManagerUsableCommands.GLOBAL]: 'global',
    [PackageManagerUsableCommands.ADD]: 'add',
    [PackageManagerUsableCommands.REMOVE]: 'remove',
    [PackageManagerUsableCommands.DEVELOPMENT]: '-D',
    [PackageManagerUsableCommands.FORCE]: '--force',
    [PackageManagerUsableCommands.REGISTRY]: 'YARN_REGISTRY',
    [PackageManagerUsableCommands.INSTALL]: 'install',
    [PackageManagerUsableCommands.RUN]: 'run',
    [PackageManagerUsableCommands.RUN_ARGS]: ''
  }
}
