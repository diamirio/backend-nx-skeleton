import { Rule, chain, noop } from '@angular-devkit/schematics'
import { NxJson, updateJsonInTree } from '@nrwl/workspace'
import { updateBrownieIntegration } from '@webundsoehne/nx-tools'

import { NormalizedSchema } from '@src/schematics/application/main.interface'

export function updateBrownie (options: NormalizedSchema): Rule {
  return chain([
    updateBrownieIntegration({ containers: [ 'nx' ] }),
    options.database.includes('mysql') ?
      updateBrownieIntegration({ containers: [ 'mysql' ] }) :
      noop(),
    options.database.includes('postgresql') ?
      updateBrownieIntegration({ containers: [ 'postgresql' ] }) :
      noop(),
    options.database.includes('mongodb') ?
      updateBrownieIntegration({ containers: [ 'mongodb' ] }) :
      noop()
  ])
}