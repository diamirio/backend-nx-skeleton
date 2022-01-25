import { VERSIONS } from './versions.constants'
import { AvailableComponents, AvailableDBAdapters, AvailableDBTypes, AvailableServerTypes } from '@interfaces/available.constants'
import { NormalizedSchema } from '@schematics/application/main.interface'
import { PackageVersions, dependencyCalculator, AvailableTestsTypes } from '@webundsoehne/nx-tools'

/**
 * Will calculate the dependencies depending on the components selected.
 * Can set the optional variable to true to only return builder dependencies to install it first
 * @param options
 * @param builders
 */
export function calculateDependencies (options: NormalizedSchema): PackageVersions {
  return dependencyCalculator([
    {
      deps: VERSIONS.base.default
    },
    {
      deps: VERSIONS.base.builder
    },
    // tests
    {
      condition: options.tests === AvailableTestsTypes.JEST,
      deps: VERSIONS[AvailableTestsTypes.JEST]
    },
    // api interfaces
    {
      condition: options.components.includes(AvailableComponents.SERVER) && options.server === AvailableServerTypes.RESTFUL,
      deps: VERSIONS[AvailableServerTypes.RESTFUL]
    },
    {
      condition: options.components.includes(AvailableComponents.SERVER) && options.server === AvailableServerTypes.GRAPHQL,
      deps: VERSIONS[AvailableServerTypes.GRAPHQL]
    },
    // microservices
    {
      condition: [ AvailableComponents.MICROSERVICE_SERVER, AvailableComponents.MICROSERVICE_CLIENT ].some((c) => options.components.includes(c)),
      deps: VERSIONS.base.microservice
    },
    {
      condition: options.components.includes(AvailableComponents.MICROSERVICE_SERVER),
      deps: VERSIONS[AvailableComponents.MICROSERVICE_SERVER]
    },
    {
      condition: options.components.includes(AvailableComponents.MICROSERVICE_CLIENT),
      deps: VERSIONS[AvailableComponents.MICROSERVICE_CLIENT]
    },
    // components
    {
      condition: options.components.includes(AvailableComponents.BG_TASK),
      deps: VERSIONS[AvailableComponents.BG_TASK]
    },
    {
      condition: options.components.includes(AvailableComponents.COMMAND),
      deps: VERSIONS[AvailableComponents.COMMAND]
    },
    // db related stuff
    {
      condition: options.dbAdapters === AvailableDBAdapters.TYPEORM,
      deps: VERSIONS[AvailableDBAdapters.TYPEORM]
    },
    {
      condition: options.dbAdapters === AvailableDBAdapters.MONGOOSE,
      deps: VERSIONS[AvailableDBAdapters.MONGOOSE]
    },
    {
      condition: options.database === AvailableDBTypes.TYPEORM_MYSQL,
      deps: VERSIONS[AvailableDBTypes.TYPEORM_MYSQL]
    },
    {
      condition: options.database === AvailableDBTypes.TYPEORM_POSTGRESQL,
      deps: VERSIONS[AvailableDBTypes.TYPEORM_POSTGRESQL]
    },
    {
      condition: options.database === AvailableDBTypes.MONGOOSE_MONGODB,
      deps: VERSIONS[AvailableDBTypes.MONGOOSE_MONGODB]
    }
  ])
}
