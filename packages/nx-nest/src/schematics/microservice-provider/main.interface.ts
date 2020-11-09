import { GeneratedNameCases } from '@webundsoehne/nx-tools'

import { AvailableLinterTypes, AvailableMicroserviceTypes } from '@interfaces/available.constants'
import { SchematicConstants } from '@src/interfaces'

/**
 * The options that it gets from angular-cli
 */
export interface Schema extends CommonPropertiesToSaveAndUse {
  name: string
  linter: string
  skipFormat: boolean
  silent: boolean
  microservice: AvailableMicroserviceTypes
}

/**
 * After the options has been normalized.
 */
export interface NormalizedSchema extends Schema {
  packageName: string
  packageScope: string
  root: string
  sourceRoot: string
  linter: AvailableLinterTypes
  constants: typeof SchematicConstants
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
