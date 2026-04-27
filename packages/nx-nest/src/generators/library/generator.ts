import { join } from 'node:path'
import type { GeneratorCallback, Tree } from '@nx/devkit'
import { addDependenciesToPackageJson, addProjectConfiguration, formatFiles, output } from '@nx/devkit'
import { addTsConfigPath } from '@nx/js'
import { ProjectType } from '@nx/workspace'

import { JEST_DEPENDENCIES } from '../../constant/jest'
import {
  addPackageScripts,
  applyTasks,
  applyTemplateFactory,
  cleanupGitkeep,
  SetupGeneratorOptions,
  setupGeneratorOptions
} from '../../utils'
import type { LibraryGeneratorSchema } from './schema'

type GenerateOptions = SetupGeneratorOptions<LibraryGeneratorSchema>

export default async function libraryGenerator(
  tree: Tree,
  options: LibraryGeneratorSchema
): Promise<GeneratorCallback> {
  const generateOptions: GenerateOptions = setupGeneratorOptions(tree, options)
  generateOptions.projectRoot = join(generateOptions.libRoot, generateOptions.projectName)

  const tasks: GeneratorCallback[] = []
  const applyTemplate = applyTemplateFactory(tree, __dirname)

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
      tasks.push(addDependenciesToPackageJson(tree, {}, JEST_DEPENDENCIES, undefined, true))
      addPackageScripts(tree, 'package.json', {
        test: 'nx run-many --target test --parallel 10',
        'test:one': 'nx test --project'
      })
    }
  }

  await formatFiles(tree)

  addTsConfigPath(tree, generateOptions.importPath, [join(generateOptions.projectRoot, 'src', 'index.ts')])
  addTsConfigPath(tree, `${generateOptions.importPath}/*`, [join(generateOptions.projectRoot, 'src', '*')])

  cleanupGitkeep(tree, generateOptions.libRoot)

  return applyTasks(tasks)
}
