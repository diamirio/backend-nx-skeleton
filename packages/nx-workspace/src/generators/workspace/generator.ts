import type { GeneratorCallback, Tree } from '@nx/devkit'
import { formatFiles, addDependenciesToPackageJson, output, OverwriteStrategy, readNxJson, updateJson, updateNxJson } from '@nx/devkit'

import { applyTemplateFactory } from '../utils'
import { CUSTOM_FIELDS, DEPENDENCIES, DEV_DEPENDENCIES, LAYOUTS, SCRIPTS } from './constants'
import type { WorkspaceGeneratorSchema } from './schema'

export default async function workspaceGenerator (tree: Tree, options: WorkspaceGeneratorSchema): Promise<GeneratorCallback> {
  const tasks: GeneratorCallback[] = []
  const applyTemplate = applyTemplateFactory(tree, { overwriteStrategy: options.force ? OverwriteStrategy.Overwrite : OverwriteStrategy.ThrowIfExisting })

  output.log({ title: 'Applying templates', bodyLines: ['Update files ...', 'Creating template files...', 'Creating layout folders...'] })

  // update nx.json
  updateNxJson(tree, { ...readNxJson(tree), workspaceLayout: LAYOUTS[options.layout].workspaceLayout })
  tree.delete('.vscode')
  tree.delete('.editorconfig')
  tree.delete('README.md')

  // add files
  applyTemplate(['workspace', 'files'], {
    ...options,
    packageScope: `@${options.scope}/${options.name}`
  })

  await formatFiles(tree)

  // dependencies and scripts
  if (!options.skipPackageJson) {
    output.log({ title: 'Updating package.json', bodyLines: ['Add scripts ....', 'Add dependencies ...'] })

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

    tasks.push(addDependenciesToPackageJson(tree, DEPENDENCIES, DEV_DEPENDENCIES))
  }

  output.log({ title: 'Post-Processing ...' })

  return async (): Promise<void> => {
    for (const task of tasks) {
      try {
        await task()
      } catch (error) {
        output.error({
          title: 'Error on post-processing',
          bodyLines: error.message?.split('\n').filter((line: string) => !!line.trim())
        })
      }
    }
  }
}
