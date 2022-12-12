import { sync as findUpSync } from 'find-up'
import { dirname, relative } from 'path'

const NX_ROOT_PATTERNS = ['nx.json', 'workspace.json', 'angular.json']

/**
 * Finds the root directory of nx through nx.json, workspace.json or angular.json
 */
export function findNxRoot (options?: { throw?: boolean }): string {
  options = { throw: true, ...options }

  let root: string

  if (process.env.NX_WORKSPACE_ROOT) {
    root = process.env.NX_WORKSPACE_ROOT
  } else {
    root = findUpSync(NX_ROOT_PATTERNS, { cwd: process.cwd(), type: 'file' })

    if (root) {
      // we actually need the dir name for this
      root = dirname(root)
    }
  }

  if (!root && options.throw !== false) {
    throw new Error('Not an nx repository.')
  } else if (!root) {
    return
  }

  return root
}

/**
 * Returns the relative path from the nx root.
 */
export function relativeToNxRoot (path: string): string {
  const root = findNxRoot()

  return relative(root, path)
}
