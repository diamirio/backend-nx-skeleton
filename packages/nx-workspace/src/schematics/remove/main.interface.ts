import { Schema as BaseSchema } from '@nrwl/workspace/src/generators/remove/schema'

export interface Schema {
  projectName: string
  skipFormat: boolean
  forceRemove: boolean
}

export type NormalizedSchema = BaseSchema
