import type { TargetConfiguration } from 'nx/src/config/workspace-json-project-json'

import { buildPlugin, PluginBuilder } from './utils/plugin'

export interface TscPluginOptions {
  targetName?: string
  executor?: string
}

class TscPlugin extends PluginBuilder<TscPluginOptions> {
  name = 'tsc'
  targetName = 'build'

  buildTarget (options: TscPluginOptions): TargetConfiguration {
    return {
      executor: options?.executor ?? '@webundsoehne/nx-executors:tsc',
      cache: true,
      options: {
        main: 'src/main.ts',
        tsConfig: 'tsconfig.build.json'
      }
    }
  }
}

export const { createNodes, createNodesV2, buildTarget, buildNodes } = buildPlugin(TscPlugin)
