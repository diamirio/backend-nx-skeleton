import { Rule, Tree } from '@angular-devkit/schematics'
import { updateWorkspaceInTree } from '@nrwl/workspace'

import { Schema } from '../main.interface'
import { EnrichedWorkspaceConfiguration } from '@webundsoehne/nx-tools'

/**
 * Check whether the project to be removed has builders targetted by another project
 *
 * Throws an error if the project is in use, unless the `--forceRemove` option is used.
 *
 * @param schema The options provided to the schematic
 */
export function checkTargets (schema: Schema): Rule {
  if (schema.forceRemove) {
    return (tree: Tree): Tree => tree
  }

  return updateWorkspaceInTree<EnrichedWorkspaceConfiguration>((workspace) => {
    const findTarget = new RegExp(`${schema.projectName}:`)

    const usedIn = []

    for (const name of Object.keys(workspace.projects)) {
      if (name === schema.projectName) {
        continue
      }

      const projectStr = JSON.stringify(workspace.projects[name])

      if (findTarget.test(projectStr)) {
        usedIn.push(name)
      }
    }

    if (usedIn.length > 0) {
      let message = `${schema.projectName} is still targeted by the following projects:\n\n`
      for (const project of usedIn) {
        message += `${project}\n`
      }
      throw new Error(message)
    }

    return workspace
  })
}
