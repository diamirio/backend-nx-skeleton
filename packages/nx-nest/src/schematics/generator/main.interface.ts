import { AvailableGenerators } from '@interfaces'
import { Schema as GeneratorBaseSchema, NormalizedSchema as GeneratorBaseNormalizedSchema } from '@webundsoehne/nx-tools/dist/schematics/generator/main.interface'

type TypedBaseSchema = GeneratorBaseSchema<AvailableGenerators>
type TypedBaseNormalizedSchema = GeneratorBaseNormalizedSchema<never, AvailableGenerators>

export { TypedBaseSchema as Schema, TypedBaseNormalizedSchema as NormalizedSchema }
