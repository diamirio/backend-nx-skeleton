import { Rule } from '@angular-devkit/schematics'
import { updateNxJsonInTree } from '@nrwl/workspace'

import { NormalizedSchema } from '../main.interface'
import { AvailableFolderStructures } from '@interfaces/available.constants'

/**
 * Add the project to the {workspace,angular}.json
 * @param options Parsed schema
 */
export function addProject (options: NormalizedSchema): Rule {
  return updateNxJsonInTree((json) => {
    if (options.layout === AvailableFolderStructures.SINGLE) {
      json.workspaceLayout = {
        appsDir: 'packages',
        libsDir: 'packages'
      }
    } else if (options.layout === AvailableFolderStructures.MULTIPLE) {
      json.workspaceLayout = {
        appsDir: 'apps',
        libsDir: 'libs'
      }
    } else {
      throw new Error('Selected folder structure is invalid.')
    }

    return json
  })
}
