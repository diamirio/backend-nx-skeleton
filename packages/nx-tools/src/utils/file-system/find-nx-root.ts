import { sync as findUp } from 'find-up'
import { dirname, relative } from 'path'

/**
 * Finds the root directory of nx through nx.json, workspace.json or angular.json
 */
export function findNxRoot (): string {
  const root = findUp([ 'nx.json', 'workspace.json', 'angular.json' ], { cwd: process.cwd(), type: 'file' })

  if (!root) {
    throw new Error('Not an nx repository.')
  }

  return dirname(root)
}

/**
 * Returns the relative path from the nx root.
 */
export function relativeToNxRoot (path: string): string {
  const root = findNxRoot()

  return relative(root, path)
}
