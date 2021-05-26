import { Rule, Tree } from '@angular-devkit/schematics'
import { FileData } from '@nrwl/workspace/src/core/file-utils'
import { createProjectGraph, onlyWorkspaceProjects, ProjectGraph, reverse } from '@nrwl/workspace/src/core/project-graph'
import { readNxJsonInTree, readWorkspace } from '@nrwl/workspace/src/utils/ast-utils'
import { getWorkspacePath } from '@nrwl/workspace/src/utils/cli-config-utils'
import ignore from 'ignore'
import * as path from 'path'

import { Schema } from '../main.interface'

/**
 * Check whether the project to be removed is depended on by another project
 *
 * Throws an error if the project is in use, unless the `--forceRemove` option is used.
 *
 * @param schema The options provided to the schematic
 */
export function checkDependencies (schema: Schema): Rule {
  if (schema.forceRemove) {
    return (tree: Tree): Tree => tree
  }

  let ig = ignore()

  return (tree: Tree): Tree => {
    if (tree.exists('.gitignore')) {
      ig = ig.add(tree.read('.gitignore').toString())
    }
    const files: FileData[] = []
    const mtime = Date.now() // can't get mtime data from the tree :(
    const workspaceDir = path.dirname(getWorkspacePath(tree))

    for (const dir of tree.getDir('/').subdirs) {
      if (ig.ignores(dir)) {
        continue
      }

      tree.getDir(dir).visit((file: string) => {
        files.push({
          file: path.relative(workspaceDir, file),
          ext: path.extname(file),
          mtime
        } as unknown as FileData)
      })
    }

    const graph: ProjectGraph = createProjectGraph(readWorkspace(tree), readNxJsonInTree(tree), files)

    const reverseGraph = onlyWorkspaceProjects(reverse(graph))

    const deps = reverseGraph.dependencies[schema.projectName] || []

    if (deps.length === 0) {
      return tree
    }

    throw new Error(`${schema.projectName} is still depended on by the following projects:\n${deps.map((x) => x.target).join('\n')}`)
  }
}
