import { chain, Rule, externalSchematic } from '@angular-devkit/schematics'
import { addDepsToPackageJson } from '@nrwl/workspace'

import { NormalizedSchema } from '@schematics/application/main.interface'
import { calculateDependencies } from '@utils/versions'
import { AvailableBuilders } from '@webundsoehne/nx-builders/dist/interfaces/available.constants'
import { Schema as BuilderSchema } from '@webundsoehne/nx-builders/dist/schematics/init/main.interface'

export default function (schema: NormalizedSchema): Rule {
  return async function (): Promise<Rule> {
    // const builders = calculateDependencies(schema, true)
    const dependencies = await calculateDependencies(schema)

    return chain([
      addDepsToPackageJson(dependencies.deps ?? {}, dependencies.devDeps ?? {}),

      externalSchematic<BuilderSchema>('@webundsoehne/nx-builders', 'init', { items: [ AvailableBuilders.TSC, AvailableBuilders.TS_NODE_DEV ] })
    ])
  }
}
