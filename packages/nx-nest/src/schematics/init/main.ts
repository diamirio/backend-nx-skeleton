import { chain, Rule, externalSchematic } from '@angular-devkit/schematics'
import { addDepsToPackageJson } from '@nrwl/workspace'
import { AvailableBuilders } from '@webundsoehne/nx-builders/dist/interfaces/available.constants'
import { Schema as BuilderSchema } from '@webundsoehne/nx-builders/dist/schematics/init/main.interface'

import { NormalizedSchema } from '@src/schematics/application/main.interface'
import { calculateDependencies } from '@utils/versions'

export default function (schema: NormalizedSchema): Rule {
  // const builders = calculateDependencies(schema, true)
  const dependencies = calculateDependencies(schema)

  return chain([
    // add builder and its dependencies
    externalSchematic<BuilderSchema>('@webundsoehne/nx-builders', 'init', { items: [ AvailableBuilders.TSC, AvailableBuilders.TS_NODE_DEV ] }),

    addDepsToPackageJson(dependencies.deps ?? {}, dependencies.devDeps ?? {})
  ])
}
