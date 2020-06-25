import { Rule } from '@angular-devkit/schematics'
import { NxJson, updateJsonInTree } from '@nrwl/workspace'

import { NormalizedSchema } from '@application/schema'

export function updateNxJson (options: NormalizedSchema): Rule {
  return updateJsonInTree<NxJson>('nx.json', (json) => {
    json.projects[options.name] = { tags: [] }
    return json
  })
}