import type { GeneratorCallback, Tree } from '@nx/devkit'
import { addDependenciesToPackageJson, addProjectConfiguration, formatFiles, names, output, readNxJson, updateJson } from '@nx/devkit'
import { addTsConfigPath } from '@nx/js'
import { ProjectType } from '@nx/workspace'
import { getNpmScope } from '@nx/workspace/src/utilities/get-import-path'
import { prompt } from 'enquirer'
import { join } from 'node:path'

import { Database, DatabaseOrm } from '../../constant'
import { DEPENDENCIES_MONGOOSE, DEPENDENCIES_TYPEORM, DEPENDENCIES_TYPEORM_MYSQL, DEPENDENCIES_TYPEORM_POSTGRES, SCRIPTS } from '../../constant/database-orm'
import { applyTasks, applyTemplateFactory } from '../../utils'
import type { DatabaseOrmGeneratorSchema } from './schema'

function getDatabaseOrmDetails (orm: DatabaseOrm, database?: Database): { folder: string, dependencies: Record<string, string> } {
  switch (orm) {
  case DatabaseOrm.TYPEORM:
    if (database === Database.MYSQL) {
      return { folder: DatabaseOrm.TYPEORM, dependencies: DEPENDENCIES_TYPEORM_MYSQL }
    } else if (database === Database.POSTGRES) {
      return { folder: DatabaseOrm.TYPEORM, dependencies: DEPENDENCIES_TYPEORM_POSTGRES }
    } else {
      return { folder: DatabaseOrm.TYPEORM, dependencies: DEPENDENCIES_TYPEORM }
    }

  case DatabaseOrm.MONGOOSE:
    return { folder: DatabaseOrm.MONGOOSE, dependencies: DEPENDENCIES_MONGOOSE }

  default:
    return
  }
}

// @todo: project selection to add Orm-Module root import
export default async function databaseOrmGenerator (tree: Tree, options: DatabaseOrmGeneratorSchema): Promise<GeneratorCallback> {
  const tasks: GeneratorCallback[] = []
  const applyTemplate = applyTemplateFactory(tree, __dirname)
  const scope = getNpmScope(tree)
  const libraryName = names(options.name).fileName
  const importPath = options?.importPath ?? `@${scope}/${libraryName}`

  const templateContext = {
    ...options,
    packageScope: scope ? importPath : libraryName
  }

  if (options.databaseOrm === DatabaseOrm.TYPEORM) {
    options.database ??= (
      await prompt<{ database?: Database }>({
        type: 'autocomplete',
        name: 'database',
        message: 'Please select a database:',
        choices: [...Object.values(Database), 'other']
      })
    ).database
  }

  const libRoot = readNxJson(tree)?.workspaceLayout?.libsDir ?? 'libs'
  const projectRoot = join(libRoot, libraryName)
  const databaseOrm = getDatabaseOrmDetails(options.databaseOrm)

  if (!databaseOrm) {
    output.error({ title: '[Database] Missing orm config' })

    return
  }

  const integration = (readNxJson(tree) as any)?.integration?.orm

  if (integration && (integration.database !== options.databaseOrm || integration.system && integration.system !== options.database)) {
    output.error({ title: `[Application] Invalid database config. "${integration.database}-${integration.system}" already configured.` })

    return
  }

  output.log({
    title: '[Database] Applying templates',
    bodyLines: ['Update files ...', 'Creating template files...', 'Creating folders...']
  })

  if (!options.update) {
    addProjectConfiguration(tree, libraryName, {
      root: projectRoot,
      sourceRoot: join(projectRoot, 'src'),
      projectType: ProjectType.Library,
      tags: [],
      targets: {}
    })

    applyTemplate(['files', databaseOrm.folder], templateContext, projectRoot)

    addTsConfigPath(tree, importPath, [join(projectRoot, 'src', 'index.ts')])
    addTsConfigPath(tree, `${importPath}/*`, [join(projectRoot, 'src', '*')])
  }

  await formatFiles(tree)

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
        database: options.databaseOrm,
        system: options.database,
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
