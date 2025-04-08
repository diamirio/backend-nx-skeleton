import type { GeneratorCallback, Tree } from '@nx/devkit'
import { readProjectConfiguration, addDependenciesToPackageJson, addProjectConfiguration, formatFiles, names, output, OverwriteStrategy, readNxJson } from '@nx/devkit'
import { addTsConfigPath } from '@nx/js'
import { ProjectType } from '@nx/workspace'
import { getNpmScope } from '@nx/workspace/src/utilities/get-import-path'
import { join } from 'node:path'
import { readJson, updateJson } from 'nx/src/generators/utils/json'
import { YAMLMap, YAMLSeq } from 'yaml'

import { componentMetaData } from '../../constant'
import { SERVICE_NAME as NX_SERVICE_NAME } from '../../constant/application'
import { DEPENDENCIES, DEV_DEPENDENCIES, DOCKER_SERVICE, DOCKER_SERVICE_NAME } from '../../constant/microservice-provider'
import { getMessageQueueConfig, MESSAGE_QUEUE_CONFIG_KEY } from '../../constant/microservice-provider/config'
import { addImport, addModuleDecoratorImport, applyTasks, applyTemplateFactory, promptProjectMultiselect, updateConfigFiles, updateSourceFile, updateYaml } from '../../utils'
import type { MicroserviceProviderGeneratorSchema } from './schema'

interface GenerateOptions extends MicroserviceProviderGeneratorSchema {
  scope: string
  libraryName: string
  importPath: string
  packageScope: string
  libRoot: string
  projectRoot: string
}

export default async function microserviceProviderGenerator (tree: Tree, options: MicroserviceProviderGeneratorSchema): Promise<GeneratorCallback> {
  const generateOptions: GenerateOptions = options as GenerateOptions

  const tasks: GeneratorCallback[] = []
  const applyTemplate = applyTemplateFactory(tree, __dirname, { overwriteStrategy: OverwriteStrategy.KeepExisting })

  generateOptions.scope = getNpmScope(tree)
  generateOptions.libraryName = names(generateOptions.name).fileName
  generateOptions.importPath = generateOptions?.importPath ?? `@${generateOptions.scope}/${generateOptions.libraryName}`
  generateOptions.packageScope = generateOptions.scope ? generateOptions.importPath : generateOptions.libraryName
  generateOptions.libRoot = readNxJson(tree)?.workspaceLayout?.libsDir ?? 'libs'
  generateOptions.projectRoot = join(generateOptions.libRoot, generateOptions.libraryName)

  output.log({
    title: '[Microservice Provider] Applying templates',
    bodyLines: ['Update files ...', 'Creating template files...', 'Creating folders...']
  })

  if (!tree.exists(generateOptions.projectRoot)) {
    addProjectConfiguration(tree, generateOptions.libraryName, {
      root: generateOptions.projectRoot,
      sourceRoot: join(generateOptions.projectRoot, 'src'),
      projectType: ProjectType.Library,
      tags: [],
      targets: {}
    })

    applyTemplate(['files'], generateOptions, generateOptions.projectRoot)

    addTsConfigPath(tree, generateOptions.importPath, [join(generateOptions.projectRoot, 'src', 'index.ts')])
    addTsConfigPath(tree, `${generateOptions.importPath}/*`, [join(generateOptions.projectRoot, 'src', '*')])
  }

  await updateConfigAndApplication(tree, generateOptions)

  await formatFiles(tree)

  // dependencies and scripts
  if (!generateOptions.skipPackageJson) {
    output.log({ title: '[Microservice Provider] Updating package.json', bodyLines: ['Add dependencies ...'] })

    tasks.push(addDependenciesToPackageJson(tree, DEPENDENCIES, DEV_DEPENDENCIES))
  }

  updateJson(tree, 'nx.json', (content) => {
    content.integration = {
      ...content.integration ?? {},
      msp: {
        projectRoot: generateOptions.projectRoot,
        importPath: generateOptions.importPath
      }
    }

    return content
  })

  if (tree.exists('service-docker-compose.yml')) {
    updateYaml(tree, 'service-docker-compose.yml', (content) => {
      if (!content.has('services')) {
        content.add({ key: 'services', value: new YAMLMap() })
      }

      if (!content.hasIn(['services', DOCKER_SERVICE_NAME])) {
        content.addIn(['services'], { key: DOCKER_SERVICE_NAME, value: DOCKER_SERVICE })
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

  if (tree.exists(join(generateOptions.libRoot, '.gitkeep'))) {
    tree.delete(join(generateOptions.libRoot, '.gitkeep'))
  }

  return applyTasks(tasks)
}

async function updateConfigAndApplication (tree: Tree, options: GenerateOptions): Promise<void> {
  // prompt, if not called by application generator, which applications should be updated
  if (!options.updateApplications?.length) {
    options.updateApplications = await promptProjectMultiselect(tree, 'Please select the project which should include the MSP:')
  }

  if (options.updateApplications?.length) {
    output.log({
      title: '[Microservice Provider] Updating applications',
      bodyLines: options.updateApplications
    })

    const messageQueueConfig = getMessageQueueConfig()

    for (const application of options.updateApplications) {
      const project = readProjectConfiguration(tree, application)

      // update config files
      updateConfigFiles(tree, project.root, MESSAGE_QUEUE_CONFIG_KEY, messageQueueConfig.defaultConfig, messageQueueConfig.environmentConfig)
      const projectJson = readJson(tree, join(project.root, 'project.json'))

      // update application module
      for (const component of projectJson?.integration?.nestjs?.components ?? []) {
        const componentMeta = componentMetaData[component]

        if (componentMeta) {
          updateSourceFile(tree, join(project.sourceRoot, componentMeta.folder, `${componentMeta.folder}.module.ts`), (file) => {
            addModuleDecoratorImport(file, `${componentMeta.className}Module`, messageQueueConfig.forRoot)
            addImport(file, messageQueueConfig.moduleClass, messageQueueConfig.importPath)

            return file
          })
        }
      }
    }
  }
}
