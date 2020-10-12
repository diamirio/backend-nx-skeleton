import { PackageVersions } from '@webundsoehne/nx-tools'
import merge from 'deepmerge'

import { AvailableBuilders, Schema } from '@src/schematics/init/main.interface'

// calculate dependencies
export function calculateDependencies (options: Schema['items']): PackageVersions {
  let dependencies: PackageVersions = baseDeps

  if (options.includes(AvailableBuilders.TS_NODE_DEV)) {
    dependencies = merge(dependencies, tsNodeDevDeps)
  }

  if (options.includes(AvailableBuilders.TSC)) {
    dependencies = merge(dependencies, tscDeps)
  }

  return dependencies
}

export const baseDeps: PackageVersions = {
  dev: {
    'nrwl-workspace': '^10.0.12',
    typescript: '^3.9.0'
  }
}

export const tsNodeDevDeps: PackageVersions = {
  dev: {
    'ts-node': '^8.10.0',
    'ts-node-dev': '^1.0.0',
    'tsconfig-paths': '^3.9.0'
  }
}

export const tscDeps: PackageVersions = {
  dev: {
    tscpaths: '^0.0.9',
    'tsc-watch': '^4.2.0'
  }
}
