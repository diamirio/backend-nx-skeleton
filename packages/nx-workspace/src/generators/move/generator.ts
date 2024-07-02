import type { Tree } from '@nx/devkit'
import { output, readProjectConfiguration } from '@nx/devkit'
import { readTsConfigPaths } from '@nx/js'
import { moveGeneratorInternal } from '@nx/workspace/src/generators/move/move'
import { join, normalize, parse } from 'node:path'

import type { MoveGeneratorSchema } from './schema'

export default async function moveGenerator (tree: Tree, options: MoveGeneratorSchema): Promise<void> {
  const { name, dir } = parse(options.destination)
  const project = readProjectConfiguration(tree, options.projectName)

  // just rename without the new destination path
  if (!dir.length) {
    options.destination = normalize(join(project.root, '..', name))
  }

  if (options.destination === project.root) {
    output.log({ title: 'Destination equals project-root', bodyLines: [`${options.destination} == ${project.root}`, 'Nothing to do, skipping ...'] })

    return
  }

  // if new destination move and rename project
  if (!tree.exists(options.destination)) {
    if (name !== options.projectName) {
      options.newProjectName = name

      const paths = readTsConfigPaths()
      const projectPath = Object.entries(paths).find((path) => path[1].some((v) => v.includes(project.root)))?.[0]

      options.importPath = projectPath?.replace(project.name, name)
    }
  }

  await moveGeneratorInternal(tree, options)
}
