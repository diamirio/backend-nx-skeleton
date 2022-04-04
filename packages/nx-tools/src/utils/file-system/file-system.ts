import type { Action, CreateFileAction, OverwriteFileAction, Tree } from '@angular-devkit/schematics'
import fs from 'fs'
import { EOL } from 'os'
import which from 'which'

import type { NodeBinaryPathExtensions } from './node-bin.interface'

/**
 * Check if file that is supposed to be executable is defined inside the node_modules folder.
 * @param paths
 */
export function checkPathsExists (paths: Record<string, string>, pathExtensions?: NodeBinaryPathExtensions['path']): void {
  const errors: string[] = []

  Object.entries(paths).forEach(([key, value]) => {
    let found = false

    if (fs.existsSync(value) && fs.statSync(value).isFile()) {
      // given path is absolute, we should know that whether it really exists and actually a file
      found = true
    } else {
      // then this should be a binary that is in the path
      const result = which.sync(value, { path: pathExtensions, nothrow: true })

      if (result) {
        found = true
      }
    }

    if (!found) {
      errors.push(`File or binary not found: "${key}"@"${value}"`)
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
