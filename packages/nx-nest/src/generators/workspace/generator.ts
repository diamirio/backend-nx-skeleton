import type { GeneratorCallback, Tree } from '@nx/devkit'
import { addDependenciesToPackageJson, output, OverwriteStrategy, updateJson } from '@nx/devkit'

import { DatabaseOrm, NODE_VERSION } from '../../constant'
import { DOCKER_IMAGE, SERVICE_NAME } from '../../constant/application'
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

  // dependencies and scripts
  updatePackageJson(tree, options, tasks)

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

  // extend generated gitignore
  extendGitignore(tree)

  output.log({ title: '[Workspace] Post-Processing ...' })

  return applyTasks(tasks)
}

// HELPER
function updatePackageJson (tree: Tree, options: NestWorkspaceGeneratorSchema, tasks: GeneratorCallback[]): void {
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

      const packageVersion = content.dependencies['@webundsoehne/nx-nest']

      delete content.dependencies['@webundsoehne/nx-nest']

      content.devDependencies['@webundsoehne/nx-nest'] = packageVersion

      return content
    })

    tasks.push(addDependenciesToPackageJson(tree, DEPENDENCIES, DEV_DEPENDENCIES))
  }
}

function extendGitignore (tree: Tree): void {
  if (tree.exists('.gitignore')) {
    const ignored = tree.read('.gitignore')
    const toIgnore = ['# Node Package Manager', '.npm', '', '# enviroment files', '.*env*', '', '# File Uploads', 'uploads', '', '# Config', '**/config/local*'].join('\n')

    tree.write('.gitignore', `${ignored}\n${toIgnore}`)
  }
}
