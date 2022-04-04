import type { ListrTask } from 'listr2'

import { findNxRoot } from '@utils/file-system/find-nx-root'
import { color } from '@utils/logger'

export function ensureNxRootListrTask (): ListrTask[] {
  return [
    {
      skip: (ctx): boolean => !!ctx.extensions && ctx.extensions.length > 0,
      task: async (_, task): Promise<void> => {
        const nxRoot = findNxRoot()

        if (nxRoot !== process.cwd()) {
          task.title = color.yellow('This schematic strictly works from the root of the NX repository.')

          throw new Error(`Run this schematic from the NX root: ${nxRoot}`)
        }
      },
      options: {
        bottomBar: Infinity,
        persistentOutput: true
      }
    }
  ]
}
