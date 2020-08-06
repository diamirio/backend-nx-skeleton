import { chain, Rule } from '@angular-devkit/schematics'
import { addDepsToPackageJson } from '@nrwl/workspace'

import { NormalizedSchema } from '@src/schematics/application/main.interface'
import { calculateDependencies } from '@src/utils/versions'

export default function (schema: NormalizedSchema): Rule {
  const builders = calculateDependencies(schema, true)
  const dependencies = calculateDependencies(schema)

  return chain([
    // add builder and its dependencies
    addDepsToPackageJson(builders.prod, builders.dev),
    async (): Promise<Rule> => {
      // dynamically import it from the package, we can change it there
      try {
        const builderInit = await import('@webundsoehne/nx-builders')
        return builderInit.initiateBuilderDependencies([ 'ts-node-dev', 'tsc' ])
      // eslint-disable-next-line no-empty
      } catch (e) {}
    },

    // add the rest of the dependencies
    addDepsToPackageJson(dependencies.prod, dependencies.dev)
  ])
}
