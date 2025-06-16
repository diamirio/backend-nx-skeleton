import * as path from 'node:path'
import { addProjectConfiguration, formatFiles, generateFiles, names, readNxJson, Tree } from '@nx/devkit'

import { PackageGeneratorSchema } from './schema'

export async function packageGenerator(tree: Tree, options: PackageGeneratorSchema) {
  const [prefix, rawPackageName] = options.name.includes('/')
    ? options.name.split('/')
    : [options.prefix ?? '', options.name]
  const packageName = names(rawPackageName).fileName

  const packageDir = readNxJson(tree)?.workspaceLayout?.appsDir ?? 'packages'
  const projectRoot = `${packageDir}/${packageName}`

  options.name = prefix ? [prefix, packageName].join('/') : packageName

  // add project (folder, project.json)
  addProjectConfiguration(tree, packageName, {
    root: projectRoot,
    projectType: 'application',
    sourceRoot: `${projectRoot}/src`,
    targets: {
      lint: {},
      build: {},
      updateManifest: {},
      release: {}
    }
  })
  // add folder content
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, { ...options, packageName })
  await formatFiles(tree)
}

export default packageGenerator
