import { calculateHashForCreateNodes } from '@nx/devkit/src/utils/calculate-hash-for-create-nodes'
import { loadConfigFile } from '@nx/devkit/src/utils/config-utils'
import { dirname, resolve } from 'node:path'
import type { TargetConfiguration } from 'nx/src/config/workspace-json-project-json'
import type { CreateNodes, CreateNodesContext, CreateNodesResult, CreateNodesV2 } from 'nx/src/project-graph/plugins'
import { createNodesFromFiles } from 'nx/src/project-graph/plugins'
import type { CreateNodesResultV2 } from 'nx/src/project-graph/plugins/public-api'
import { logger } from 'nx/src/utils/logger'

import type { TargetCache } from './cache'
import { getCache, writeTargetsToCache } from './cache'

export const FILE_PATTERN = '**/project.json'

type Plugin<O> = new (...args: any[]) => PluginBuilder<O>

export interface BuildTargetOptions<O> {
  options: O
  projectConfig: Record<string, any>
  context: CreateNodesContext
  projectRoot: string
}

interface BuildPluginResponse<O> {
  createNodes: CreateNodes
  createNodesV2: CreateNodesV2
  buildTarget: (options: BuildTargetOptions<O>) => TargetConfiguration
  buildNodes: (configFiles: string[], options: O, context: CreateNodesContext) => Promise<CreateNodesResultV2>
}

export function buildPlugin<O> (pluginBuilder: Plugin<O>): BuildPluginResponse<O> {
  const plugin = new pluginBuilder()

  return {
    createNodes: [
      plugin.filePattern,
      (configFile: string, options: O, context: CreateNodesContext): Promise<CreateNodesResult> => {
        logger.warn('`createNodes` is deprecated. Update your plugin to utilize createNodesV2 instead. In Nx 20, this will change to the createNodesV2 API.')

        return plugin.internalCreateNode(configFile, options, context, {})
      }
    ],
    createNodesV2: [plugin.filePattern, plugin.internalCreateNodeV2.bind(plugin)],
    buildTarget: plugin.buildTarget.bind(plugin),
    buildNodes: plugin.internalCreateNodeV2.bind(plugin)
  }
}

export abstract class PluginBuilder<O extends { targetName?: string }> {
  filePattern: string = FILE_PATTERN
  projectTypes: string[] = ['application']

  abstract name: string
  abstract targetName: string

  async internalCreateNode (configFilePath: string, options: O, context: CreateNodesContext, targetsCache: TargetCache): Promise<CreateNodesResult> {
    const projectRoot = dirname(configFilePath)
    const projectConfig = await loadConfigFile(resolve(context.workspaceRoot, configFilePath))

    if (!this.projectTypes.includes(projectConfig.projectType)) {
      return {}
    }

    const hash = await calculateHashForCreateNodes(projectRoot, options, context)

    if (!targetsCache[hash]) {
      targetsCache[hash] = this.buildTarget({
        options,
        projectConfig,
        context,
        projectRoot
      })
    }

    return {
      projects: {
        [projectRoot]: {
          targets: {
            [options?.targetName ?? this.targetName]: targetsCache[hash]
          }
        }
      }
    }
  }

  async internalCreateNodeV2 (configFiles: string[], options: O, context: CreateNodesContext): Promise<CreateNodesResultV2> {
    const { cachePath, targetsCache } = getCache(options, this.name)

    try {
      return await createNodesFromFiles(
        (configFile: string, options, context) => this.internalCreateNode(configFile, options, context, targetsCache),
        configFiles,
        options,
        context
      )
    } finally {
      writeTargetsToCache(cachePath, targetsCache)
    }
  }

  abstract buildTarget (option: BuildTargetOptions<O>): TargetConfiguration
}
