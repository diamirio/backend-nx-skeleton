import { PackageVersions, deepMerge } from '@webundsoehne/nx-tools'

import { VERSIONS } from './versions.constant'
import { AvailableComponents, AvailableDBAdapters, AvailableDBTypes, AvailableServerTypes, AvailableTestsTypes } from '@src/interfaces'
import { NormalizedSchema } from '@src/schematics/application/main.interface'

/**
 * Will calculate the dependencies depending on the components selected.
 * Can set the optional variable to true to only return builder dependencies to install it first
 * @param options
 * @param builders
 */
export function calculateDependencies (options: NormalizedSchema, builders?: boolean): PackageVersions {
  // only add builders
  if (builders) {
    return VERSIONS.builder
  }

  let dependencies: PackageVersions = VERSIONS.base.default

  // tests
  if (options.tests === AvailableTestsTypes.JEST) {
    dependencies = deepMerge(dependencies, VERSIONS[AvailableTestsTypes.JEST])
  }

  // api interfaces
  if (options.components.includes(AvailableComponents.SERVER) && options.server === AvailableServerTypes.RESTFUL) {
    dependencies = deepMerge(dependencies, VERSIONS[AvailableServerTypes.RESTFUL])
  }

  if (options.components.includes(AvailableComponents.SERVER) && options.server === AvailableServerTypes.GRAPHQL) {
    dependencies = deepMerge(dependencies, VERSIONS[AvailableServerTypes.GRAPHQL])
  }

  // microservices
  if ([ AvailableComponents.MICROSERVICE_SERVER, AvailableComponents.MICROSERVICE_CLIENT ].some((c) => options.components.includes(c))) {
    dependencies = deepMerge(dependencies, VERSIONS.base.microservice)
  }

  if (options.components.includes(AvailableComponents.MICROSERVICE_SERVER)) {
    dependencies = deepMerge(dependencies, VERSIONS[AvailableComponents.MICROSERVICE_SERVER])
  }

  if (options.components.includes(AvailableComponents.MICROSERVICE_CLIENT)) {
    dependencies = deepMerge(dependencies, VERSIONS[AvailableComponents.MICROSERVICE_CLIENT])
  }

  // components
  if (options.components.includes(AvailableComponents.BG_TASK)) {
    dependencies = deepMerge(dependencies, VERSIONS[AvailableComponents.BG_TASK])
  }

  if (options.components.includes(AvailableComponents.COMMAND)) {
    dependencies = deepMerge(dependencies, VERSIONS[AvailableComponents.COMMAND])
  }

  // db related
  if ([ AvailableDBTypes.TYPEORM_MYSQL, AvailableDBTypes.TYPEORM_POSTGRESQL ].includes(options.database)) {
    dependencies = deepMerge(dependencies, VERSIONS[AvailableDBAdapters.TYPEORM])
  }

  if ([ AvailableDBTypes.MONGOOSE_MONGODB ].includes(options.database)) {
    dependencies = deepMerge(dependencies, VERSIONS[AvailableDBAdapters.MONGOOSE])
  }

  return dependencies
}
