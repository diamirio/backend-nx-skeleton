import { Tree } from '@angular-devkit/schematics'
import { sync as findUpSync } from 'find-up'
import { dirname, relative } from 'path'

const NX_ROOT_PATTERNS = [ 'nx.json', 'workspace.json', 'angular.json' ]

/**
 * Finds the root directory of nx through nx.json, workspace.json or angular.json
 */
export function findNxRoot (): string {
  const root = findUpSync(NX_ROOT_PATTERNS, { cwd: process.cwd(), type: 'file' })

  if (!root) {
    throw new Error('Not an nx repository.')
  }

  return dirname(root)
}

export function findNxRootInTree (host: Tree): string {
  let root = '/'

  host.visit((path) => {
    console.log(path)
    if (NX_ROOT_PATTERNS.some((pattern) => path.endsWith(pattern))) {
      console.log(path)
      root = dirname(path)
    }
  })

  return root
}

/**
 * Returns the relative path from the nx root.
 */
export function relativeToNxRoot (path: string): string {
  const root = findNxRoot()

  return relative(root, path)
}
