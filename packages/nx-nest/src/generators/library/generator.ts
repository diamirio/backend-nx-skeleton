import type { GeneratorCallback, Tree } from '@nx/devkit'
import { formatFiles, addDependenciesToPackageJson, addProjectConfiguration, names, output, readNxJson, updateJson } from '@nx/devkit'
import { addTsConfigPath } from '@nx/js'
import { ProjectType } from '@nx/workspace'
import { getNpmScope } from '@nx/workspace/src/utilities/get-import-path'
import { join } from 'node:path'

import { JEST_DEPENDENCIES } from '../../constant/jest'
import { applyTasks, applyTemplateFactory } from '../utils'
import type { LibraryGeneratorSchema } from './schema'

export default async function libraryGenerator (tree: Tree, options: LibraryGeneratorSchema): Promise<GeneratorCallback> {
  const tasks: GeneratorCallback[] = []
  const applyTemplate = applyTemplateFactory(tree)
  const scope = getNpmScope(tree) ?? 'lib'
  const projectNames = names(options.name)

  options.importPath ??= `@${scope}/${projectNames.fileName}`

  const templateContext = {
    ...options,
    packageScope: options.importPath
  }

  const libRoot = readNxJson(tree)?.workspaceLayout?.libsDir ?? 'libs'
  const projectRoot = join(libRoot, projectNames.fileName)

  output.log({
    title: '[Library] Applying templates',
    bodyLines: ['Update files ...', 'Creating template files...', 'Creating folders...']
  })

  if (!options.update) {
    addProjectConfiguration(tree, options.name, {
      root: projectRoot,
      sourceRoot: join(projectRoot, 'src'),
      projectType: ProjectType.Library,
      tags: [],
      targets: {}
    })

    applyTemplate(['library', 'files', 'base'], templateContext, projectRoot)
  }

  if (options.jest) {
    output.log({
      title: '[Library] Setup jest',
      bodyLines: ['Add config files ...', !options.skipPackageJson ? 'Add dependencies ...' : '']
    })

    applyTemplate(['library', 'files', 'jest', 'preset'], templateContext)
    applyTemplate(['library', 'files', 'jest', 'files'], templateContext, projectRoot)

    if (!options.skipPackageJson) {
      tasks.push(addDependenciesToPackageJson(tree, {}, JEST_DEPENDENCIES))
      updateJson(tree, 'package.json', (content) => {
        content.scripts.test = 'nx run-many --target test --parallel 10'
        content.scripts['test:one'] = 'nx test --project'

        return content
      })
    }
  }

  await formatFiles(tree)

  addTsConfigPath(tree, options.importPath, [join(projectRoot, 'src', 'index.ts')])
  addTsConfigPath(tree, `${options.importPath}/*`, [join(projectRoot, 'src', '*')])

  return applyTasks(tasks)
}
