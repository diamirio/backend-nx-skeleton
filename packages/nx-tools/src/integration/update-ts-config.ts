import { Rule } from '@angular-devkit/schematics'
import { updateJsonInTree } from '@nrwl/workspace'

import { NxConstants } from '@interfaces/nx.constants'

/**
 * Updates tsconfig paths in the tsconfig.json
 * @param options
 */
export function updateTsconfigPaths<T extends { packageName: string, sourceRoot: string, root: string }> (options: T): Rule {
  return updateJsonInTree(NxConstants.TS_CONFIG_PATH, (json) => {
    json.compilerOptions.paths[options.packageName] = [ `${options.root}/${options.sourceRoot}/index` ]
    return json
  })
}
