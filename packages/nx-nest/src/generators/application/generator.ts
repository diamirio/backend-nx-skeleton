import type { GeneratorCallback, Tree } from '@nx/devkit'
import { addDependenciesToPackageJson, addProjectConfiguration, formatFiles, names, readNxJson, updateJson } from '@nx/devkit'
import { output, ProjectType } from '@nx/workspace'
import { getNpmScope } from '@nx/workspace/src/utilities/get-import-path'
import { join } from 'node:path'
import { readJson } from 'nx/src/generators/utils/json'

import { Database } from '../../constant'
import { Component, DEPENDENCIES, DEV_DEPENDENCIES, IMPLICIT_DEPENDENCIES } from '../../constant/application'
import { JEST_DEPENDENCIES } from '../../constant/jest'
import { applyTasks, applyTemplateFactory, addEnumMember, addIndexExport, addClassProperty, updateSourceFile, addImport } from '../../utils'
import databaseLibraryGenerator from '../database-orm/generator'
import microserviceProviderGenerator from '../microservice-provider/generator'
import type { ApplicationGeneratorSchema } from './schema'
import { getComponentMetadata, addPlugin } from './utils'

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
    includeMessageQueue: options.components.some((component) => component.startsWith('microservice')),
    applicationMetadata,
    packageScope: scope ? `@${scope}/${projectNames.fileName}` : projectNames.fileName,
    projectNames,
    fileName: projectNames.fileName,
    COMPONENT: Component,
    DATABASE: Database
  }

  const appRoot = readNxJson(tree)?.workspaceLayout?.appsDir ?? 'apps'
  const projectRoot = join(appRoot, projectNames.fileName)

  /**
   * DATABASE
   */
  if (options.database !== Database.NONE) {
    const databaseOrm = (readNxJson(tree) as any)?.integration?.orm

    if (databaseOrm && databaseOrm.database !== options.database) {
      output.error({ title: `[Application] Invalid database-orm. "${databaseOrm}" already configured.` })

      return
    }

    if (!databaseOrm) {
      output.log({ title: '[Application] Setup database-orm util library ...' })

      tasks.push(
        await databaseLibraryGenerator(tree, {
          database: options.database,
          name: 'database',
          skipPackageJson: options.skipPackageJson
        })
      )
    }

    templateContext.orm = (readNxJson(tree) as any)?.integration?.orm
  }

  /**
   * MICROSERVICE
   */
  if (options.components?.includes(Component.MICROSERVICE) || options.microserviceProvider) {
    const microserviceProvider = (readNxJson(tree) as any)?.integration?.msp

    if (!microserviceProvider) {
      output.log({ title: '[Application] Setup microservice-provider util library ...' })

      tasks.push(
        await microserviceProviderGenerator(tree, {
          name: 'microservice-provider',
          skipPackageJson: options.skipPackageJson
        })
      )
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
    applyTemplate(['files', component.file], templateContext, join(projectRoot, 'src', component.file))
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
      content.scripts.start = 'nx run-many -t serve --parallel 100'
      content.scripts['start:one'] = 'nx serve'
      content.scripts.build = 'nx run-many -t build'
      content.scripts['build:one'] = 'nx build'
      content.scripts['build:nocache'] = 'nx run-many -t build --skip-nx-cache'

      return content
    })

    updateJson(tree, join(projectRoot, 'package.json'), (content) => {
      for (const component of options.components) {
        /* eslint-disable @typescript-eslint/indent,@typescript-eslint/padding-line-between-statements,indent*/
        switch (component) {
          case Component.SERVER:
          case Component.BG_TASK:
          case Component.MICROSERVICE:
            content.scripts.start = `node ./${projectRoot}/src/main.js`
            break

          case Component.COMMAND:
            content.scripts.command = `NODE_SERVICE='cli' node ./${projectRoot}/src/main.js`
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
      lint: { configurations: { fix: { fix: true } } }
    }

    return content
  })

  if (tree.exists(join(appRoot, '.gitkeep'))) {
    tree.delete(join(appRoot, '.gitkeep'))
  }

  output.log({ title: '[Application] Post-Processing ...' })

  return applyTasks(tasks)
}
