import type { Tree } from '@nx/devkit'
import { getProjects } from '@nx/devkit'
import { ProjectType } from '@nx/workspace'

import { applyTemplateFactory } from '../utils'
import type { DockerGeneratorSchema } from './schema'

export default async function dockerGenerator (tree: Tree, options: DockerGeneratorSchema): Promise<void> {
  const projects = getProjects(tree)
  const applyTemplate = applyTemplateFactory(tree)

  for (const [name, project] of projects) {
    if (project.projectType === ProjectType.Application && options?.projects && options.projects.includes(name) && !options?.exclude?.includes(name)) {
      applyTemplate(['docker', 'files'], {}, project.root)
    }
  }
}
