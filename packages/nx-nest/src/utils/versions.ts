import { PackageVersions, mergeObjectsWithArrayOverwrite } from '@webundsoehne/nx-tools'

import * as versions from './versions.constant'
import { AvailableComponents, AvailableDBTypes, AvailableServerTypes, AvailableTestsTypes } from '@src/interfaces'
import { NormalizedSchema } from '@src/schematics/application/main.interface'

/**
 * Will calculate the dependencies depending on the components selected.
 * Can set the optional variable to true to only return builder dependencies to install it first
 * @param schema
 * @param builders
 */
export function calculateDependencies (schema: NormalizedSchema, builders?: boolean): PackageVersions {
  // only add builders
  if (builders) {
    return versions.builderDeps
  }

  let dependencies: PackageVersions = versions.baseDeps

  if (schema.tests === AvailableTestsTypes.JEST) {
    dependencies = mergeObjectsWithArrayOverwrite(dependencies, versions.testDeps)
  }

  if (schema.components.includes(AvailableComponents.SERVER) && schema.server === AvailableServerTypes.RESTFUL) {
    dependencies = mergeObjectsWithArrayOverwrite(dependencies, versions.restServerDeps)
  }

  if (schema.components.includes(AvailableComponents.SERVER) && schema.server === AvailableServerTypes.GRAPHQL) {
    dependencies = mergeObjectsWithArrayOverwrite(dependencies, versions.graphqlServerDeps)
  }

  if (schema.components.includes(AvailableComponents.MICROSERVICE_SERVER)) {
    dependencies = mergeObjectsWithArrayOverwrite(dependencies, versions.microserviceServerModuleDeps)
  }

  if (schema.components.includes(AvailableComponents.MICROSERVICE_CLIENT)) {
    dependencies = mergeObjectsWithArrayOverwrite(dependencies, versions.microserviceClientModuleDeps)
  }

  if (schema.components.includes(AvailableComponents.BG_TASK)) {
    dependencies = mergeObjectsWithArrayOverwrite(dependencies, versions.taskModuleDeps)
  }

  if (schema.components.includes(AvailableComponents.COMMAND)) {
    dependencies = mergeObjectsWithArrayOverwrite(dependencies, versions.commandModuleDeps)
  }

  if ([ AvailableDBTypes.TYPEORM_MYSQL, AvailableDBTypes.TYPEORM_POSTGRESQL ].includes(schema.database)) {
    dependencies = mergeObjectsWithArrayOverwrite(dependencies, versions.typeormDeps)
  }

  if ([ AvailableDBTypes.MONGOOSE_MONGODB ].includes(schema.database)) {
    dependencies = mergeObjectsWithArrayOverwrite(dependencies, versions.mongooseDeps)
  }

  return dependencies
}
