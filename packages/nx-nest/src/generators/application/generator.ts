import { join } from 'node:path'
import type { GeneratorCallback, Tree } from '@nx/devkit'
import {
  addDependenciesToPackageJson,
  addProjectConfiguration,
  getPackageManagerCommand,
  readNxJson,
  updateJson
} from '@nx/devkit'
import { output, ProjectType } from '@nx/workspace'
import { execCommand } from 'nx/src/command-line/release/utils/exec-command'

import { Component, getComponentMetadata, NODE_VERSION } from '../../constant'
import {
  BACKGROUND_TASK_DEPENDENCIES,
  COMMAND_DEPENDENCIES,
  DEPENDENCIES,
  DEV_DEPENDENCIES,
  MICROSERVICE_DEPENDENCIES,
  SERVER_DEPENDENCIES
} from '../../constant/application'
import { JEST_DEPENDENCIES } from '../../constant/jest'
import { SCRIPTS } from '../../constant/workspace'
import {
  addEnumMember,
  addImport,
  addIndexExport,
  addPackageScripts,
  applyTasks,
  applyTemplateFactory,
  cleanupGitkeep,
  SetupGeneratorOptions,
  setupGeneratorOptions,
  updateSourceFile,
  updateYaml
} from '../../utils'
import databaseLibraryGenerator from '../database-orm/generator'
import databaseTargetGenerator from '../database-target/generator'
import microserviceProviderGenerator from '../microservice-provider/generator'
import resourceGenerator from '../resource/generator'
import type { ApplicationGeneratorSchema } from './schema'
import { addPlugin } from './utils'

type GenerateOptions = SetupGeneratorOptions<ApplicationGeneratorSchema>

export default async function applicationGenerator(
  tree: Tree,
  options: ApplicationGeneratorSchema
): Promise<GeneratorCallback> {
  const generateOptions: GenerateOptions = setupGeneratorOptions(tree, options)
  generateOptions.projectRoot = join(generateOptions.appRoot, generateOptions.projectName)

  validateComponents(generateOptions)

  if (!generateOptions.components?.length) {
    output.error({ title: '[Application] At least one component must be selected' })

    return
  }

  const tasks: GeneratorCallback[] = []
  const applyTemplate = applyTemplateFactory(tree, __dirname)

  const applicationMetadata = getComponentMetadata(generateOptions.components)
  const templateContext: Record<string, any> = {
    ...generateOptions,
    isServer: generateOptions.components.includes(Component.SERVER),
    isBgTask: generateOptions.components.includes(Component.BG_TASK),
    includeMessageQueue:
      generateOptions.components.includes(Component.MICROSERVICE) || generateOptions.microserviceProvider,
    applicationMetadata,
    // biome-ignore-start lint/style/useNamingConvention: naming
    NODE_VERSION,
    COMPONENT: Component,
    // biome-ignore-end lint/style/useNamingConvention: naming
    database: options.database
  }

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

    // component-specific folder
    for (const component of applicationMetadata) {
      applyTemplate(
        ['files', component.folder],
        templateContext,
        join(generateOptions.projectRoot, 'src', component.folder)
      )
      await resourceGenerator(tree, {
        component: component.component,
        project: generateOptions.name,
        name: 'default',
        skipInput: true
      })
    }

    updatePackageJson(tree, generateOptions, tasks)
  }

  setupJest(tree, generateOptions, templateContext, applyTemplate, tasks)

  // custom integration metadata
  setProjectTargets(tree, generateOptions)
  setNxJsonPluginsAndDefaults(tree)

  await generateMspLib(tree, generateOptions, templateContext, tasks)
  await generateDatabaseLib(tree, generateOptions, templateContext, tasks)

  generateMicroserviceServer(tree, generateOptions, templateContext, applyTemplate)

  if (options.components.includes(Component.BG_TASK) && options.database) {
    await databaseTargetGenerator(tree, { project: generateOptions.projectName })
  }

  updateGitlabCI(tree, generateOptions.projectNames)

  cleanupGitkeep(tree, generateOptions.appRoot)

  output.log({ title: '[Application] Post-Processing ...' })

  return applyTasks(tasks)
}

// validate and map component names (validate manually typed components if not using the interactive input)
function validateComponents(options: Pick<GenerateOptions, 'components'>): void {
  const validatedComponents: GenerateOptions['components'] = []
  const componentMap: Record<string, string> = Object.fromEntries(
    Object.entries(Component).map(([key, value]) => [value, key])
  )
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

async function generateDatabaseLib(
  tree: Tree,
  options: GenerateOptions,
  _context: Record<string, any>,
  tasks: GeneratorCallback[]
): Promise<void> {
  if (options.database) {
    output.log({ title: '[Application] Setup database-orm util library ...' })

    const databaseLib = await databaseLibraryGenerator(tree, {
      name: 'database',
      skipPackageJson: options.skipPackageJson,
      updateApplications: [options.projectName]
    })

    if (!databaseLib) {
      return
    }

    tasks.push(databaseLib)
  }
}

async function generateMspLib(
  tree: Tree,
  options: GenerateOptions,
  _context: Record<string, any>,
  tasks: GeneratorCallback[]
): Promise<void> {
  if (options.components?.includes(Component.MICROSERVICE) || options.microserviceProvider) {
    output.log({ title: '[Application] Setup microservice-provider util library ...' })

    const mspLib = await microserviceProviderGenerator(tree, {
      name: 'microservice-provider',
      skipPackageJson: options.skipPackageJson,
      updateApplications: [options.projectName],
      skipModuleImport: !options.microserviceProvider
    })

    if (!mspLib) {
      return
    }

    tasks.push(mspLib)
  }
}

function generateMicroserviceServer(tree: Tree, options: GenerateOptions, context, applyTemplate): void {
  if (options.components?.includes(Component.MICROSERVICE)) {
    const mspDetails = (readNxJson(tree) as any)?.integration?.msp

    if (!(mspDetails?.projectRoot && mspDetails?.importPath)) {
      output.warn({
        title: '[Application] Cannot update Microservice Provider',
        bodyLines: [
          'Missing folder information in nx.json integration',
          'New queue, interface and pattern will not be created automatically'
        ]
      })
    } else {
      applyTemplate(['files', 'microservice-queue'], context, join(mspDetails.projectRoot, 'src'))

      updateSourceFile(tree, join(mspDetails.projectRoot, 'src', 'index.ts'), (file) => {
        addIndexExport(file, `./provider/${context.projectNames.fileName}`)
      })
      updateSourceFile(tree, join(mspDetails.projectRoot, 'src', 'message-queue.enum.ts'), (file) => {
        addEnumMember(file, 'MessageQueue', context.projectNames.constantName, context.projectNames.constantName)
      })

      updateSourceFile(tree, join(options.projectRoot, 'src', 'microservice', 'init.ts'), (file) => {
        addImport(file, 'MessageQueue', mspDetails.importPath)
      })
    }
  }
}

function updatePackageJson(tree: Tree, options: GenerateOptions, tasks: GeneratorCallback[]): void {
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

    tasks.push(addDependenciesToPackageJson(tree, dependencies, DEV_DEPENDENCIES, undefined, true))

    addPackageScripts(tree, 'package.json', {
      start: SCRIPTS.start,
      'start:one': SCRIPTS['start:one'],
      build: SCRIPTS.build,
      'build:one': SCRIPTS['build:one'],
      'build:nocache': SCRIPTS['build:nocache']
    })

    if (options.components.includes(Component.COMMAND)) {
      addPackageScripts(tree, 'package.json', { 'command:one': 'nx command' })
    }

    updateJson(tree, join(options.projectRoot, 'package.json'), (content) => {
      for (const component of options.components) {
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
      }

      return content
    })

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

function setupJest(
  tree: Tree,
  options: GenerateOptions,
  context: Record<string, any>,
  applyTemplate: ReturnType<typeof applyTemplateFactory>,
  tasks: GeneratorCallback[]
): void {
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
        addPackageScripts(tree, 'package.json', {
          'test:e2e': 'nx run-many -t e2e --parallel 10',
          'test:e2e:one': 'nx e2e'
        })
      }
    }

    if (!options.skipPackageJson) {
      tasks.push(addDependenciesToPackageJson(tree, {}, JEST_DEPENDENCIES, undefined, true))
      addPackageScripts(tree, 'package.json', {
        test: 'nx run-many -t test --parallel 10',
        'test:one': 'nx test'
      })
    }
  }
}

function setProjectTargets(tree: Tree, options: GenerateOptions): void {
  updateJson(tree, join(options.projectRoot, 'project.json'), (content) => {
    if (options.components.includes(Component.COMMAND)) {
      content.targets = {
        ...(content.targets ?? {}),
        command: {
          executor: '@diamir/nx-executors:run',
          options: {
            env: {
              // biome-ignore lint/style/useNamingConvention: env-var
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

function setNxJsonPluginsAndDefaults(tree: Tree): void {
  updateJson(tree, 'nx.json', (content) => {
    addPlugin(content, '@nx/eslint/plugin')
    addPlugin(content, '@diamir/nx-executors/plugin')

    content.targetDefaults = {
      ...(content.targetDefaults ?? {}),
      lint: content.targetDefaults?.lint ?? { configurations: { fix: { fix: true } } },
      serve: content.targetDefaults?.serve ?? { options: { watchConfig: true } },
      build: content.targetDefaults?.build ?? {
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

function updateGitlabCI(tree: Tree, projectNames: GenerateOptions['projectNames']): void {
  // update gitlab-ci
  if (tree.exists('.gitlab-ci.yml')) {
    updateYaml(tree, '.gitlab-ci.yml', (content) => {
      if (!content.has(projectNames.fileName)) {
        const configName = content.createNode(projectNames.fileName)
        const configContent = content.createNode({
          stage: 'docker',
          extends: '.docker-build-internal',
          variables: {
            // biome-ignore-start lint/style/useNamingConvention: env-var
            DOCKERFILE_CONTEXT: `./dist/apps/${projectNames.fileName}`,
            DOCKER_IMAGE_INTERNAL_NAME: `${projectNames.fileName}`
            // biome-ignore-end lint/style/useNamingConvention: env-var
          },
          dependencies: ['build'],
          only: {
            changes: [
              '.gitlab-ci.yml',
              'package.json',
              'package-lock.json',
              'libs/**/*',
              `apps/${projectNames.fileName}/**/*`
            ],
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
