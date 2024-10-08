import type { GeneratorCallback, Tree } from '@nx/devkit'
import { addDependenciesToPackageJson, addProjectConfiguration, formatFiles, names, readNxJson, updateJson } from '@nx/devkit'
import { output, ProjectType } from '@nx/workspace'
import { getNpmScope } from '@nx/workspace/src/utilities/get-import-path'
import { join } from 'node:path'
import { readJson } from 'nx/src/generators/utils/json'

import { Component, Database, DatabaseOrm, getComponentMetadata, NODE_VERSION } from '../../constant'
import { DEPENDENCIES, DEV_DEPENDENCIES, IMPLICIT_DEPENDENCIES } from '../../constant/application'
import { JEST_DEPENDENCIES } from '../../constant/jest'
import { addClassProperty, addEnumMember, addImport, addIndexExport, applyTasks, applyTemplateFactory, updateSourceFile, updateYaml } from '../../utils'
import databaseLibraryGenerator from '../database-orm/generator'
import microserviceProviderGenerator from '../microservice-provider/generator'
import type { ApplicationGeneratorSchema } from './schema'
import { addPlugin } from './utils'

// eslint-disable-next-line complexity
export default async function applicationGenerator (tree: Tree, options: ApplicationGeneratorSchema): Promise<GeneratorCallback> {
  if (!options.components?.length) {
    output.error({ title: '[Application] At least one component must be selected' })

    return
  }

  const tasks: GeneratorCallback[] = []
  const applyTemplate = applyTemplateFactory(tree, __dirname)
  const scope = getNpmScope(tree)
  const projectNames = names(options.name)

  const applicationMetadata = getComponentMetadata(options.components)
  const templateContext: Record<string, any> = {
    ...options,
    isServer: options.components.includes(Component.SERVER),
    isBgTask: options.components.includes(Component.BG_TASK),
    includeMessageQueue: options.components.includes(Component.MICROSERVICE) || options.microserviceProvider,
    applicationMetadata,
    scope,
    packageScope: scope ? `@${scope}/${projectNames.fileName}` : projectNames.fileName,
    projectNames,
    fileName: projectNames.fileName,
    NODE_VERSION,
    COMPONENT: Component,
    DATABASE_ORM: DatabaseOrm,
    DATABASE: Database
  }

  const appRoot = readNxJson(tree)?.workspaceLayout?.appsDir ?? 'apps'
  const projectRoot = join(appRoot, projectNames.fileName)

  /**
   * DATABASE
   */
  if (options.databaseOrm !== DatabaseOrm.NONE) {
    const databaseIntegration = (readNxJson(tree) as any)?.integration?.orm

    output.log({ title: '[Application] Setup database-orm util library ...' })

    const databaseLib = await databaseLibraryGenerator(tree, {
      databaseOrm: options.databaseOrm,
      database: options.database ?? databaseIntegration?.system,
      name: 'database',
      skipPackageJson: options.skipPackageJson,
      update: !!databaseIntegration
    })

    if (!databaseLib) {
      return
    }

    tasks.push(databaseLib)

    templateContext.orm = (readNxJson(tree) as any)?.integration?.orm
    templateContext.database = templateContext.orm.system
  }

  /**
   * MICROSERVICE
   */
  if (options.components?.includes(Component.MICROSERVICE) || options.microserviceProvider) {
    const microserviceProvider = (readNxJson(tree) as any)?.integration?.msp

    if (!microserviceProvider) {
      output.log({ title: '[Application] Setup microservice-provider util library ...' })

      const mspLib = await microserviceProviderGenerator(tree, {
        name: 'microservice-provider',
        skipPackageJson: options.skipPackageJson
      })

      if (!mspLib) {
        return
      }

      tasks.push(mspLib)
    }

    templateContext.msp = (readNxJson(tree) as any)?.integration?.msp
  }

  if (options.components?.includes(Component.MICROSERVICE)) {
    const mspLib = (readNxJson(tree) as any)?.integration?.msp.projectRoot

    if (!mspLib) {
      output.warn({
        title: '[Application] Cannot update Microservice Provider',
        bodyLines: ['Missing folder information in nx.json integration', 'New queue, interface and pattern will not be created automatically']
      })
    } else {
      applyTemplate(['files', 'microservice-queue'], templateContext, join(mspLib, 'src'))

      updateSourceFile(tree, join(mspLib, 'src', 'interfaces', 'index.ts'), (file) => {
        addIndexExport(file, `./${projectNames.fileName}.interface`)
      })
      updateSourceFile(tree, join(mspLib, 'src', 'patterns', 'index.ts'), (file) => {
        addIndexExport(file, `./${projectNames.fileName}.pattern`)
      })
      updateSourceFile(tree, join(mspLib, 'src', 'microservice-provider.constants.ts'), (file) => {
        addEnumMember(file, 'MessageQueues', projectNames.constantName, projectNames.constantName)
        addImport(file, `${projectNames.className}Pattern`, './patterns')
        addClassProperty(file, 'MessageQueuePatterns', `[MessageQueues.${projectNames.constantName}]`, `${projectNames.className}Pattern`)
        addImport(file, `${projectNames.className}Message`, './interfaces')
        addClassProperty(file, 'MessageQueueMap', `[MessageQueues.${projectNames.constantName}]`, `${projectNames.className}Message`)
      })
    }
  }

  /**
   * TEMPLATES
   */
  output.log({
    title: '[Application] Applying templates',
    bodyLines: ['Update files ...', 'Creating template files...', 'Creating folders...']
  })

  if (!options.update) {
    addProjectConfiguration(tree, options.name, {
      root: projectRoot,
      sourceRoot: join(projectRoot, 'src'),
      projectType: ProjectType.Application,
      tags: [],
      targets: {}
    })

    applyTemplate(['files', 'base'], templateContext, projectRoot)
  }

  // component-specific folder
  for (const component of applicationMetadata) {
    applyTemplate(['files', component.folder], templateContext, join(projectRoot, 'src', component.folder))
  }

  if (applicationMetadata.length > 1) {
    applyTemplate(['files', 'multi-application'], templateContext, projectRoot)
  } else {
    applyTemplate(['files', 'single-application'], templateContext, projectRoot)
  }

  await formatFiles(tree)

  if (!options.skipPackageJson) {
    tasks.push(addDependenciesToPackageJson(tree, DEPENDENCIES, DEV_DEPENDENCIES))
    updateJson(tree, 'package.json', (content) => {
      content.scripts.start ??= 'nx run-many -t serve --parallel 100'
      content.scripts['start:one'] ??= 'nx serve'
      content.scripts.build ??= 'nx run-many -t build'
      content.scripts['build:one'] ??= 'nx build'
      content.scripts['build:nocache'] ??= 'nx run-many -t build --skip-nx-cache'

      if (options.components.includes(Component.COMMAND)) {
        content.scripts['command:one'] ??= 'nx command'
      }

      return content
    })

    updateJson(tree, join(projectRoot, 'package.json'), (content) => {
      for (const component of options.components) {
        /* eslint-disable @typescript-eslint/indent,@typescript-eslint/padding-line-between-statements,indent*/
        switch (component) {
          case Component.SERVER:
          case Component.BG_TASK:
          case Component.MICROSERVICE:
            content.scripts.start ??= `node ./${projectRoot}/src/main.js`
            break

          case Component.COMMAND:
            content.scripts.command ??= `NODE_SERVICE='cli' node ./${projectRoot}/src/main.js`
            break
        }
        /* eslint-enable*/
      }

      return content
    })

    const rootDependencies = readJson(tree, 'package.json')?.dependencies ?? {}
    const projectDependencies = Object.fromEntries(IMPLICIT_DEPENDENCIES.map((dependency) => [dependency, rootDependencies[dependency]]).filter((dependency) => !!dependency[1]))

    addDependenciesToPackageJson(tree, projectDependencies, {}, join(projectRoot, 'package.json'))
  }

  /**
   * JEST
   */
  if (options.jest) {
    output.log({
      title: '[Application] Setup jest',
      bodyLines: ['Add config files ...', !options.skipPackageJson ? 'Add dependencies ...' : '']
    })

    applyTemplate(['files', 'jest', 'preset'], templateContext)
    applyTemplate(['files', 'jest', 'files'], templateContext, projectRoot)

    if (options.components.includes(Component.SERVER)) {
      applyTemplate(['files', 'jest', 'e2e', 'preset'], templateContext)
      applyTemplate(['files', 'jest', 'e2e', 'files'], templateContext, projectRoot)

      if (!options.skipPackageJson) {
        updateJson(tree, 'package.json', (content) => {
          content.scripts['test:e2e'] = 'nx run-many -t test -c e2e --parallel 10'
          content.scripts['test:e2e:one'] = 'nx test -c e2e'

          return content
        })
      }
    }

    await formatFiles(tree)

    if (!options.skipPackageJson) {
      tasks.push(addDependenciesToPackageJson(tree, {}, JEST_DEPENDENCIES))
      updateJson(tree, 'package.json', (content) => {
        content.scripts.test = 'nx run-many -t test --parallel 10'
        content.scripts['test:one'] = 'nx test'

        return content
      })
    }
  }

  // custom integration metadata
  updateJson(tree, join(projectRoot, 'project.json'), (content) => {
    if (options.components.includes(Component.COMMAND)) {
      content.targets = {
        ...content.targets ?? {},
        command: {
          executor: '@webundsoehne/nx-executors:run',
          options: {
            env: {
              NODE_SERVICE: 'cli'
            },
            command: 'ts-node ./src/main.ts'
          }
        }
      }
    }

    if (options.components.includes(Component.BG_TASK)) {
      if (options.databaseOrm === DatabaseOrm.TYPEORM) {
        content.targets = {
          ...content.targets ?? {},
          migration: {
            executor: '@webundsoehne/nx-executors:run',
            options: {
              tsNode: true,
              env: {
                TYPEORM_DATASOURCE: '../../libs/database/src/database/orm.config.ts'
              }
            },
            configurations: {
              show: {
                command: 'typeorm migration:show -d=$TYPEORM_DATASOURCE'
              },
              run: {
                command: 'typeorm migration:run -d=$TYPEORM_DATASOURCE'
              },
              rollback: {
                command: 'typeorm migration:revert -d=$TYPEORM_DATASOURCE'
              },
              create: {
                command: 'typeorm migration:create -d=$TYPEORM_DATASOURCE'
              },
              generate: {
                command: 'typeorm migration:generate -d=$TYPEORM_DATASOURCE'
              }
            }
          }
        }
      } else if (options.databaseOrm === DatabaseOrm.MONGOOSE) {
        content.targets = {
          ...content.targets ?? {},
          migration: {
            executor: '@webundsoehne/nx-executors:run',
            options: {
              tsNode: true,
              env: {
                MONGOOSE_MIGRATE_OPTIONS: '../../libs/database/src/database/migrate-options.ts'
              }
            },
            configurations: {
              run: {
                command: 'migrate-mongo up -f $MONGOOSE_MIGRATE_OPTIONS'
              },
              rollback: {
                command: 'migrate-mongo down -f $MONGOOSE_MIGRATE_OPTIONS'
              },
              create: {
                command: 'migrate-mongo create -f $MONGOOSE_MIGRATE_OPTIONS'
              }
            }
          }
        }
      }

      if (options.databaseOrm !== DatabaseOrm.NONE) {
        content.targets = {
          ...content.targets ?? {},
          seed: {
            executor: '@webundsoehne/nx-executors:run',
            options: {
              tsNode: true,
              env: {
                NODE_SERVICE: 'cli'
              },
              command: 'ts-node ./src/main.ts seed'
            }
          },
          build: {
            options: {
              assets: [
                {
                  glob: '*.js',
                  input: 'libs/database/src/migration',
                  output: 'libs/database/src/migration'
                }
              ]
            }
          }
        }
      }
    }

    content.integration = {
      nestjs: {
        components: options.components
      }
    }

    return content
  })

  updateJson(tree, 'nx.json', (content) => {
    addPlugin(content, { plugin: '@nx/eslint/plugin', options: {} })
    addPlugin(content, '@webundsoehne/nx-executors/plugin')

    content.targetDefaults = {
      ...content.targetDefaults ?? {},
      lint: { configurations: { fix: { fix: true } } },
      serve: { options: { watchConfig: true } },
      build: {
        options: {
          assets: [
            {
              glob: '*',
              input: '{projectRoot}/config',
              output: 'config'
            },
            {
              glob: '.dockerignore',
              input: '{projectRoot}',
              output: '.'
            },
            {
              glob: 'Dockerfile',
              input: '{projectRoot}',
              output: '.'
            }
          ]
        }
      }
    }

    return content
  })

  // update gitlab-ci
  if (tree.exists('.gitlab-ci.yml')) {
    updateYaml(tree, '.gitlab-ci.yml', (content) => {
      if (!content.has(projectNames.fileName)) {
        const configName = content.createNode(projectNames.fileName)
        const configContent = content.createNode({
          key: projectNames.fileName,
          value: {
            stage: 'docker',
            extends: '.docker-build-internal',
            variables: {
              DOCKERFILE_CONTEXT: `./dist/apps/${projectNames.fileName}`,
              DOCKER_IMAGE_INTERNAL_NAME: `${projectNames.fileName}`
            },
            dependencies: ['build'],
            only: {
              changes: ['.gitlab-ci.yml', 'package.json', 'package-lock.json', 'libs/**/*', `apps/${projectNames.fileName}/**/*`],
              refs: ['main', 'develop', 'tags']
            }
          }
        })

        if (content.comment) {
          configName.commentBefore = content.comment
          content.comment = null
        } else {
          configName.spaceBefore = true
        }

        content.add({ key: configName, value: configContent })
      }
    })
  }

  if (tree.exists(join(appRoot, '.gitkeep'))) {
    tree.delete(join(appRoot, '.gitkeep'))
  }

  output.log({ title: '[Application] Post-Processing ...' })

  return applyTasks(tasks)
}
