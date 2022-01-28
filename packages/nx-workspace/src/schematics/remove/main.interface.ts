import { BaseNormalizedSchemaPackageName, BaseSchemaWithParentAndConfiguration } from '@webundsoehne/nx-tools'

export type Schema = BaseSchemaWithParentAndConfiguration

export interface NormalizedSchema extends Schema, BaseNormalizedSchemaPackageName {}
