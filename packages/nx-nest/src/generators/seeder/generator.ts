import type { GeneratorCallback, Tree } from '@nx/devkit'
import { addDependenciesToPackageJson, formatFiles, getProjects, names, output, readNxJson, updateJson } from '@nx/devkit'
import { addTsConfigPath } from '@nx/js'
import { getNpmScope } from '@nx/workspace/src/utilities/get-import-path'
import { prompt } from 'enquirer'
import { join } from 'node:path'

import { Component } from '../../constant'
import { DEPENDENCIES } from '../../constant/seeder'
import { addExport, applyTasks, applyTemplateFactory, updateSourceFile } from '../../utils'
import type { SeederGeneratorSchema } from './schema'

interface GenerateOptions extends SeederGeneratorSchema {
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
  packageScope: string
}

export default async function databaseOrmGenerator (tree: Tree, options: SeederGeneratorSchema): Promise<GeneratorCallback> {
  const generateOptions: GenerateOptions = options as GenerateOptions

  const tasks: GeneratorCallback[] = []
  const applyTemplate = applyTemplateFactory(tree, __dirname)

  generateOptions.scope = getNpmScope(tree) ?? 'lib'
  generateOptions.projectNames = names('seeder')
  generateOptions.packageScope = `@${generateOptions.scope}/${generateOptions.projectNames.fileName}`
  generateOptions.libRoot = readNxJson(tree)?.workspaceLayout?.libsDir ?? 'libs'
  generateOptions.projectRoot = join(generateOptions.libRoot, generateOptions.projectNames.fileName)

  const applications = []
  const projects = getProjects(tree)

  for (const project of projects.values()) {
    if (project.projectType === 'application' && (project as any).integration.nestjs.components.includes(Component.COMMAND)) {
      applications.push({ name: project.name, value: project.name })
    }
  }

  if (!applications.length) {
    output.error({ title: '[Seeder] No command-projects found' })

    return
  }

  options.project ??= (
    await prompt<{ project: string }>({
      type: 'autocomplete',
      name: 'project',
      message: 'Please select the project to setup the seeder for:',
      choices: applications
    })
  ).project

  const project = projects.get(options.project)

  output.log({
    title: '[Seeder] Applying templates',
    bodyLines: ['Update files ...', 'Creating template files...', 'Creating folders...']
  })

  // dependencies
  updatePackageJson(tree, generateOptions, tasks)

  // seed package.json script
  updateJson(tree, 'package.json', (content) => {
    content.scripts[`seed:${project.name}`] ??= `nx command ${project.name} seed`

    return content
  })

  // create files
  applyTemplate(['files'], generateOptions, generateOptions.projectRoot)

  updateSourceFile(tree, join(project.root, 'src', 'command', 'modules', 'index.ts'), (file) => {
    addExport(file, 'SeederCommandModule', `${generateOptions.packageScope}`)
  })

  await formatFiles(tree)

  addTsConfigPath(tree, generateOptions.packageScope, [join(generateOptions.projectRoot, 'src', 'index.ts')])
  addTsConfigPath(tree, `${generateOptions.packageScope}/*`, [join(generateOptions.projectRoot, 'src', '*')])

  if (tree.exists(join(generateOptions.libRoot, '.gitkeep'))) {
    tree.delete(join(generateOptions.libRoot, '.gitkeep'))
  }

  return applyTasks(tasks)
}

function updatePackageJson (tree: Tree, options: GenerateOptions, tasks: GeneratorCallback[]): void {
  if (!options.skipPackageJson) {
    output.log({ title: '[Seeder] Updating package.json', bodyLines: ['Add scripts ...', 'Add dependencies ...'] })

    tasks.push(addDependenciesToPackageJson(tree, DEPENDENCIES, {}))
  }
}
