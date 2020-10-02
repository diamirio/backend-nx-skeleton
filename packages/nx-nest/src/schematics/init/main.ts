import { chain, Rule } from '@angular-devkit/schematics'
import { addDepsToPackageJson } from '@nrwl/workspace'

import { NormalizedSchema } from '@src/schematics/application/main.interface'
import { calculateDependencies } from '@src/utils/versions'

// import { Schema as BuilderSchema } from '@webundsoehne/nx-builders/dist/schematics/init/main'

export default function (schema: NormalizedSchema): Rule {
  // const builders = calculateDependencies(schema, true)
  const dependencies = calculateDependencies(schema)

  return chain([
    // add builder and its dependencies
    // addDepsToPackageJson(builders?.prod, builders?.dev),
    // externalSchematic<BuilderSchema>('@webundsoehne/nx-builders', 'init', ['tsc', 'ts-node-dev']),
    // add the rest of the dependencies
    addDepsToPackageJson(dependencies?.prod, dependencies?.dev)
  ])
}
