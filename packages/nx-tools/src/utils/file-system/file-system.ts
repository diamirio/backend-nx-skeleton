import type { Action, CreateFileAction, OverwriteFileAction, Tree } from '@angular-devkit/schematics'
import fs from 'fs'
import { EOL } from 'os'

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
 * @param host
 * @param filter
 */
export function getFilesInTree (host: Tree, filter?: (action: Action) => boolean): Set<{ path: string, content?: string, kind: 'c' | 'o' | 'r' | 'd' }> {
  return new Set(
    host.actions.filter(filter ? filter : Boolean).map((action: OverwriteFileAction | CreateFileAction) => ({
      path: action.path,
      kind: action.kind,
      content: action.content?.toString()
    }))
  )
}
