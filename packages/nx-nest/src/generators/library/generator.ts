import type { GeneratorCallback, Tree } from '@nx/devkit'
import { formatFiles, addDependenciesToPackageJson, addProjectConfiguration, names, output, readNxJson, updateJson } from '@nx/devkit'
import { addTsConfigPath } from '@nx/js'
import { ProjectType } from '@nx/workspace'
import { getNpmScope } from '@nx/workspace/src/utilities/get-import-path'
import { join } from 'node:path'

import { JEST_DEPENDENCIES } from '../../constant/jest'
import { applyTasks, applyTemplateFactory } from '../../utils'
import type { LibraryGeneratorSchema } from './schema'

interface GenerateOptions extends LibraryGeneratorSchema {
  scope: string
  projectNames: {
    name: string
    className: string
    propertyName: string
    constantName: string
    fileName: string
  }
  libRoot: string
  projectRoot: string
}

export default async function libraryGenerator (tree: Tree, options: LibraryGeneratorSchema): Promise<GeneratorCallback> {
  const generateOptions: GenerateOptions = options as GenerateOptions

  const tasks: GeneratorCallback[] = []
  const applyTemplate = applyTemplateFactory(tree, __dirname)

  generateOptions.scope = getNpmScope(tree) ?? 'lib'
  generateOptions.projectNames = names(options.name)
  generateOptions.importPath ??= `@${generateOptions.scope}/${generateOptions.projectNames.fileName}`
  generateOptions.libRoot = readNxJson(tree)?.workspaceLayout?.libsDir ?? 'libs'
  generateOptions.projectRoot = join(generateOptions.libRoot, generateOptions.projectNames.fileName)

  output.log({
    title: '[Library] Applying templates',
    bodyLines: ['Update files ...', 'Creating template files...', 'Creating folders...']
  })

  if (!generateOptions.update) {
    addProjectConfiguration(tree, generateOptions.name, {
      root: generateOptions.projectRoot,
      sourceRoot: join(generateOptions.projectRoot, 'src'),
      projectType: ProjectType.Library,
      tags: [],
      targets: {}
    })

    applyTemplate(['files', 'base'], generateOptions, generateOptions.projectRoot)
  }

  if (generateOptions.jest) {
    output.log({
      title: '[Library] Setup jest',
      bodyLines: ['Add config files ...', !generateOptions.skipPackageJson ? 'Add dependencies ...' : '']
    })

    applyTemplate(['files', 'jest', 'preset'], generateOptions)
    applyTemplate(['files', 'jest', 'files'], generateOptions, generateOptions.projectRoot)

    if (!generateOptions.skipPackageJson) {
      tasks.push(addDependenciesToPackageJson(tree, {}, JEST_DEPENDENCIES))
      updateJson(tree, 'package.json', (content) => {
        content.scripts.test = 'nx run-many --target test --parallel 10'
        content.scripts['test:one'] = 'nx test --project'

        return content
      })
    }
  }

  await formatFiles(tree)

  addTsConfigPath(tree, generateOptions.importPath, [join(generateOptions.projectRoot, 'src', 'index.ts')])
  addTsConfigPath(tree, `${generateOptions.importPath}/*`, [join(generateOptions.projectRoot, 'src', '*')])

  return applyTasks(tasks)
}