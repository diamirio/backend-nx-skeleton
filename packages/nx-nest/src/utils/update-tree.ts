import type { Tree } from '@nx/devkit'
import { updateJson } from '@nx/devkit'

export function addPackageScripts(tree: Tree, packageJsonPath: string, scripts: Record<string, string>): void {
  if (!tree.exists(packageJsonPath)) {
    return
  }

  updateJson(tree, packageJsonPath, (content) => {
    if (!content.scripts) {
      content.scripts = {}
    }

    for (const [key, value] of Object.entries(scripts)) {
      content.scripts[key] ??= value
    }

    return content
  })
}
