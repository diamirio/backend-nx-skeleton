import type { Rule } from '@angular-devkit/schematics'
import { chain, externalSchematic } from '@angular-devkit/schematics'

import { AvailableBuilders } from '@webundsoehne/nx-builders/dist/interfaces/available.constants'
import type { Schema as BuilderSchema } from '@webundsoehne/nx-builders/dist/schematics/init/main.interface'

export default function (): Rule {
  return async function (): Promise<Rule> {
    return chain([externalSchematic<BuilderSchema>('@webundsoehne/nx-builders', 'init', { items: [AvailableBuilders.TSC, AvailableBuilders.TS_NODE_DEV] })])
  }
}
