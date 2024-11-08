import type { GeneratorCallback, Tree } from '@nx/devkit'
import { addDependenciesToPackageJson, addProjectConfiguration, formatFiles, names, output, readNxJson } from '@nx/devkit'
import { addTsConfigPath } from '@nx/js'
import { ProjectType } from '@nx/workspace'
import { getNpmScope } from '@nx/workspace/src/utilities/get-import-path'
import { join } from 'node:path'
import { updateJson } from 'nx/src/generators/utils/json'
import { YAMLMap, YAMLSeq } from 'yaml'

import { SERVICE_NAME as NX_SERVICE_NAME } from '../../constant/application'
import { DEPENDENCIES, DEV_DEPENDENCIES, DOCKER_IMAGE, DOCKER_SERVICE_NAME } from '../../constant/microservice-provider'
import { applyTasks, applyTemplateFactory, updateYaml } from '../../utils'
import type { MicroserviceProviderGeneratorSchema } from './schema'

// @todo: project selection to add Orm-Module root import
export default async function microserviceProviderGenerator (tree: Tree, options: MicroserviceProviderGeneratorSchema): Promise<GeneratorCallback> {
  const tasks: GeneratorCallback[] = []
  const applyTemplate = applyTemplateFactory(tree, __dirname)
  const scope = getNpmScope(tree)
  const libraryName = names(options.name).fileName
  const importPath = options?.importPath ?? `@${scope}/${libraryName}`

  const templateContext = {
    ...options,
    packageScope: scope ? importPath : libraryName
  }

  const libRoot = readNxJson(tree)?.workspaceLayout?.libsDir ?? 'libs'
  const projectRoot = join(libRoot, libraryName)

  output.log({
    title: '[Microservice Provider] Applying templates',
    bodyLines: ['Update files ...', 'Creating template files...', 'Creating folders...']
  })

  addProjectConfiguration(tree, libraryName, {
    root: projectRoot,
    sourceRoot: join(projectRoot, 'src'),
    projectType: ProjectType.Library,
    tags: [],
    targets: {}
  })

  applyTemplate(['files'], templateContext, projectRoot)

  await formatFiles(tree)

  addTsConfigPath(tree, importPath, [join(projectRoot, 'src', 'index.ts')])
  addTsConfigPath(tree, `${importPath}/*`, [join(projectRoot, 'src', '*')])

  // dependencies and scripts
  if (!options.skipPackageJson) {
    output.log({ title: '[Microservice Provider] Updating package.json', bodyLines: ['Add dependencies ...'] })

    tasks.push(addDependenciesToPackageJson(tree, DEPENDENCIES, DEV_DEPENDENCIES))
  }

  updateJson(tree, 'nx.json', (content) => {
    content.integration = {
      ...content.integration ?? {},
      msp: {
        projectRoot,
        importPath
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
        content.addIn(['services'], { key: DOCKER_SERVICE_NAME, value: { image: DOCKER_IMAGE } })
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

  if (tree.exists(join(libRoot, '.gitkeep'))) {
    tree.delete(join(libRoot, '.gitkeep'))
  }

  return applyTasks(tasks)
}
