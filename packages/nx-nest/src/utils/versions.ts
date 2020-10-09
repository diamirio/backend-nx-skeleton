import { PackageVersions } from '@webundsoehne/nx-tools'
import merge from 'deepmerge'

import * as versions from './versions.constant'
import { AvailableComponents, AvailableDBTypes, AvailableServerTypes, AvailableTestsTypes } from '@src/interfaces'
import { NormalizedSchema } from '@src/schematics/application/main.interface'

/**
 * Will calculate the dependencies depending on the components selected.abs
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
    dependencies = merge(dependencies, versions.testDeps)
  }

  if (schema.components.includes(AvailableComponents.SERVER) && schema.server === AvailableServerTypes.RESTFUL) {
    dependencies = merge(dependencies, versions.restServerDeps)
  }

  if (schema.components.includes(AvailableComponents.SERVER) && schema.server === AvailableServerTypes.GRAPHQL) {
    dependencies = merge(dependencies, versions.graphqlServerDeps)
  }

  if (schema.components.includes(AvailableComponents.MICROSERVICE_SERVER)) {
    dependencies = merge(dependencies, versions.microserviceServerModuleDeps)
  }

  if (schema.components.includes(AvailableComponents.MICROSERVICE_CLIENT)) {
    dependencies = merge(dependencies, versions.microserviceClientModuleDeps)
  }

  if (schema.components.includes(AvailableComponents.BG_TASK)) {
    dependencies = merge(dependencies, versions.taskModuleDeps)
  }

  if (schema.components.includes(AvailableComponents.COMMAND)) {
    dependencies = merge(dependencies, versions.commandModuleDeps)
  }

  if ([ AvailableDBTypes.TYPEORM_MYSQL, AvailableDBTypes.TYPEORM_POSTGRESQL ].includes(schema.database)) {
    dependencies = merge(dependencies, versions.typeormDeps)
  }

  if ([ AvailableDBTypes.MONGOOSE_MONGODB ].includes(schema.database)) {
    dependencies = merge(dependencies, versions.mongooseDeps)
  }

  return dependencies
}
