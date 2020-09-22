import { Rule } from '@angular-devkit/schematics'
import { updateJsonInTree } from '@nrwl/workspace'

import { NormalizedSchema } from '@src/schematics/application/main.interface'

export function updateTsconfigPaths (options: NormalizedSchema): Rule {
  return updateJsonInTree('tsconfig.base.json', (json) => {
    json.compilerOptions.paths[options.packageName] = [ `${options.root}/*` ]
    return json
  })
}
