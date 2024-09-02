import type { ExecutorContext } from '@nx/devkit'
import { tscExecutor as nxTscExecutor } from '@nx/js/src/executors/tsc/tsc.impl'
import { join } from 'node:path'
import { fileExists, readJsonFile, writeJsonFile } from 'nx/src/utils/fileutils'

import type { ExecutorResult } from '../inteface'
import type { TscExecutorSchema } from './schema'

export default async function (options: TscExecutorSchema, context: ExecutorContext): Promise<ExecutorResult> {
  const project = context.projectsConfigurations.projects[context.projectName]
  const cwd = options?.cwd ?? project.root

  options.rootDir = options.rootDir ?? './'
  options.outputPath = options.outputPath ?? `dist/${project.root}` // default: /dist/apps/{name}
  options.main = options.main.startsWith(cwd) ? options.main : join(cwd, options.main)
  options.tsConfig = options.tsConfig.startsWith(cwd) ? options.tsConfig : join(cwd, options.tsConfig)

  if (options.mergeAssets) {
    // merge defaultTargetOptions and project.json options
    const defaultAssets = (context.nxJsonConfiguration?.targetDefaults?.[context.targetName]?.options?.assets ?? [])
      .map((asset) =>
        Object.fromEntries(
          Object.entries(asset).map(([key, value]) => {
            if (typeof value === 'string') {
              return [key, value.replace('{projectRoot}', project.root).replace('{workspaceRoot}', context.root)]
            }

            return [key, value]
          })
        )
      )
      .filter(({ glob, input }) => {
        return !options.assets.find((asset) => typeof asset !== 'string' && asset.glob === glob && asset.input === input)
      })

    options.assets = options.assets.concat(defaultAssets)
  }

  for await (const data of nxTscExecutor(options, context)) {
    if (!data.success) {
      throw new Error(`Error compiling: ${data.outfile}`)
    }
  }

  // Set missing version or overwrite with the roots package.json version
  const rootPackageJson = join(context.root, 'package.json')
  const packageJsonPath = join(options.outputPath, 'package.json')

  if (fileExists(packageJsonPath)) {
    const packageJson = readJsonFile(packageJsonPath)

    packageJson.version ??= '0.0.1'

    if (!options.keepPackageVersion && fileExists(rootPackageJson)) {
      packageJson.version = readJsonFile(rootPackageJson)?.version ?? '0.0.1'
    }

    writeJsonFile(packageJsonPath, packageJson)
  }

  return { success: true }
}
