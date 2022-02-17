import type { EnvironmentVariables } from '@interfaces/environment-variables.interface'

export interface NodeBinaryPathExtensionsOptions {
  env?: EnvironmentVariables
  start?: string
  top?: string
}

export interface NodeBinaryPathExtensions {
  key: string
  path: string
}
