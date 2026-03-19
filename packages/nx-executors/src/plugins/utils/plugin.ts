import { dirname, resolve } from 'node:path'
import type {
  CreateNodesContextV2,
  CreateNodesResult,
  CreateNodesResultV2,
  CreateNodesV2,
  TargetConfiguration
} from '@nx/devkit'
import { createNodesFromFiles } from '@nx/devkit'
import { calculateHashForCreateNodes } from '@nx/devkit/src/utils/calculate-hash-for-create-nodes'
import { loadConfigFile } from '@nx/devkit/src/utils/config-utils'

import type { TargetCache } from './cache'
import { getCache, writeTargetsToCache } from './cache'

export const FILE_PATTERN = '**/project.json'
export const SKIP_NX_EXECUTORS = 'skipNxExecutors'

type Plugin<O> = new (...args: any[]) => PluginBuilder<O>

export interface BuildTargetOptions<O> {
  options: O
  projectConfig: Record<string, any>
  context: CreateNodesContextV2
  projectRoot: string
}

interface BuildPluginResponse<O> {
  createNodes: CreateNodesV2
  buildTarget: (options: BuildTargetOptions<O>) => Record<string, TargetConfiguration>
  buildNodes: (configFiles: string[], options: O, context: CreateNodesContextV2) => Promise<CreateNodesResultV2>
}

export function buildPlugin<O>(pluginBuilder: Plugin<O>): BuildPluginResponse<O> {
  const plugin = new pluginBuilder()

  return {
    createNodes: [plugin.filePattern, plugin.internalCreateNode.bind(plugin)],
    buildTarget: plugin.buildTarget.bind(plugin),
    buildNodes: plugin.internalCreateNode.bind(plugin)
  }
}

export abstract class PluginBuilder<O extends { targetName?: string }> {
  filePattern: string = FILE_PATTERN
  projectTypes: string[] = ['application']

  abstract name: string
  abstract buildTarget(option: BuildTargetOptions<O>): Record<string, TargetConfiguration>

  async internalCreateNode(
    configFiles: string[],
    options: O,
    context: CreateNodesContextV2
  ): Promise<CreateNodesResultV2> {
    const { cachePath, targetsCache } = getCache(options, this.name)

    try {
      return await createNodesFromFiles(
        (configFile: string, opt, ctx) => this.createNodeTargets(configFile, opt, ctx, targetsCache),
        configFiles,
        options,
        context
      )
    } finally {
      writeTargetsToCache(cachePath, targetsCache)
    }
  }

  private async createNodeTargets(
    configFilePath: string,
    options: O,
    context: CreateNodesContextV2,
    targetsCache: TargetCache
  ): Promise<CreateNodesResult> {
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
          targets: targetsCache[hash]
        }
      }
    }
  }
}
