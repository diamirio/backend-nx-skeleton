import { chain, noop, Rule } from '@angular-devkit/schematics'
import { updateNxJsonInTree } from '@nrwl/workspace'
import { updateBrownieIntegration, updateNxIntegration } from '@webundsoehne/nx-tools'

import { NormalizedSchema } from '@src/schematics/application/main.interface'

export function updateIntegration (options: NormalizedSchema): Rule {
  return chain([
    // create nx json entry
    updateNxJsonInTree((json) => {
      json.projects[options.name] = { tags: [], implicitDependencies: [] }
      return json
    }),

    // add the components that needs to be known
    updateNxIntegration(options.name,
      {
        components: options.components,
        setup: {
          server: options.server, database: options.database
        }
      }),

    // add nx container
    updateBrownieIntegration(options.name, { containers: [ 'nx' ] }),

    // add mysql container
    options.database?.includes('mysql') ?
      updateBrownieIntegration(options.name, { containers: [ 'mysql' ] }) :
      noop(),

    // add postgresql container
    options.database?.includes('postgresql') ?
      updateBrownieIntegration(options.name, { containers: [ 'postgresql' ] }) :
      noop(),

    // add mongodb container
    options.database?.includes('mongodb') ?
      updateBrownieIntegration(options.name, { containers: [ 'mongodb' ] }) :
      noop()
  ])
}
