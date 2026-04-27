import { join } from 'node:path'
import type { GeneratorCallback, Tree } from '@nx/devkit'
import { addDependenciesToPackageJson, addProjectConfiguration, formatFiles, getProjects, output } from '@nx/devkit'
import { addTsConfigPath } from '@nx/js'
import { ProjectType } from '@nx/workspace'

import { Component } from '../../constant'
import { DEPENDENCIES } from '../../constant/seeder'
import {
  addExport,
  addPackageScripts,
  applyTasks,
  applyTemplateFactory,
  cleanupGitkeep,
  SetupGeneratorOptions,
  selectProjectByAutocomplete,
  setupGeneratorOptions,
  updateSourceFile
} from '../../utils'
import type { SeederGeneratorSchema } from './schema'

type GenerateOptions = SetupGeneratorOptions<SeederGeneratorSchema>

export default async function seederGenerator(tree: Tree, options: SeederGeneratorSchema): Promise<GeneratorCallback> {
  const generateOptions: GenerateOptions = setupGeneratorOptions(tree, { ...options, name: 'seeder' })
  generateOptions.projectRoot = join(generateOptions.libRoot, generateOptions.projectName)

  const tasks: GeneratorCallback[] = []
  const applyTemplate = applyTemplateFactory(tree, __dirname)

  const applications = []
  const projects = getProjects(tree)

  for (const project of projects.values()) {
    if (
      project.projectType === 'application' &&
      (project as any).integration.nestjs.components.includes(Component.COMMAND)
    ) {
      applications.push({ name: project.name, value: project.name })
    }
  }

  if (!applications.length) {
    output.error({ title: '[Seeder] No command-projects found' })

    return
  }

  options.project ??= await selectProjectByAutocomplete(
    applications,
    'Please select the project to setup the seeder for:'
  )

  if (!options.project) {
    output.error({ title: '[Seeder] No project selected' })
    return
  }

  const project = projects.get(options.project)

  addProjectConfiguration(tree, 'seeder', {
    root: generateOptions.projectRoot,
    sourceRoot: join(generateOptions.projectRoot, 'src'),
    projectType: ProjectType.Library,
    tags: [],
    targets: {}
  })

  output.log({
    title: '[Seeder] Applying templates',
    bodyLines: ['Update files ...', 'Creating template files...', 'Creating folders...']
  })

  // dependencies
  updatePackageJson(tree, generateOptions, tasks)

  // create files
  applyTemplate(['files'], generateOptions, generateOptions.projectRoot)

  // seed package.json script
  addPackageScripts(tree, 'package.json', {
    [`seed:${project.name}`]: `nx command ${project.name} seed`
  })

  updateSourceFile(tree, join(project.root, 'src', 'command', 'modules', 'index.ts'), (file) => {
    addExport(file, 'SeederCommandModule', `${generateOptions.packageScope}`)
  })

  await formatFiles(tree)

  addTsConfigPath(tree, generateOptions.packageScope, [join(generateOptions.projectRoot, 'src', 'index.ts')])
  addTsConfigPath(tree, `${generateOptions.packageScope}/*`, [join(generateOptions.projectRoot, 'src', '*')])

  cleanupGitkeep(tree, generateOptions.libRoot)

  return applyTasks(tasks)
}

function updatePackageJson(tree: Tree, options: GenerateOptions, tasks: GeneratorCallback[]): void {
  if (!options.skipPackageJson) {
    output.log({ title: '[Seeder] Updating package.json', bodyLines: ['Add scripts ...', 'Add dependencies ...'] })

    tasks.push(addDependenciesToPackageJson(tree, DEPENDENCIES, {}, undefined, true))
  }
}
