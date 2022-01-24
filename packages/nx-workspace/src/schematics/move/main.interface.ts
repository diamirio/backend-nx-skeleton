import { Schema as BaseSchema } from '@nrwl/workspace/src/generators/move/schema'

import { EnrichedProjectConfiguration } from '@webundsoehne/nx-tools'

export interface Schema {
  projectName: string
  destination: string
  importPath?: string
  updateImportPath: boolean
  skipFormat?: boolean
}

export interface NormalizedSchema extends BaseSchema {
  project: EnrichedProjectConfiguration
  packageName: string
}
