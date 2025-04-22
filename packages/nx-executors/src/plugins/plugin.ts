import { createNodesFromFiles } from '@nx/devkit'
import { loadConfigFile } from '@nx/devkit/src/utils/config-utils'
import { dirname, resolve } from 'node:path'
import type { CreateNodes, CreateNodesContext, CreateNodesContextV2, CreateNodesResult, CreateNodesV2 } from 'nx/src/project-graph/plugins'
import { logger } from 'nx/src/utils/logger'

import type { JestPluginOptions } from './jest'
import { buildTarget as buildJestTarget } from './jest'
import type { TsNodeDevPluginOptions } from './ts-node-dev'
import { buildTarget as buildTsNodeDevTarget } from './ts-node-dev'
import type { TscPluginOptions } from './tsc'
import { buildTarget as buildTscTarget } from './tsc'
import { FILE_PATTERN, SKIP_NX_EXECUTORS } from './utils/plugin'

export interface PluginOptions {
  tscOptions: TscPluginOptions
  tsNodeDevOptions: TsNodeDevPluginOptions
  jestOptions: JestPluginOptions
}

export const createNodes: CreateNodes = [
  FILE_PATTERN,
  (configFile: string, options: PluginOptions, context: CreateNodesContext): Promise<CreateNodesResult> => {
    logger.warn('`createNodes` is deprecated. Update your plugin to utilize createNodesV2 instead. In Nx 20, this will change to the createNodesV2 API.')

    return createNodeTargets(configFile, options, context)
  }
]

export const createNodesV2: CreateNodesV2<PluginOptions> = [
  FILE_PATTERN,
  (configFiles: readonly string[], options: PluginOptions, context: CreateNodesContextV2): Promise<[file: string, value: CreateNodesResult][]> => {
    return createNodesFromFiles(createNodeTargets, configFiles, options, context)
  }
]

async function createNodeTargets (configFile: string, options: PluginOptions, context: CreateNodesContext): Promise<CreateNodesResult> {
  const projectRoot = dirname(configFile)
  const projectConfig = await loadConfigFile(resolve(context.workspaceRoot, configFile))

  if (projectConfig.projectType !== 'application' || projectConfig.tags?.includes(SKIP_NX_EXECUTORS)) {
    return {}
  }

  const targets = {
    ...buildTscTarget({
      options: options?.tscOptions,
      projectConfig,
      context,
      projectRoot
    }),
    ...buildTsNodeDevTarget({
      options: options?.tsNodeDevOptions,
      projectConfig,
      context,
      projectRoot
    }),
    ...buildJestTarget({
      options: options?.jestOptions,
      projectConfig,
      context,
      projectRoot
    })
  }

  return {
    projects: {
      [projectRoot]: {
        targets
      }
    }
  }
}
