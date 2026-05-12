import { join } from 'node:path'
import type { GeneratorCallback, Tree } from '@nx/devkit'
import {
  addDependenciesToPackageJson,
  addProjectConfiguration,
  formatFiles,
  OverwriteStrategy,
  output,
  readProjectConfiguration,
  updateJson
} from '@nx/devkit'
import { addTsConfigPath } from '@nx/js'
import { ProjectType } from '@nx/workspace'
import { readJson } from 'nx/src/generators/utils/json'
import { YAMLMap, YAMLSeq } from 'yaml'

import { componentMetaData } from '../../constant'
import { SERVICE_NAME as NX_SERVICE_NAME } from '../../constant/application'
import {
  DEPENDENCIES,
  DEV_DEPENDENCIES,
  DOCKER_SERVICE,
  DOCKER_SERVICE_NAME
} from '../../constant/microservice-provider'
import {
  buildMessageQueueUrl,
  getMessageQueueConfig,
  MESSAGE_QUEUE_CONFIG_KEY,
  MESSAGE_QUEUE_URL_ENV_VAR
} from '../../constant/microservice-provider/config'
import {
  addImport,
  addModuleDecoratorImport,
  applyTasks,
  applyTemplateFactory,
  cleanupGitkeep,
  promptProjectMultiselect,
  SetupGeneratorOptions,
  setupGeneratorOptions,
  updateConfigFiles,
  updateSourceFile,
  updateYaml
} from '../../utils'
import type { MicroserviceProviderGeneratorSchema } from './schema'

type GenerateOptions = SetupGeneratorOptions<MicroserviceProviderGeneratorSchema>

export default async function microserviceProviderGenerator(
  tree: Tree,
  options: MicroserviceProviderGeneratorSchema
): Promise<GeneratorCallback> {
  const generateOptions: GenerateOptions = setupGeneratorOptions(tree, options)
  generateOptions.projectRoot = join(generateOptions.libRoot, generateOptions.projectName)

  const tasks: GeneratorCallback[] = []
  const applyTemplate = applyTemplateFactory(tree, __dirname, { overwriteStrategy: OverwriteStrategy.KeepExisting })

  output.log({
    title: '[Microservice Provider] Applying templates',
    bodyLines: ['Update files ...', 'Creating template files...', 'Creating folders...']
  })

  if (!tree.exists(generateOptions.projectRoot)) {
    addProjectConfiguration(tree, generateOptions.projectName, {
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

    tasks.push(addDependenciesToPackageJson(tree, DEPENDENCIES, DEV_DEPENDENCIES, undefined, true))
  }

  updateJson(tree, 'nx.json', (content) => {
    content.integration = {
      ...(content.integration ?? {}),
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
    // depends-on
    updateYaml(tree, 'docker-compose.yml', (content) => {
      if (!content.hasIn(['services', NX_SERVICE_NAME, 'depends_on'])) {
        content.addIn(['services', NX_SERVICE_NAME], { key: 'depends_on', value: new YAMLSeq() })
      }

      const dependsOn: YAMLSeq = content.getIn(['services', NX_SERVICE_NAME, 'depends_on']) as YAMLSeq

      if (!dependsOn.items.find((item: any) => item.value === DOCKER_SERVICE_NAME)) {
        content.addIn(['services', NX_SERVICE_NAME, 'depends_on'], DOCKER_SERVICE_NAME)
      }
    })
    // urls env-var
    updateYaml(tree, 'docker-compose.yml', (content) => {
      if (!content.hasIn(['services', NX_SERVICE_NAME, 'environment'])) {
        content.addIn(['services', NX_SERVICE_NAME], { key: 'environment', value: new YAMLMap() })
      }

      const environment = content.getIn(['services', NX_SERVICE_NAME, 'environment']) as YAMLMap

      if (!environment.has(MESSAGE_QUEUE_URL_ENV_VAR)) {
        environment.add({ key: MESSAGE_QUEUE_URL_ENV_VAR, value: [buildMessageQueueUrl(DOCKER_SERVICE_NAME)] })
      }
    })
  }

  cleanupGitkeep(tree, generateOptions.libRoot)

  return applyTasks(tasks)
}

async function updateConfigAndApplication(tree: Tree, options: GenerateOptions): Promise<void> {
  // prompt, if not called by application generator, which applications should be updated
  if (!options.updateApplications?.length) {
    options.updateApplications = await promptProjectMultiselect(
      tree,
      'Please select the project which should include the MSP:'
    )
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
      updateConfigFiles(
        tree,
        project.root,
        MESSAGE_QUEUE_CONFIG_KEY,
        messageQueueConfig.defaultConfig,
        messageQueueConfig.environmentConfig
      )

      if (!options.skipModuleImport) {
        const projectJson = readJson(tree, join(project.root, 'project.json'))

        // update application module
        for (const component of projectJson?.integration?.nestjs?.components ?? []) {
          const componentMeta = componentMetaData[component]

          if (componentMeta) {
            updateSourceFile(
              tree,
              join(project.sourceRoot, componentMeta.folder, `${componentMeta.folder}.module.ts`),
              (file) => {
                addModuleDecoratorImport(file, `${componentMeta.className}Module`, messageQueueConfig.forRoot)
                addImport(file, `ConfigService`, '@diamir/nestjs-config')
                addImport(file, messageQueueConfig.moduleClass, messageQueueConfig.importPath)

                return file
              }
            )
          }
        }
      }
    }
  }
}
