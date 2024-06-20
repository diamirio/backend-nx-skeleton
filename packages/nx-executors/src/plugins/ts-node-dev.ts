import { calculateHashForCreateNodes } from '@nx/devkit/src/utils/calculate-hash-for-create-nodes'
import { loadConfigFile } from '@nx/devkit/src/utils/config-utils'
import { dirname, join, resolve } from 'node:path'
import type { TargetConfiguration } from 'nx/src/config/workspace-json-project-json'
import { hashObject } from 'nx/src/hasher/file-hasher'
import type { CreateNodes, CreateNodesContext, CreateNodesResult, CreateNodesV2 } from 'nx/src/project-graph/plugins'
import { createNodesFromFiles } from 'nx/src/project-graph/plugins'
import type { CreateNodesResultV2 } from 'nx/src/project-graph/plugins/public-api'
import { workspaceDataDirectory } from 'nx/src/utils/cache-directory'
import { logger } from 'nx/src/utils/logger'

import { readTargetsCache, writeTargetsToCache } from './utils'

const FILE_PATTERN = '**/project.json'

export interface TsNodeDevPluginOptions {
  targetName?: string
  executor?: string
}

function guessNodeService (components: string[]): string {
  for (const service of ['server', 'bgtask', 'microservice-server']) {
    if (components.includes(service)) {
      return service
    }
  }
}

export const createNodes: CreateNodes = [
  FILE_PATTERN,
  (configFile: string, options: TsNodeDevPluginOptions, context: CreateNodesContext): Promise<CreateNodesResult> => {
    logger.warn('`createNodes` is deprecated. Update your plugin to utilize createNodesV2 instead. In Nx 20, this will change to the createNodesV2 API.')

    return internalCreateNode(configFile, options, context, {})
  }
]

export const createNodesV2: CreateNodesV2 = [
  FILE_PATTERN,
  async (configFiles: string[], options: TsNodeDevPluginOptions, context: CreateNodesContext): Promise<CreateNodesResultV2> => {
    const optionsHash = hashObject(options)
    const cachePath = join(workspaceDataDirectory, `tsc-node-dev-${optionsHash}.hash`)
    const targetsCache = readTargetsCache(cachePath)

    try {
      return await createNodesFromFiles((configFile: string, options, context) => internalCreateNode(configFile, options, context, targetsCache), configFiles, options, context)
    } finally {
      writeTargetsToCache(cachePath, targetsCache)
    }
  }
]

async function internalCreateNode (
  configFilePath: string,
  options: TsNodeDevPluginOptions,
  context: CreateNodesContext,
  targetsCache: Record<string, TargetConfiguration>
): Promise<CreateNodesResult> {
  const projectRoot = dirname(configFilePath)
  const projectConfig = await loadConfigFile(resolve(context.workspaceRoot, configFilePath))

  if (projectConfig.projectType !== 'application') {
    return {}
  }

  const hash = await calculateHashForCreateNodes(projectRoot, options, context)

  if (!targetsCache[hash]) {
    const target: any = {
      executor: options?.executor ?? '@webundsoehne/nx-executors:ts-node-dev',
      options: {
        main: 'src/main.ts',
        tsConfig: 'tsconfig.app.json'
      }
    }
    const nodeService = guessNodeService(projectConfig.integration?.nestjs?.components ?? [])

    if (nodeService) {
      target.options.env = { NODE_SERVICE: nodeService }
    }

    targetsCache[hash] = target
  }

  return {
    projects: {
      [projectRoot]: {
        targets: {
          [options?.targetName ?? 'serve']: targetsCache[hash]
        }
      }
    }
  }
}
