import type { Rule } from '@angular-devkit/schematics'
import { updateJsonInTree } from '@nrwl/workspace'

import { NxConstants } from '@constants/nx.constants'

/**
 * Updates tsconfig paths in the tsconfig.json
 * @param options
 */
export function updateTsConfigPathsRule (options: { packageName: string, root?: string, sourceRoot?: string, tsconfig?: string }): Rule {
  return updateJsonInTree(options.tsconfig ?? NxConstants.TS_CONFIG_PATH, (json) => {
    if (!json.compilerOptions) {
      json.compilerOptions = {}
    }

    if (!json.compilerOptions.paths) {
      json.compilerOptions.paths = {}
    }

    let path: string

    if (options.root) {
      path = options.root
    }

    if (options.sourceRoot) {
      path = `${path}/${options.sourceRoot}`
    }

    json.compilerOptions.paths[options.packageName] = [path]
    json.compilerOptions.paths[`${options.packageName}/*`] = [`${path}/*`]

    return json
  })
}

/**
 * Removes tsconfig paths in the tsconfig.json
 * @param options
 */
export function removeTsConfigPathsRule (options: { packageName: string, tsconfig?: string }): Rule {
  return updateJsonInTree(options.tsconfig ?? NxConstants.TS_CONFIG_PATH, (json) => {
    Object.keys(json.compilerOptions.paths).forEach((path) => {
      if (path.startsWith(`${options.packageName}`)) {
        delete json.compilerOptions.paths[path]
      }
    })

    return json
  })
}
