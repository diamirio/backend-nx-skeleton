import type { GeneratorCallback, Tree } from '@nx/devkit'
import { addDependenciesToPackageJson, addProjectConfiguration, formatFiles, names, output, readNxJson } from '@nx/devkit'
import { addTsConfigPath } from '@nx/js'
import { ProjectType } from '@nx/workspace'
import { getNpmScope } from '@nx/workspace/src/utilities/get-import-path'
import { join } from 'node:path'
import { updateJson } from 'nx/src/generators/utils/json'

import { DEPENDENCIES, DEV_DEPENDENCIES } from '../../constant/microservice-provider'
import { applyTasks, applyTemplateFactory } from '../../utils'
import type { MicroserviceProviderGeneratorSchema } from './schema'

// @todo: project selection to add Orm-Module root import
export default async function microserviceProviderGenerator (tree: Tree, options: MicroserviceProviderGeneratorSchema): Promise<GeneratorCallback> {
  const tasks: GeneratorCallback[] = []
  const applyTemplate = applyTemplateFactory(tree, __dirname)
  const scope = getNpmScope(tree)
  const libraryName = names(options.name).fileName
  const importPath = options?.importPath ?? `@${scope}/${libraryName}`

  const templateContext = {
    ...options,
    packageScope: scope ? importPath : libraryName
  }

  const libRoot = readNxJson(tree)?.workspaceLayout?.libsDir ?? 'libs'
  const projectRoot = join(libRoot, libraryName)

  output.log({
    title: '[Microservice Provider] Applying templates',
    bodyLines: ['Update files ...', 'Creating template files...', 'Creating folders...']
  })

  addProjectConfiguration(tree, libraryName, {
    root: projectRoot,
    sourceRoot: join(projectRoot, 'src'),
    projectType: ProjectType.Library,
    tags: [],
    targets: {}
  })

  applyTemplate(['files'], templateContext, projectRoot)

  await formatFiles(tree)

  addTsConfigPath(tree, importPath, [join(projectRoot, 'src', 'index.ts')])
  addTsConfigPath(tree, `${importPath}/*`, [join(projectRoot, 'src', '*')])

  // dependencies and scripts
  if (!options.skipPackageJson) {
    output.log({ title: '[Microservice Provider] Updating package.json', bodyLines: ['Add dependencies ...'] })

    tasks.push(addDependenciesToPackageJson(tree, DEPENDENCIES, DEV_DEPENDENCIES))
  }

  updateJson(tree, 'nx.json', (content) => {
    content.integration = {
      ...content.integration ?? {},
      msp: {
        projectRoot,
        importPath
      }
    }

    return content
  })

  if (tree.exists(join(libRoot, '.gitkeep'))) {
    tree.delete(join(libRoot, '.gitkeep'))
  }

  return applyTasks(tasks)
}
