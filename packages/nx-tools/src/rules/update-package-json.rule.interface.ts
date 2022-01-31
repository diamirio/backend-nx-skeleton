import type { ImplicitDependencies } from '@interfaces/versions.interface'

export interface UpdatePackageJsonForProjectRuleOptions {
  implicitDependencies?: ImplicitDependencies
  scripts?: Record<string, string>
}
