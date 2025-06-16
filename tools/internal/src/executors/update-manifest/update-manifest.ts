import { join } from 'node:path'
import { ExecutorContext, logger, PromiseExecutor, readJsonFile, writeJsonFile } from '@nx/devkit'
import { createExportableManifest } from '@pnpm/exportable-manifest'
import { readWorkspaceManifest } from '@pnpm/workspace.read-manifest'

import { UpdateManifestExecutorSchema } from './schema'

const runExecutor: PromiseExecutor<UpdateManifestExecutorSchema> = async (
  options: UpdateManifestExecutorSchema,
  context: ExecutorContext
) => {
  logger.log(`Building Manifest for: ${context.projectName} to ${options.outputFile}`)

  const projectDir = context.projectsConfigurations.projects[context.projectName].root

  options.inputFile ??= join(projectDir, 'package.json')

  try {
    // get catalogs
    const workspaceManifest = await readWorkspaceManifest(context.root)
    // get "raw" package.json and overwrite workspace and catalog placeholder
    const inputManifest = await readJsonFile(options.inputFile)
    const outputManifest = await readJsonFile(options.outputFile)

    const exportableManifest = await createExportableManifest(projectDir, inputManifest, {
      catalogs: {
        default: workspaceManifest.catalog,
        ...workspaceManifest.catalogs
      }
    })

    // set overwritten dependencies
    outputManifest.dependencies = exportableManifest.dependencies
    outputManifest.devDependencies = exportableManifest.devDependencies
    outputManifest.peerDependencies = exportableManifest.peerDependencies
    outputManifest.peerDependenciesMeta = exportableManifest.peerDependenciesMeta

    // write modified data back to package.json
    writeJsonFile(options.outputFile, outputManifest, { appendNewLine: true })

    return {
      success: true
    }
  } catch (error) {
    logger.error(error.message)

    return {
      success: false
    }
  }
}

export default runExecutor
