import { Schema as BaseSchema, NormalizedSchema as BaseNormalizedSchema } from '@webundsoehne/nx-tools/dist/schematics/generator/main.interface'

import { AvailableGenerators } from '@src/interfaces'

type TypedBaseSchema = BaseSchema<AvailableGenerators>

export { TypedBaseSchema as Schema, BaseNormalizedSchema as NormalizedSchema }
