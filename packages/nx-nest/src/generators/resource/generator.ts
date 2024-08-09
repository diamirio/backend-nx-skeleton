import type { GeneratorCallback, Tree } from '@nx/devkit'
import { formatFiles, getProjects, names } from '@nx/devkit'
import { output } from '@nx/workspace'
import { prompt } from 'enquirer'
import { join } from 'node:path'

import { Component, componentMetaData } from '../../constant'
import { addIndexExport, applyTemplateFactory, updateSourceFile } from '../../utils'
import type { ResourceGeneratorSchema } from './schema'

export default async function resourceGenerator (tree: Tree, options: ResourceGeneratorSchema): Promise<GeneratorCallback> {
  if (!componentMetaData[options.component]) {
    output.error({ title: `[Resource] Invalid component "${options.component}". Must be one of ${Object.values(Component).join(', ')}` })

    return
  }

  const applications = []
  const projects = getProjects(tree)

  for (const project of projects.values()) {
    if (project.projectType === 'application' && (project as any).integration.nestjs.components.includes(options.component)) {
      applications.push({ name: project.name, value: project.name })
    }
  }

  if (!applications.length) {
    output.error({ title: '[Resource] No matching project for this component' })

    return
  }

  options.project ??= (
    await prompt<{ project: string }>({
      type: 'autocomplete',
      name: 'project',
      message: 'Please select a project:',
      choices: applications
    })
  ).project

  const project = projects.get(options.project)
  const componentRoot = join(project.sourceRoot, componentMetaData[options.component].folder)
  const applyTemplate = applyTemplateFactory(tree, __dirname)
  const resourceNames = names(options.name)

  const templateContext: Record<string, any> = {
    ...options,
    resourceNames,
    fileName: resourceNames.fileName
  }

  /**
   * TEMPLATES
   */
  output.log({
    title: '[Resource] Applying templates',
    bodyLines: ['Update files ...', 'Creating template files...', 'Creating folders...']
  })

  // component-specific folder
  applyTemplate(['files', componentMetaData[options.component].folder], templateContext, componentRoot)

  updateSourceFile(tree, join(componentRoot, 'modules', 'index.ts'), (file) => {
    addIndexExport(file, `./${resourceNames.fileName}/${resourceNames.fileName}.module`)
  })

  await formatFiles(tree)
}
