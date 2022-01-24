import { Rule, Tree } from '@angular-devkit/schematics'
import { NxConstants } from '@constants/nx.constants'
import { updateJsonInTree } from '@nrwl/workspace'

import { readWorkspaceLayout } from './nx-integration'

/**
 * Updates tsconfig paths in the tsconfig.json
 * @param options
 */
export function updateTsConfigPathsRule (options: { packageName: string, sourceRoot: string, root: string }): Rule {
  return updateJsonInTree(NxConstants.TS_CONFIG_PATH, (json) => {
    json.compilerOptions.paths[options.packageName] = [ `${options.root}/${options.sourceRoot}` ]
    json.compilerOptions.paths[`${options.packageName}/*`] = [ `${options.root}/${options.sourceRoot}/*` ]

    return json
  })
}

/**
 * Removes tsconfig paths in the tsconfig.json
 * @param options
 */
export function removeTsconfigPathsRule (options: { packageName: string }): Rule {
  return (host: Tree): Rule => {
    const { npmScope } = readWorkspaceLayout(host)

    return updateJsonInTree(NxConstants.TS_CONFIG_PATH, (json) => {
      Object.keys(json.compilerOptions.paths).forEach((path) => {
        if (path.startsWith(`@${npmScope}/${options.packageName}`)) {
          delete json.compilerOptions.paths[path]
        }
      })

      return json
    })
  }
}
