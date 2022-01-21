import { BuilderContext } from '@angular-devkit/architect'
import { workspaces } from '@angular-devkit/core'
import { Host } from '@angular-devkit/core/src/virtual-fs/host'
import { Action, CreateFileAction, OverwriteFileAction, Tree } from '@angular-devkit/schematics'
import fs from 'fs'
import { EOL } from 'os'

/**
 * Will return the workspace definition.
 * @param context
 * @param host
 */
export async function getWorkspace (context: BuilderContext, host: Host): Promise<workspaces.WorkspaceDefinition> {
  const workspaceHost = workspaces.createWorkspaceHost(host)
  const { workspace } = await workspaces.readWorkspace(context.workspaceRoot, workspaceHost)

  return workspace
}

/**
 * Check if file that is supposed to be executable is defined inside the node_modules folder.
 * @param paths
 */
export function checkPathsExists (paths: Record<string, string>): void {
  const errors: string[] = []

  Object.entries(paths).forEach(([ key, value ]) => {
    if (!fs.existsSync(value) || !fs.statSync(value).isFile()) {
      errors.push(`File not found: "${key}"@"${value}"`)
    }
  })

  if (errors.length > 0) {
    throw new Error(errors.join(EOL))
  }
}

/**
 * Will return the files in the given source tree applying the filters.
 * @param tree
 * @param filter
 */
export function getFilesInTree (tree: Tree, filter?: (action: Action) => boolean): Set<{ path: string, content: string, kind: 'c' | 'o' | 'r' | 'd' }> {
  return new Set(
    tree.actions.filter(filter ? filter : (): boolean => false).map((action: OverwriteFileAction | CreateFileAction) => ({
      path: action.path,
      kind: action.kind,
      content: action.content.toString()
    }))
  )
}
