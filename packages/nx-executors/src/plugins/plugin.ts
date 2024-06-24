import { loadConfigFile } from '@nx/devkit/src/utils/config-utils'
import { dirname, resolve } from 'node:path'
import type { CreateNodes, CreateNodesContext, CreateNodesResult, CreateNodesV2 } from 'nx/src/project-graph/plugins'
import type { CreateNodesResultV2 } from 'nx/src/project-graph/plugins/public-api'
import { logger } from 'nx/src/utils/logger'

import type { TsNodeDevPluginOptions } from './ts-node-dev'
import { buildNodes as buildTsNodeDevNodes, buildTarget as buildTsNodeDevTarget } from './ts-node-dev'
import type { TscPluginOptions } from './tsc'
import { buildNodes as buildTscNodes, buildTarget as buildTscTarget } from './tsc'
import { FILE_PATTERN } from './utils/plugin'

export interface PluginOptions {
  tscOptions: TscPluginOptions
  tsNodeDevOptions: TsNodeDevPluginOptions
}

export const createNodes: CreateNodes = [
  FILE_PATTERN,
  async (configFile: string, options: PluginOptions, context: CreateNodesContext): Promise<CreateNodesResult> => {
    logger.warn('`createNodes` is deprecated. Update your plugin to utilize createNodesV2 instead. In Nx 20, this will change to the createNodesV2 API.')

    const projectRoot = dirname(configFile)
    const projectConfig = await loadConfigFile(resolve(context.workspaceRoot, configFile))

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
]

export const createNodesV2: CreateNodesV2 = [
  FILE_PATTERN,
  async (configFiles: string[], options: PluginOptions, context: CreateNodesContext): Promise<CreateNodesResultV2> => {
    return (await Promise.all([buildTscNodes(configFiles, options?.tscOptions, context), buildTsNodeDevNodes(configFiles, options?.tsNodeDevOptions, context)])).flat()
  }
]
