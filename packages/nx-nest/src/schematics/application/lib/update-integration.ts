import { chain, noop, Rule } from '@angular-devkit/schematics'

import { NormalizedSchema } from '../main.interface'
import { AvailableComponents, AvailableDBTypes } from '@interfaces/available.constants'
import { NxNestProjectIntegration } from '@src/integration'
import { BrownieAvailableContainers, updateBrownieIntegrationRule, updateNxIntegrationRule } from '@webundsoehne/nx-tools'

/**
 * Update integration with different interfaces.
 * @param options
 */
export function updateIntegration (options: NormalizedSchema): Rule {
  const integrationKeys: (keyof NormalizedSchema['priorConfiguration'])[] = [
    'components',
    'effectiveComponents',
    'server',
    'extensions',
    'microservice',
    'microserviceClient',
    'database',
    'dbAdapters',
    'tests'
  ]

  return chain([
    // add the components that needs to be known
    updateNxIntegrationRule<NxNestProjectIntegration>(options.name, {
      nestjs: integrationKeys.reduce(
        (o, key) => ({
          ...o,
          [key]: options[key]
        }),
        {} as NxNestProjectIntegration['nestjs']
      )
    }),

    // add nx container
    updateBrownieIntegrationRule(options.name, { containers: [ BrownieAvailableContainers.NX ] }),

    // add mysql container
    [ AvailableDBTypes.TYPEORM_MYSQL ].includes(options.database) ? updateBrownieIntegrationRule(options.name, { containers: [ BrownieAvailableContainers.MYSQL ] }) : noop(),

    // add postgresql container
    [ AvailableDBTypes.TYPEORM_POSTGRESQL ].includes(options.database)
      ? updateBrownieIntegrationRule(options.name, { containers: [ BrownieAvailableContainers.POSTGRESQL ] })
      : noop(),

    // add mongodb container
    // eslint-disable-next-line max-len
    [ AvailableDBTypes.MONGOOSE_MONGODB ].includes(options.database) ? updateBrownieIntegrationRule(options.name, { containers: [ BrownieAvailableContainers.MONGODB ] }) : noop(),

    // add message queue container
    options.components?.includes(AvailableComponents.MICROSERVICE_SERVER)
      ? updateBrownieIntegrationRule(options.name, { containers: [ BrownieAvailableContainers.RABBITMQ ] })
      : noop()
  ])
}
