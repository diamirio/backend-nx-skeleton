import { BaseNormalizedSchemaPackageName, BaseSchemaWithParent } from '@webundsoehne/nx-tools'

export type Schema = BaseSchemaWithParent

export interface NormalizedSchema extends Schema, BaseNormalizedSchemaPackageName {}
