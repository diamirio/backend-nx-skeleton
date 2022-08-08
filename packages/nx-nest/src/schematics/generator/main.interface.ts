import type { AvailableDBAdapters, AvailableGenerators, SchematicConstants } from '@interfaces'
import type { Schema as GeneratorBaseSchema, NormalizedSchema as GeneratorBaseNormalizedSchema } from '@webundsoehne/nx-tools/dist/schematics/generator/main.interface'

type TypedBaseSchema = GeneratorBaseSchema<GeneratorInject, AvailableGenerators>

type TypedBaseNormalizedSchema = GeneratorBaseNormalizedSchema<GeneratorInject, AvailableGenerators>

export type GeneratorInject =
  | {
    constants: typeof SchematicConstants
  }
  | {
    constants: typeof SchematicConstants
    dbAdapters: AvailableDBAdapters
    enum: {
      dbAdapters: typeof AvailableDBAdapters
    }
  }
  | never

export type { TypedBaseSchema as Schema, TypedBaseNormalizedSchema as NormalizedSchema }
