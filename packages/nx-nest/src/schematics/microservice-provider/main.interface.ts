import { GeneratedNameCases } from '@webundsoehne/nx-tools'

import { AvailableLinterTypes } from '@interfaces/available.constants'

/**
 * The options that it gets from angular-cli
 */
export interface Schema extends CommonPropertiesToSaveAndUse {
  name: string
  linter: string
  skipFormat: boolean
  silent: boolean
}

/**
 * After the options has been normalized.
 */
export interface NormalizedSchema extends Schema {
  packageName: string
  root: string
  sourceRoot: string
  linter: AvailableLinterTypes
  priorConfiguration: CommonPropertiesToSaveAndUse
}

/**
 * The templating bones of a single microservice.
 */
export interface ParsedMicroservice {
  name: string
  names: {
    queue: string
    client: string
    file: string
    pattern: string
    interface: string
  }
  casing: GeneratedNameCases
}

/**
 * This properties are shared across the input, normalized and saved configurations.
 */
interface CommonPropertiesToSaveAndUse {
  microservices: ParsedMicroservice[]
}
