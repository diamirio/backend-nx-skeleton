import { loadConfigFile } from '@nx/devkit/src/utils/config-utils'
import { dirname, resolve } from 'node:path'
import type { CreateNodes, CreateNodesContext, CreateNodesResult, CreateNodesV2 } from 'nx/src/project-graph/plugins'
import type { CreateNodesResultV2 } from 'nx/src/project-graph/plugins/public-api'
import { logger } from 'nx/src/utils/logger'

import type { TsNodeDevPluginOptions } from './ts-node-dev'
import { buildTsNodeDevTarget, createTsNodeDevNodes } from './ts-node-dev'
import type { TscPluginOptions } from './tsc'
import { buildTscTarget, createTscNodes } from './tsc'

const FILE_PATTERN = '**/project.json'

export interface PluginOptions {
  tscOptions: TscPluginOptions
  tsNodeDevOptions: TsNodeDevPluginOptions
}

async function internalCreateNode (configFilePath: string, options: PluginOptions, context: CreateNodesContext): Promise<CreateNodesResult> {
  const projectRoot = dirname(configFilePath)
  const projectConfig = await loadConfigFile(resolve(context.workspaceRoot, configFilePath))

  if (projectConfig.projectType !== 'application') {
    return {}
  }

  const targets = {
    [options?.tscOptions?.targetName ?? 'build']: buildTscTarget(options?.tscOptions, projectConfig),
    [options?.tsNodeDevOptions?.targetName ?? 'serve']: buildTsNodeDevTarget(options?.tsNodeDevOptions, projectConfig)
  }

  return {
    projects: {
      [projectRoot]: {
        targets
      }
    }
  }
}

export const createNodes: CreateNodes = [
  FILE_PATTERN,
  (configFile: string, options: PluginOptions, context: CreateNodesContext): Promise<CreateNodesResult> => {
    logger.warn('`createNodes` is deprecated. Update your plugin to utilize createNodesV2 instead. In Nx 20, this will change to the createNodesV2 API.')

    return internalCreateNode(configFile, options, context)
  }
]

export const createNodesV2: CreateNodesV2 = [
  FILE_PATTERN,
  async (configFiles: string[], options: PluginOptions, context: CreateNodesContext): Promise<CreateNodesResultV2> => {
    return (await Promise.all([createTscNodes(configFiles, options?.tscOptions, context), createTsNodeDevNodes(configFiles, options?.tsNodeDevOptions, context)])).flat()
  }
]
