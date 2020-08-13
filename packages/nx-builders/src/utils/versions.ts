import { PackageVersions } from '@webundsoehne/nx-tools'
import merge from 'deepmerge'

import { InitiateBuilderDependenciesOptions } from '@src/init/main.interface'

// calculate dependencies
export function calculateDependencies(options: InitiateBuilderDependenciesOptions): PackageVersions {
  let dependencies: PackageVersions = baseDeps

  if (options.includes('ts-node-dev')) {
    dependencies = merge(dependencies, tsNodeDevDeps)
  }

  if (options.includes('tsc')) {
    dependencies = merge(dependencies, tscDeps)
  }

  return dependencies
}

export const baseDeps: PackageVersions = {
  dev: {
    typescript: '^3.9.0'
  }
}

export const tsNodeDevDeps: PackageVersions = {
  dev: {
    'ts-node': '^8.10.0',
    'ts-node-dev': '^1.0.0'
  }
}

export const tscDeps: PackageVersions = {
  dev: {
    tscpaths: '^0.0.9',
    'tsc-watch': '^4.2.0'
  }
}
