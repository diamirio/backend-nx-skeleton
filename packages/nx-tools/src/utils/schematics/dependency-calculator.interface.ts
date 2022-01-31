import type { DependencyCalculatorPackage } from '@interfaces/versions.interface'

export type DependencyCalculatorOptions = {
  condition?: boolean
  deps: DependencyCalculatorPackage
}[]
