import { Rule, chain, noop } from '@angular-devkit/schematics'
import { updateBrownieIntegration } from '@webundsoehne/nx-tools'

import { NormalizedSchema } from '@src/schematics/application/main.interface'

export function updateBrownie (options: NormalizedSchema): Rule {
  return chain([
    updateBrownieIntegration({ name: options.name, containers: [ 'nx' ] }),
    options.database?.includes('mysql') ?
      updateBrownieIntegration({ name: options.name, containers: [ 'mysql' ] }) :
      noop(),
    options.database?.includes('postgresql') ?
      updateBrownieIntegration({ name: options.name, containers: [ 'postgresql' ] }) :
      noop(),
    options.database?.includes('mongodb') ?
      updateBrownieIntegration({ name: options.name, containers: [ 'mongodb' ] }) :
      noop()
  ])
}
