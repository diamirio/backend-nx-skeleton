import { GeneratedNameCases } from '@webundsoehne/nx-tools'

/**
 * This is the unparsed schema coming from the angular-schematics
 */
export interface Schema {
  name: string
  parent: string
  directory: string
  skipFormat: boolean
  type: string
  force?: boolean
  silent?: boolean
  mount?: string
}

/**
 * This is the parsed schema through normalize options.
 */
export interface NormalizedSchema extends Schema {
  root: string
  packageScope: string
  casing: GeneratedNameCases
}
