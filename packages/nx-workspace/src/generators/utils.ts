import type { Tree } from '@nx/devkit'
import { generateFiles, OverwriteStrategy } from '@nx/devkit'
import type { GenerateFilesOptions } from '@nx/devkit/src/generators/generate-files'
import { join } from 'node:path'

export function applyTemplateFactory (tree: Tree, options?: GenerateFilesOptions) {
  return (templatePath: string[], context?: Record<string, any>, target = './'): void => {
    generateFiles(tree, join(__dirname, ...templatePath), target, context, options ?? { overwriteStrategy: OverwriteStrategy.KeepExisting })

    // update filenames and remove the template file-ending
    for (const file of tree.listChanges() ?? []) {
      if (file.path.endsWith('.ejs')) {
        tree.rename(file.path, file.path.replace('.ejs', ''))
      }
    }
  }
}
