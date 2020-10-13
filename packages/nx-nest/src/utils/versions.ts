import { PackageVersions, mergeObjectsWithArrayOverwrite } from '@webundsoehne/nx-tools'

import { VERSIONS } from './versions.constant'
import { AvailableComponents, AvailableDBAdapters, AvailableDBTypes, AvailableServerTypes, AvailableTestsTypes } from '@src/interfaces'
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
    return VERSIONS.builder
  }

  let dependencies: PackageVersions = VERSIONS.base.default

  // tests
  if (schema.tests === AvailableTestsTypes.JEST) {
    dependencies = mergeObjectsWithArrayOverwrite(dependencies, VERSIONS[AvailableTestsTypes.JEST])
  }

  // api interfaces
  if (schema.components.includes(AvailableComponents.SERVER) && schema.server === AvailableServerTypes.RESTFUL) {
    dependencies = mergeObjectsWithArrayOverwrite(dependencies, VERSIONS[AvailableServerTypes.RESTFUL])
  }

  if (schema.components.includes(AvailableComponents.SERVER) && schema.server === AvailableServerTypes.GRAPHQL) {
    dependencies = mergeObjectsWithArrayOverwrite(dependencies, VERSIONS[AvailableServerTypes.GRAPHQL])
  }

  // microservices
  if ([ AvailableComponents.MICROSERVICE_SERVER, AvailableComponents.MICROSERVICE_CLIENT ].some((c) => schema.components.includes(c))) {
    dependencies = mergeObjectsWithArrayOverwrite(dependencies, VERSIONS.base.microservice)
  }

  if (schema.components.includes(AvailableComponents.MICROSERVICE_SERVER)) {
    dependencies = mergeObjectsWithArrayOverwrite(dependencies, VERSIONS[AvailableComponents.MICROSERVICE_SERVER])
  }

  if (schema.components.includes(AvailableComponents.MICROSERVICE_CLIENT)) {
    dependencies = mergeObjectsWithArrayOverwrite(dependencies, VERSIONS[AvailableComponents.MICROSERVICE_CLIENT])
  }

  // components
  if (schema.components.includes(AvailableComponents.BG_TASK)) {
    dependencies = mergeObjectsWithArrayOverwrite(dependencies, VERSIONS[AvailableComponents.BG_TASK])
  }

  if (schema.components.includes(AvailableComponents.COMMAND)) {
    dependencies = mergeObjectsWithArrayOverwrite(dependencies, VERSIONS[AvailableComponents.COMMAND])
  }

  // db related
  if ([ AvailableDBTypes.TYPEORM_MYSQL, AvailableDBTypes.TYPEORM_POSTGRESQL ].includes(schema.database)) {
    dependencies = mergeObjectsWithArrayOverwrite(dependencies, VERSIONS[AvailableDBAdapters.TYPEORM])
  }

  if ([ AvailableDBTypes.MONGOOSE_MONGODB ].includes(schema.database)) {
    dependencies = mergeObjectsWithArrayOverwrite(dependencies, VERSIONS[AvailableDBAdapters.MONGOOSE])
  }

  return dependencies
}
