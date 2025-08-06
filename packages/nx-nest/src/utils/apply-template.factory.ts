import type { Tree } from '@nx/devkit'
import { generateFiles, OverwriteStrategy } from '@nx/devkit'
import type { GenerateFilesOptions } from '@nx/devkit/src/generators/generate-files'
import { join } from 'node:path'

export type ApplyTemplate = (templatePath: string[], context?: Record<string, any>, target?: string) => void

export function applyTemplateFactory (tree: Tree, baseFolder: string, options?: GenerateFilesOptions): ApplyTemplate {
  return (templatePath: string[], context?: Record<string, any>, target = './'): void => {
    // src folder points to the generator folder
    generateFiles(tree, join(baseFolder, ...templatePath), target, context, options ?? { overwriteStrategy: OverwriteStrategy.KeepExisting })

    // update filenames and remove the template file-ending
    for (const file of tree.listChanges() ?? []) {
      if (file.path.endsWith('.ejs')) {
        tree.rename(file.path, file.path.replace('.ejs', ''))
      }
    }
  }
}
