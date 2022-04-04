import type { Rule } from '@angular-devkit/schematics'
import { chain } from '@angular-devkit/schematics'

import { AvailableBuilders } from '@webundsoehne/nx-builders/dist/interfaces/available.constants'
import type { Schema as BuilderSchema } from '@webundsoehne/nx-builders/dist/schematics/init/main.interface'
import { addExternalSchematicTaskRule } from '@webundsoehne/nx-tools'

export default function (): Rule {
  return async function (): Promise<Rule> {
    return chain([addExternalSchematicTaskRule<BuilderSchema>('@webundsoehne/nx-builders', 'init', { items: [AvailableBuilders.TSC, AvailableBuilders.TS_NODE_DEV] })])
  }
}
