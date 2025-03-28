import type { GeneratorCallback, Tree } from '@nx/devkit'
import { addDependenciesToPackageJson, addProjectConfiguration, getPackageManagerCommand, names, readNxJson, updateJson } from '@nx/devkit'
import { output, ProjectType } from '@nx/workspace'
import { getNpmScope } from '@nx/workspace/src/utilities/get-import-path'
import { join } from 'node:path'
import { execCommand } from 'nx/src/command-line/release/utils/exec-command'
import { readJson } from 'nx/src/generators/utils/json'

import { Component, Database, DatabaseOrm, getComponentMetadata, NODE_VERSION } from '../../constant'
import {
  BACKGROUND_TASK_DEPENDENCIES,
  COMMAND_DEPENDENCIES,
  DEPENDENCIES,
  DEV_DEPENDENCIES,
  IMPLICIT_DEPENDENCIES,
  MICROSERVICE_DEPENDENCIES,
  SERVER_DEPENDENCIES
} from '../../constant/application'
import { JEST_DEPENDENCIES } from '../../constant/jest'
import type { ApplyTemplate } from '../../utils'
import { addClassProperty, addEnumMember, addImport, addIndexExport, applyTasks, applyTemplateFactory, updateSourceFile, updateYaml } from '../../utils'
import databaseLibraryGenerator from '../database-orm/generator'
import databaseTargetGenerator from '../database-target/generator'
import microserviceProviderGenerator from '../microservice-provider/generator'
import type { ApplicationGeneratorSchema } from './schema'
import { addPlugin } from './utils'

interface GenerateOptions extends ApplicationGeneratorSchema {
  scope: string
  packageScope: string
  projectNames: {
    name: string
    className: string
    propertyName: string
    constantName: string
    fileName: string
  }
  projectName: string
  appRoot: string
  projectRoot: string
}

// eslint-disable-next-line complexity
export default async function applicationGenerator (tree: Tree, options: ApplicationGeneratorSchema): Promise<GeneratorCallback> {
  const generateOptions: GenerateOptions = options as GenerateOptions

  validateComponents(generateOptions)

  if (!generateOptions.components?.length) {
    output.error({ title: '[Application] At least one component must be selected' })

    return
  }

  const tasks: GeneratorCallback[] = []
  const applyTemplate = applyTemplateFactory(tree, __dirname)

  generateOptions.scope = getNpmScope(tree)
  generateOptions.projectNames = names(generateOptions.name)
  generateOptions.projectName = generateOptions.projectNames.fileName
  generateOptions.packageScope = generateOptions.scope ? `@${generateOptions.scope}/${generateOptions.projectNames.fileName}` : generateOptions.projectNames.fileName

  const applicationMetadata = getComponentMetadata(generateOptions.components)
  const templateContext: Record<string, any> = {
    ...generateOptions,
    isServer: generateOptions.components.includes(Component.SERVER),
    isBgTask: generateOptions.components.includes(Component.BG_TASK),
    includeMessageQueue: generateOptions.components.includes(Component.MICROSERVICE) || generateOptions.microserviceProvider,
    applicationMetadata,
    NODE_VERSION,
    COMPONENT: Component,
    DATABASE_ORM: DatabaseOrm,
    DATABASE: Database
  }

  generateOptions.appRoot = readNxJson(tree)?.workspaceLayout?.appsDir ?? 'apps'
  generateOptions.projectRoot = join(generateOptions.appRoot, generateOptions.projectNames.fileName)

  generateMicroserviceServer(tree, generateOptions, templateContext, applyTemplate)

  /**
   * TEMPLATES
   */
  output.log({
    title: '[Application] Applying templates',
    bodyLines: ['Update files ...', 'Creating template files...', 'Creating folders...']
  })

  if (!options.update) {
    addProjectConfiguration(tree, generateOptions.name, {
      root: generateOptions.projectRoot,
      sourceRoot: join(generateOptions.projectRoot, 'src'),
      projectType: ProjectType.Application,
      tags: [],
      targets: {}
    })

    applyTemplate(['files', 'base'], templateContext, generateOptions.projectRoot)
  }

  // component-specific folder
  for (const component of applicationMetadata) {
    applyTemplate(['files', component.folder], templateContext, join(generateOptions.projectRoot, 'src', component.folder))
  }

  if (applicationMetadata.length > 1) {
    applyTemplate(['files', 'multi-application'], templateContext, generateOptions.projectRoot)
  } else {
    applyTemplate(['files', 'single-application'], templateContext, generateOptions.projectRoot)
  }

  updatePackageJson(tree, generateOptions, tasks)

  setupJest(tree, generateOptions, templateContext, applyTemplate, tasks)

  // custom integration metadata
  setProjectTargets(tree, generateOptions)
  setNxJsonPluginsAndDefaults(tree)

  await generateMspLib(tree, generateOptions, templateContext, tasks)
  await generateDatabaseLib(tree, generateOptions, templateContext, tasks)

  if (options.components.includes(Component.BG_TASK) && options.databaseOrm !== DatabaseOrm.NONE) {
    await databaseTargetGenerator(tree, { project: generateOptions.projectName })
  }

  updateGitlabCI(tree, generateOptions.projectNames)

  if (tree.exists(join(generateOptions.appRoot, '.gitkeep'))) {
    tree.delete(join(generateOptions.appRoot, '.gitkeep'))
  }

  output.log({ title: '[Application] Post-Processing ...' })

  return applyTasks(tasks)
}

// validate and map component names (validate manually typed components if not using the interactive input)
function validateComponents (options: GenerateOptions): void {
  const validatedComponents: GenerateOptions['components'] = []
  const componentMap: Record<string, string> = Object.fromEntries(Object.entries(Component).map(([key, value]) => [value, key]))
  const asComponent = (key: string): Component => Component[componentMap[key]]

  for (let i = 0, l = options.components?.length ?? 0; i < l; ++i) {
    const componentString = options.components[i].toLowerCase()
    let c: Component

    if (componentString === 'cli') {
      c = Component.COMMAND
    } else {
      c = asComponent(componentString)
    }

    if (c) {
      validatedComponents.push(c)
    }
  }

  options.components = validatedComponents
}

async function generateDatabaseLib (tree: Tree, options: GenerateOptions, context: Record<string, any>, tasks: GeneratorCallback[]): Promise<void> {
  if (options.databaseOrm !== DatabaseOrm.NONE) {
    const databaseIntegration = (readNxJson(tree) as any)?.integration?.orm

    output.log({ title: '[Application] Setup database-orm util library ...' })

    const databaseLib = await databaseLibraryGenerator(tree, {
      databaseOrm: options.databaseOrm,
      database: options.database ?? databaseIntegration?.system,
      name: 'database',
      skipPackageJson: options.skipPackageJson,
      update: !!databaseIntegration,
      updateApplicationsRoot: [options.projectRoot]
    })

    if (!databaseLib) {
      return
    }

    tasks.push(databaseLib)

    context.orm = (readNxJson(tree) as any)?.integration?.orm
    context.database = context.orm.system
  }
}

async function generateMspLib (tree: Tree, options: GenerateOptions, context, tasks: GeneratorCallback[]): Promise<void> {
  if (options.components?.includes(Component.MICROSERVICE) || options.microserviceProvider) {
    const microserviceProvider = (readNxJson(tree) as any)?.integration?.msp

    if (!microserviceProvider) {
      output.log({ title: '[Application] Setup microservice-provider util library ...' })

      const mspLib = await microserviceProviderGenerator(tree, {
        name: 'microservice-provider',
        skipPackageJson: options.skipPackageJson,
        updateApplicationsRoot: [options.projectRoot]
      })

      if (!mspLib) {
        return
      }

      tasks.push(mspLib)
    }

    context.msp = (readNxJson(tree) as any)?.integration?.msp
  }
}

function generateMicroserviceServer (tree: Tree, options: ApplicationGeneratorSchema, context, applyTemplate): void {
  if (options.components?.includes(Component.MICROSERVICE)) {
    const mspLib = (readNxJson(tree) as any)?.integration?.msp.projectRoot

    if (!mspLib) {
      output.warn({
        title: '[Application] Cannot update Microservice Provider',
        bodyLines: ['Missing folder information in nx.json integration', 'New queue, interface and pattern will not be created automatically']
      })
    } else {
      applyTemplate(['files', 'microservice-queue'], context, join(mspLib, 'src'))

      updateSourceFile(tree, join(mspLib, 'src', 'interfaces', 'index.ts'), (file) => {
        addIndexExport(file, `./${context.projectNames.fileName}.interface`)
      })
      updateSourceFile(tree, join(mspLib, 'src', 'patterns', 'index.ts'), (file) => {
        addIndexExport(file, `./${context.projectNames.fileName}.pattern`)
      })
      updateSourceFile(tree, join(mspLib, 'src', 'microservice-provider.constants.ts'), (file) => {
        addEnumMember(file, 'MessageQueues', context.projectNames.constantName, context.projectNames.constantName)
        addImport(file, `${context.projectNames.className}Pattern`, './patterns')
        addClassProperty(file, 'MessageQueuePatterns', `[MessageQueues.${context.projectNames.constantName}]`, `${context.projectNames.className}Pattern`)
        addImport(file, `${context.projectNames.className}Message`, './interfaces')
        addClassProperty(file, 'MessageQueueMap', `[MessageQueues.${context.projectNames.constantName}]`, `${context.projectNames.className}Message`)
      })
    }
  }
}

function updatePackageJson (tree: Tree, options: GenerateOptions, tasks: GeneratorCallback[]): void {
  if (!options.skipPackageJson) {
    const dependencies = { ...DEPENDENCIES }

    if (options.components?.includes(Component.SERVER)) {
      Object.assign(dependencies, SERVER_DEPENDENCIES)
    }

    if (options.components?.includes(Component.MICROSERVICE) || options.microserviceProvider) {
      Object.assign(dependencies, MICROSERVICE_DEPENDENCIES)
    }

    if (options.components?.includes(Component.BG_TASK)) {
      Object.assign(dependencies, BACKGROUND_TASK_DEPENDENCIES)
    }

    if (options.components?.includes(Component.COMMAND)) {
      Object.assign(dependencies, COMMAND_DEPENDENCIES)
    }

    tasks.push(addDependenciesToPackageJson(tree, dependencies, DEV_DEPENDENCIES))
    updateJson(tree, 'package.json', (content) => {
      content.scripts.start ??= 'nx run-many -t serve --parallel 100'
      content.scripts['start:one'] ??= 'nx serve'
      content.scripts.build ??= 'nx run-many -t build'
      content.scripts['build:one'] ??= 'nx build'
      content.scripts['build:nocache'] ??= 'nx run-many -t build --skip-nx-cache'

      if (options.components.includes(Component.COMMAND)) {
        content.scripts['command:one'] ??= 'nx command'

        if (options.databaseOrm !== DatabaseOrm.NONE) {
          content.scripts.seed ??= `nx command ${options.projectName} seed`
        }
      }

      return content
    })

    updateJson(tree, join(options.projectRoot, 'package.json'), (content) => {
      for (const component of options.components) {
        /* eslint-disable @typescript-eslint/indent,@typescript-eslint/padding-line-between-statements,indent*/
        switch (component) {
          case Component.SERVER:
          case Component.BG_TASK:
          case Component.MICROSERVICE:
            content.scripts.start ??= `node ./${options.projectRoot}/src/main.js`
            break

          case Component.COMMAND:
            content.scripts.command ??= `NODE_SERVICE='cli' node ./${options.projectRoot}/src/main.js`
            break
        }
        /* eslint-enable*/
      }

      return content
    })

    const rootDependencies = readJson(tree, 'package.json')?.dependencies ?? {}
    const projectDependencies = Object.fromEntries(IMPLICIT_DEPENDENCIES.map((dependency) => [dependency, rootDependencies[dependency]]).filter((dependency) => !!dependency[1]))

    addDependenciesToPackageJson(tree, projectDependencies, {}, join(options.projectRoot, 'package.json'))

    // does not work in workspace preset, so here it is now
    // (workspace creation does git init as last step, so we cannot access .git in the preset)
    tasks.push(async () => {
      output.log({
        title: '[Git] setup hooks',
        bodyLines: [await execCommand(getPackageManagerCommand().exec, ['simple-git-hooks'], { cwd: tree.root })]
      })
    })
  }
}

function setupJest (tree: Tree, options: GenerateOptions, context: Record<string, any>, applyTemplate: ApplyTemplate, tasks: GeneratorCallback[]): void {
  if (options.jest) {
    output.log({
      title: '[Application] Setup jest',
      bodyLines: ['Add config files ...', !options.skipPackageJson ? 'Add dependencies ...' : '']
    })

    applyTemplate(['files', 'jest', 'preset'], context)
    applyTemplate(['files', 'jest', 'files'], context, options.projectRoot)

    if (options.components.includes(Component.SERVER)) {
      applyTemplate(['files', 'jest', 'e2e', 'preset'], context)
      applyTemplate(['files', 'jest', 'e2e', 'files'], context, options.projectRoot)

      if (!options.skipPackageJson) {
        updateJson(tree, 'package.json', (content) => {
          content.scripts['test:e2e'] = 'nx run-many -t e2e --parallel 10'
          content.scripts['test:e2e:one'] = 'nx e2e'

          return content
        })
      }
    }

    if (!options.skipPackageJson) {
      tasks.push(addDependenciesToPackageJson(tree, {}, JEST_DEPENDENCIES))
      updateJson(tree, 'package.json', (content) => {
        content.scripts.test = 'nx run-many -t test --parallel 10'
        content.scripts['test:one'] = 'nx test'

        return content
      })
    }
  }
}

function setProjectTargets (tree: Tree, options: GenerateOptions): void {
  updateJson(tree, join(options.projectRoot, 'project.json'), (content) => {
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

    content.integration = {
      nestjs: {
        components: options.components
      }
    }

    return content
  })
}

function setNxJsonPluginsAndDefaults (tree: Tree): void {
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
}

function updateGitlabCI (tree: Tree, projectNames: GenerateOptions['projectNames']): void {
  // update gitlab-ci
  if (tree.exists('.gitlab-ci.yml')) {
    updateYaml(tree, '.gitlab-ci.yml', (content) => {
      if (!content.has(projectNames.fileName)) {
        const configName = content.createNode(projectNames.fileName)
        const configContent = content.createNode({
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
}
