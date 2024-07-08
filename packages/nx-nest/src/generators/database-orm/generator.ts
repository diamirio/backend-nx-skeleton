import type { GeneratorCallback, Tree } from '@nx/devkit'
import { addDependenciesToPackageJson, addProjectConfiguration, formatFiles, names, output, readNxJson, updateJson } from '@nx/devkit'
import { addTsConfigPath } from '@nx/js'
import { ProjectType } from '@nx/workspace'
import { getNpmScope } from '@nx/workspace/src/utilities/get-import-path'
import { join } from 'node:path'

import { Database } from '../../constant'
import { DEPENDENCIES_MONGOOSE, DEPENDENCIES_TYPEORM, SCRIPTS } from '../../constant/database-orm'
import { applyTasks, applyTemplateFactory } from '../utils'
import type { DatabaseOrmGeneratorSchema } from './schema'

function getDatabaseOrmDetails (orm: string): { folder: string, dependencies: Record<string, string> } {
  switch (orm) {
  case Database.TYPEORM:
    return { folder: Database.TYPEORM, dependencies: DEPENDENCIES_TYPEORM }

  case Database.MONGOOSE:
    return { folder: Database.MONGOOSE, dependencies: DEPENDENCIES_MONGOOSE }

  default:
    return
  }
}

// @todo: project selection to add Orm-Module root import
export default async function databaseOrmGenerator (tree: Tree, options: DatabaseOrmGeneratorSchema): Promise<GeneratorCallback> {
  const tasks: GeneratorCallback[] = []
  const applyTemplate = applyTemplateFactory(tree)
  const scope = getNpmScope(tree)
  const libraryName = names(options.name).fileName
  const importPath = options?.importPath ?? `@${scope}/${libraryName}`

  const templateContext = {
    ...options,
    packageScope: scope ? importPath : libraryName
  }

  const libRoot = readNxJson(tree)?.workspaceLayout?.libsDir ?? 'libs'
  const projectRoot = join(libRoot, libraryName)
  const databaseOrm = getDatabaseOrmDetails(options.database)

  if (!databaseOrm) {
    output.error({ title: '[Database] Missing orm config' })

    return
  }

  output.log({
    title: '[Database] Applying templates',
    bodyLines: ['Update files ...', 'Creating template files...', 'Creating folders...']
  })

  addProjectConfiguration(tree, libraryName, {
    root: projectRoot,
    sourceRoot: join(projectRoot, 'src'),
    projectType: ProjectType.Library,
    tags: [],
    targets: {}
  })

  applyTemplate(['database-orm', 'files', databaseOrm.folder], templateContext, projectRoot)

  await formatFiles(tree)

  addTsConfigPath(tree, importPath, [join(projectRoot, 'src', 'index.ts')])
  addTsConfigPath(tree, `${importPath}/*`, [join(projectRoot, 'src', '*')])

  // dependencies and scripts
  if (!options.skipPackageJson) {
    output.log({ title: '[Database] Updating package.json', bodyLines: ['Add scripts ....', 'Add dependencies ...'] })

    updateJson(tree, 'package.json', (content) => {
      Object.assign(content, {
        scripts: {
          ...content.scripts ?? {},
          ...SCRIPTS
        }
      })

      return content
    })

    tasks.push(addDependenciesToPackageJson(tree, databaseOrm.dependencies, {}))
  }

  updateJson(tree, 'nx.json', (content) => {
    content.integration = {
      ...content.integration ?? {},
      orm: {
        database: options.database,
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
