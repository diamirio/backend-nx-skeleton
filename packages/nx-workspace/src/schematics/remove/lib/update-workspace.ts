import { Rule } from '@angular-devkit/schematics'
import { updateWorkspaceInTree } from '@nrwl/workspace'

import { Schema } from '../main.interface'
import { EnrichedWorkspaceJson } from '@webundsoehne/nx-tools'

/**
 * Deletes the project from the workspace file
 *
 * @param schema The options provided to the schematic
 */
export function updateWorkspace (schema: Schema): Rule {
  return updateWorkspaceInTree<EnrichedWorkspaceJson>((workspace) => {
    delete workspace.projects[schema.projectName]
    return workspace
  })
}
