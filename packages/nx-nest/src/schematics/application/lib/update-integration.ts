import { chain, noop, Rule } from '@angular-devkit/schematics'
import { updateNxJsonInTree } from '@nrwl/workspace'
import { updateBrownieIntegration, updateNxIntegration, BrownieAvailableContainers } from '@webundsoehne/nx-tools'

import { NormalizedSchema } from '../main.interface'
import { AvailableComponents, AvailableDBTypes } from '@interfaces/available.constants'

/**
 * Update integration with different interfaces.
 * @param options
 */
export function updateIntegration (options: NormalizedSchema): Rule {
  const integrationKeys: (keyof NormalizedSchema['priorConfiguration'])[] = [
    'components',
    'effectiveComponents',
    'server',
    'microservice',
    'microserviceClient',
    'database',
    'dbAdapters',
    'tests'
  ]

  return chain([
    // create nx json entry
    updateNxJsonInTree((json) => {
      json.projects[options.name] = { tags: [], implicitDependencies: [] }
      return json
    }),

    // add the components that needs to be known
    updateNxIntegration<NormalizedSchema['priorConfiguration']>(
      options.name,
      integrationKeys.reduce(
        (o, key) => ({
          ...o,
          [key]: options[key]
        }),
        {} as NormalizedSchema['priorConfiguration']
      )
    ),

    // add nx container
    updateBrownieIntegration(options.name, { containers: [ BrownieAvailableContainers.NX ] }),

    // add mysql container
    [ AvailableDBTypes.TYPEORM_MYSQL ].includes(options.database) ? updateBrownieIntegration(options.name, { containers: [ BrownieAvailableContainers.MYSQL ] }) : noop(),

    // add postgresql container
    [ AvailableDBTypes.TYPEORM_POSTGRESQL ].includes(options.database) ? updateBrownieIntegration(options.name, { containers: [ BrownieAvailableContainers.POSTGRESQL ] }) : noop(),

    // add mongodb container
    [ AvailableDBTypes.MONGOOSE_MONGODB ].includes(options.database) ? updateBrownieIntegration(options.name, { containers: [ BrownieAvailableContainers.MONGODB ] }) : noop(),

    // add message queue container
    options.components?.includes(AvailableComponents.MICROSERVICE_SERVER) ? updateBrownieIntegration(options.name, { containers: [ BrownieAvailableContainers.RABBITMQ ] }) : noop()
  ])
}
