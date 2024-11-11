import type { GeneratorCallback, Tree } from '@nx/devkit'
import { addDependenciesToPackageJson, addProjectConfiguration, formatFiles, names, output, readNxJson, updateJson } from '@nx/devkit'
import { addTsConfigPath } from '@nx/js'
import { ProjectType } from '@nx/workspace'
import { getNpmScope } from '@nx/workspace/src/utilities/get-import-path'
import { prompt } from 'enquirer'
import { join } from 'node:path'
import { YAMLMap, YAMLSeq } from 'yaml'

import { Database, DatabaseOrm } from '../../constant'
import { SERVICE_NAME as NX_SERVICE_NAME } from '../../constant/application'
import {
  DEPENDENCIES_MONGOOSE,
  DEPENDENCIES_TYPEORM,
  DEPENDENCIES_TYPEORM_MYSQL,
  DEPENDENCIES_TYPEORM_POSTGRES,
  DOCKER_DB_SERVICE,
  DOCKER_SERVICE_NAME
} from '../../constant/database-orm'
import { applyTasks, applyTemplateFactory, updateYaml } from '../../utils'
import type { DatabaseOrmGeneratorSchema } from './schema'

interface GenerateOptions extends DatabaseOrmGeneratorSchema {
  scope: string
  libraryName: string
  importPath: string
  packageScope: string
  libRoot: string
  projectRoot: string
  databaseOrmDetails: { folder: string, dependencies: Record<string, string> }
}

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

export default async function databaseOrmGenerator (tree: Tree, options: DatabaseOrmGeneratorSchema): Promise<GeneratorCallback> {
  const generateOptions: GenerateOptions = options as GenerateOptions

  const tasks: GeneratorCallback[] = []
  const applyTemplate = applyTemplateFactory(tree, __dirname)

  generateOptions.scope = getNpmScope(tree)

  generateOptions.libraryName = names(generateOptions.name).fileName
  generateOptions.importPath = generateOptions?.importPath ?? `@${generateOptions.scope}/${generateOptions.libraryName}`
  generateOptions.packageScope = generateOptions.scope ? generateOptions.importPath : generateOptions.libraryName

  await promptDatabase(generateOptions)

  generateOptions.libRoot = readNxJson(tree)?.workspaceLayout?.libsDir ?? 'libs'
  generateOptions.projectRoot = join(generateOptions.libRoot, generateOptions.libraryName)
  generateOptions.databaseOrmDetails = getDatabaseOrmDetails(generateOptions.databaseOrm, generateOptions.database)

  if (!generateOptions.databaseOrm) {
    output.error({ title: '[Database] Missing orm config' })

    return
  }

  const integration = (readNxJson(tree) as any)?.integration?.orm

  if (integration && (integration.database !== generateOptions.databaseOrm || integration.system && integration.system !== generateOptions.database)) {
    output.error({ title: `[Application] Invalid database config. "${integration.database}-${integration.system}" already configured.` })

    return
  }

  output.log({
    title: '[Database] Applying templates',
    bodyLines: ['Update files ...', 'Creating template files...', 'Creating folders...']
  })

  if (!generateOptions.update) {
    addProjectConfiguration(tree, generateOptions.libraryName, {
      root: generateOptions.projectRoot,
      sourceRoot: join(generateOptions.projectRoot, 'src'),
      projectType: ProjectType.Library,
      tags: [],
      targets: {}
    })

    applyTemplate(['files', generateOptions.databaseOrmDetails.folder], generateOptions, generateOptions.projectRoot)

    addTsConfigPath(tree, generateOptions.importPath, [join(generateOptions.projectRoot, 'src', 'index.ts')])
    addTsConfigPath(tree, `${generateOptions.importPath}/*`, [join(generateOptions.projectRoot, 'src', '*')])
  }

  await formatFiles(tree)

  // dependencies and scripts
  updatePackageJson(tree, generateOptions, tasks)

  updateJson(tree, 'nx.json', (content) => {
    content.integration = {
      ...content.integration ?? {},
      orm: {
        database: generateOptions.databaseOrm,
        system: generateOptions.database,
        projectRoot: generateOptions.projectRoot,
        importPath: generateOptions.importPath
      }
    }

    return content
  })

  if (generateOptions.database !== Database.OTHER) {
    if (tree.exists('service-docker-compose.yml')) {
      updateYaml(tree, 'service-docker-compose.yml', (content) => {
        if (!content.has('services')) {
          content.add({ key: 'services', value: new YAMLMap() })
        }

        if (!content.hasIn(['services', DOCKER_SERVICE_NAME])) {
          content.addIn(['services'], { key: DOCKER_SERVICE_NAME, value: DOCKER_DB_SERVICE[options.database] })
        }
      })
    }

    if (tree.exists('docker-compose.yml')) {
      updateYaml(tree, 'docker-compose.yml', (content) => {
        if (!content.hasIn(['services', NX_SERVICE_NAME, 'depends_on'])) {
          content.addIn(['services', NX_SERVICE_NAME], { key: 'depends_on', value: new YAMLSeq() })
        }

        const dependsOn: YAMLSeq = content.getIn(['services', NX_SERVICE_NAME, 'depends_on']) as YAMLSeq

        if (!dependsOn.items.find((item: any) => item.value === DOCKER_SERVICE_NAME)) {
          content.addIn(['services', NX_SERVICE_NAME, 'depends_on'], DOCKER_SERVICE_NAME)
        }
      })
    }
  }

  if (tree.exists(join(generateOptions.libRoot, '.gitkeep'))) {
    tree.delete(join(generateOptions.libRoot, '.gitkeep'))
  }

  return applyTasks(tasks)
}

async function promptDatabase (options: GenerateOptions): Promise<void> {
  if (options.databaseOrm === DatabaseOrm.TYPEORM) {
    options.database ??= (
      await prompt<{ database?: Database }>({
        type: 'autocomplete',
        name: 'database',
        message: 'Please select a database:',
        choices: [Database.MYSQL, Database.POSTGRES, Database.OTHER]
      })
    ).database
  } else if (options.databaseOrm === DatabaseOrm.MONGOOSE) {
    options.database = Database.MONGO
  }
}

function updatePackageJson (tree: Tree, options: GenerateOptions, tasks: GeneratorCallback[]): void {
  if (!options.skipPackageJson) {
    output.log({ title: '[Database] Updating package.json', bodyLines: ['Add scripts ...', 'Add dependencies ...'] })

    tasks.push(addDependenciesToPackageJson(tree, options.databaseOrmDetails.dependencies, {}))
  }
}
