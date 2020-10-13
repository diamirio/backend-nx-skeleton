import { chain, noop, Rule } from '@angular-devkit/schematics'
import { updateNxJsonInTree } from '@nrwl/workspace'
import { updateBrownieIntegration, updateNxIntegration } from '@webundsoehne/nx-tools'

import { NormalizedSchema } from '../main.interface'
import { AvailableComponents, AvailableDBTypes } from '@interfaces/available.constants'

/**
 * Update integration with different interfaces.
 * @param options
 */
export function updateIntegration (options: NormalizedSchema): Rule {
  return chain([
    // create nx json entry
    updateNxJsonInTree((json) => {
      json.projects[options.name] = { tags: [], implicitDependencies: [] }
      return json
    }),

    // add the components that needs to be known
    updateNxIntegration<NormalizedSchema['priorConfiguration']>(options.name, {
      components: options.components,
      server: options.server,
      microservice: options.microservice,
      database: options.database,
      tests: options.tests
    }),

    // add nx container
    updateBrownieIntegration(options.name, { containers: [ 'nx' ] }),

    // add mysql container
    [ AvailableDBTypes.TYPEORM_MYSQL ].includes(options.database) ? updateBrownieIntegration(options.name, { containers: [ 'mysql' ] }) : noop(),

    // add postgresql container
    [ AvailableDBTypes.TYPEORM_POSTGRESQL ].includes(options.database) ? updateBrownieIntegration(options.name, { containers: [ 'postgresql' ] }) : noop(),

    // add mongodb container
    [ AvailableDBTypes.MONGOOSE_MONGODB ].includes(options.database) ? updateBrownieIntegration(options.name, { containers: [ 'mongodb' ] }) : noop(),

    // add message queue container
    // fix me later
    options.components?.includes(AvailableComponents.MICROSERVICE_SERVER) ? updateBrownieIntegration(options.name, { containers: [ 'rabbitmq' ] }) : noop()
  ])
}
