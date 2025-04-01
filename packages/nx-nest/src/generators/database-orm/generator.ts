import type { GeneratorCallback, Tree } from '@nx/devkit'
import { addDependenciesToPackageJson, addProjectConfiguration, formatFiles, names, output, OverwriteStrategy, readNxJson, readProjectConfiguration, updateJson } from '@nx/devkit'
import { addTsConfigPath } from '@nx/js'
import { ProjectType } from '@nx/workspace'
import { getNpmScope } from '@nx/workspace/src/utilities/get-import-path'
import { join } from 'node:path'
import { readJson } from 'nx/src/generators/utils/json'
import { YAMLMap, YAMLSeq } from 'yaml'

import { componentMetaData, Database, DatabaseOrm } from '../../constant'
import { SERVICE_NAME as NX_SERVICE_NAME } from '../../constant/application'
import {
  DEPENDENCIES_MONGOOSE,
  DEPENDENCIES_TYPEORM,
  DEPENDENCIES_TYPEORM_MYSQL,
  DEPENDENCIES_TYPEORM_POSTGRES,
  DOCKER_DB_SERVICE,
  DOCKER_SERVICE_NAME
} from '../../constant/database-orm'
import { DATABASE_CONFIG_KEY, getDatabaseConfig } from '../../constant/database-orm/config'
import {
  addImport,
  addModuleDecoratorImport,
  applyTasks,
  applyTemplateFactory,
  promptDatabase,
  promptDatabaseOrm,
  promptProjectMultiselect,
  updateConfigFiles,
  updateSourceFile,
  updateYaml
} from '../../utils'
import type { DatabaseOrmGeneratorSchema } from './schema'

interface GenerateOptions extends DatabaseOrmGeneratorSchema {
  scope: string
  libraryName: string
  importPath: string
  packageScope: string
  libRoot: string
  projectRoot: string
  databaseOrmDetails: { folder: string, dependencies: Record<string, string> }
  updateApplications: string[]
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
  const applyTemplate = applyTemplateFactory(tree, __dirname, { overwriteStrategy: OverwriteStrategy.KeepExisting })

  generateOptions.scope = getNpmScope(tree)

  generateOptions.libraryName = names(generateOptions.name).fileName
  generateOptions.importPath = generateOptions?.importPath ?? `@${generateOptions.scope}/${generateOptions.libraryName}`
  generateOptions.packageScope = generateOptions.scope ? generateOptions.importPath : generateOptions.libraryName
  generateOptions.libRoot = readNxJson(tree)?.workspaceLayout?.libsDir ?? 'libs'
  generateOptions.projectRoot = join(generateOptions.libRoot, generateOptions.libraryName)

  const integration = (readNxJson(tree) as any)?.integration?.orm

  if (integration) {
    generateOptions.orm = integration.database
    generateOptions.database = integration.system
  }

  generateOptions.orm ??= await promptDatabaseOrm()

  if (!generateOptions.orm) {
    output.error({ title: '[Database] Missing orm config' })

    return
  }

  if (generateOptions.orm === DatabaseOrm.TYPEORM) {
    generateOptions.database ??= await promptDatabase()
  } else if (generateOptions.orm === DatabaseOrm.MONGOOSE) {
    generateOptions.database = Database.MONGO
  }

  generateOptions.databaseOrmDetails = getDatabaseOrmDetails(generateOptions.orm, generateOptions.database)

  output.log({
    title: '[Database] Applying templates',
    bodyLines: ['Update files ...', 'Creating template files...', 'Creating folders...']
  })

  if (!generateOptions.update && !tree.exists(generateOptions.projectRoot)) {
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

  await updateConfigAndApplication(tree, generateOptions)

  await formatFiles(tree)

  // dependencies and scripts
  updatePackageJson(tree, generateOptions, tasks)

  updateJson(tree, 'nx.json', (content) => {
    content.integration = {
      ...content.integration ?? {},
      orm: {
        database: generateOptions.orm,
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

          if (generateOptions.database === Database.MONGO) {
            applyTemplate(['files', 'docker'], generateOptions, '.docker')
          }
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

function updatePackageJson (tree: Tree, options: GenerateOptions, tasks: GeneratorCallback[]): void {
  if (!options.skipPackageJson) {
    output.log({ title: '[Database] Updating package.json', bodyLines: ['Add scripts ...', 'Add dependencies ...'] })

    tasks.push(addDependenciesToPackageJson(tree, options.databaseOrmDetails.dependencies, {}))
  }
}

async function updateConfigAndApplication (tree: Tree, options: GenerateOptions): Promise<void> {
  // prompt, if not called by application generator, which applications should be updated
  if (!options.updateApplications?.length) {
    options.updateApplications = await promptProjectMultiselect(tree, `Please select the project which should include ${options.orm}:`)
  }

  if (options.updateApplications?.length) {
    output.log({ title: '[Database] Updating applications', bodyLines: options.updateApplications })

    for (const application of options.updateApplications) {
      const databaseConfig = getDatabaseConfig(options)

      if (!databaseConfig) {
        break
      }

      const project = readProjectConfiguration(tree, application)

      // update config files
      updateConfigFiles(tree, project.root, DATABASE_CONFIG_KEY, databaseConfig.defaultConfig, databaseConfig.environmentConfig)
      const projectJson = readJson(tree, join(project.root, 'project.json'))

      // update application module
      for (const component of projectJson?.integration?.nestjs?.components ?? []) {
        const componentMeta = componentMetaData[component]

        if (componentMeta) {
          updateSourceFile(tree, join(project.sourceRoot, componentMeta.folder, `${componentMeta.folder}.module.ts`), (file) => {
            addModuleDecoratorImport(file, `${componentMeta.className}Module`, databaseConfig.forRoot)
            addImport(file, databaseConfig.moduleClass, databaseConfig.importPath)
            addImport(file, 'getDatabaseOptions', options.importPath)

            return file
          })
        }
      }
    }
  }
}
