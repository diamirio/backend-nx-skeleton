import type { GeneratorCallback, Tree } from '@nx/devkit'
import { addDependenciesToPackageJson, formatFiles, output, OverwriteStrategy, removeDependenciesFromPackageJson, updateJson } from '@nx/devkit'

import { DatabaseOrm, NODE_VERSION } from '../../constant'
import { SERVICE_NAME, DOCKER_IMAGE } from '../../constant/application'
import { CUSTOM_FIELDS, DEPENDENCIES, DEV_DEPENDENCIES, SCRIPTS } from '../../constant/workspace'
import { applyTasks, applyTemplateFactory } from '../../utils'
import databaseLibraryGenerator from '../database-orm/generator'
import microserviceProviderGenerator from '../microservice-provider/generator'
import type { NestWorkspaceGeneratorSchema } from './schema'

export default async function workspaceGenerator (tree: Tree, options: NestWorkspaceGeneratorSchema): Promise<GeneratorCallback> {
  const tasks: GeneratorCallback[] = []
  const applyTemplate = applyTemplateFactory(tree, __dirname, { overwriteStrategy: options.force ? OverwriteStrategy.Overwrite : OverwriteStrategy.ThrowIfExisting })
  const packageScope = `@${options.scope}/${options.name}`

  output.log({ title: '[Workspace] Applying templates', bodyLines: ['Update files ...', 'Creating template files...', 'Creating layout folders...'] })

  // remove default generated files
  tree.delete('.vscode')
  tree.delete('.editorconfig')
  tree.delete('README.md')

  // add base template
  applyTemplate(['files'], {
    ...options,
    packageScope,
    NODE_VERSION,
    SERVICE_NAME,
    DOCKER_IMAGE
  })
  updateJson(tree, 'package.json', (content) => {
    content.name = packageScope

    return content
  })

  await formatFiles(tree)

  // dependencies and scripts
  if (!options.skipPackageJson) {
    output.log({ title: '[Workspace] Updating package.json', bodyLines: ['Add scripts ....', 'Add dependencies ...'] })

    updateJson(tree, 'package.json', (content) => {
      Object.assign(
        content,
        {
          scripts: {
            ...content.scripts ?? {},
            ...SCRIPTS
          }
        },
        CUSTOM_FIELDS
      )

      return content
    })

    tasks.push(removeDependenciesFromPackageJson(tree, ['@webundsoehne/nx-nest'], []))
    tasks.push(addDependenciesToPackageJson(tree, DEPENDENCIES, DEV_DEPENDENCIES))
  }

  if (options.databaseOrm !== DatabaseOrm.NONE) {
    output.log({ title: '[Workspace] Setup database-orm util library ...' })

    tasks.push(
      await databaseLibraryGenerator(tree, {
        databaseOrm: options.databaseOrm,
        database: options.database,
        name: 'database',
        skipPackageJson: options.skipPackageJson
      })
    )
  }

  if (options.microserviceProvider) {
    output.log({ title: '[Workspace] Setup microservice-provider util library ...' })

    tasks.push(
      await microserviceProviderGenerator(tree, {
        name: 'microservice-provider',
        skipPackageJson: options.skipPackageJson
      })
    )
  }

  output.log({ title: '[Workspace] Post-Processing ...' })

  return applyTasks(tasks)
}
