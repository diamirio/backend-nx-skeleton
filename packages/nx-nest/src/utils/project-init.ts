import { join } from 'node:path'
import type { Tree } from '@nx/devkit'
import { names, readNxJson } from '@nx/devkit'
import { getNpmScope } from '@nx/workspace/src/utilities/get-import-path'

export type SetupGeneratorOptions<T> = {
  scope: string
  packageScope: string
  projectNames: ReturnType<typeof names>
  projectName: ReturnType<typeof names>['fileName']
  importPath: string
  appRoot: string
  libRoot: string
  projectRoot?: string
} & {
  [K in keyof T]: T[K]
}

type SetupGeneratorInput = {
  name: string
  scope?: string
  importPath?: string
}

export function setupGeneratorOptions<T extends SetupGeneratorInput>(tree: Tree, options: T): SetupGeneratorOptions<T> {
  const scope = options.scope ?? getNpmScope(tree)
  const projectNames = names(options.name)
  const projectName = projectNames.fileName
  const importPath = options.importPath ?? `@${scope}/${projectName}`

  return {
    scope,
    projectNames,
    projectName,
    importPath,
    packageScope: scope ? importPath : projectName,
    appRoot: readNxJson(tree)?.workspaceLayout?.appsDir ?? 'apps',
    libRoot: readNxJson(tree)?.workspaceLayout?.libsDir ?? 'libs',
    ...options
  }
}

export function cleanupGitkeep(tree: Tree, root: string): void {
  const gitkeepPath = join(root, '.gitkeep')

  if (tree.exists(gitkeepPath)) {
    tree.delete(gitkeepPath)
  }
}
