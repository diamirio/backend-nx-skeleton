import execa from 'execa'
import { join } from 'path'

/**
 * Returns the binary path for a given cli in node_modules.
 *
 * @export
 * @param {string} [bin]
 * @returns  {string}
 */
export function getNodeBinaryPath (bin?: string): string {
  const binaryPath = execa.sync('npm', ['bin']).stdout

  return bin ? join(binaryPath, bin) : binaryPath
}
