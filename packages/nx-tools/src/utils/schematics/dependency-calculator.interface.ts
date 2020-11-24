import { PackageVersions } from '@interfaces/versions.interface'

export type DependencyCalculatorOptions = {
  condition?: boolean
  deps: PackageVersions
}[]
