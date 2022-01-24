import { Schema as BaseSchema } from '@nrwl/workspace/src/generators/move/schema'

export interface Schema {
  projectName: string
  destination: string
  importPath?: string
  updateImportPath: boolean
  skipFormat?: boolean
}

export type NormalizedSchema = BaseSchema
