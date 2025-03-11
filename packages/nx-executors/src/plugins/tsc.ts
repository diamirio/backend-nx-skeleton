import type { TargetConfiguration } from 'nx/src/config/workspace-json-project-json'

import type { BuildTargetOptions } from './utils/plugin'
import { buildPlugin, PluginBuilder } from './utils/plugin'

export interface TscPluginOptions {
  targetName?: string
  executor?: string
}

class TscPlugin extends PluginBuilder<TscPluginOptions> {
  name = 'tsc'

  buildTarget ({ options }: BuildTargetOptions<TscPluginOptions>): Record<string, TargetConfiguration> {
    return {
      [options?.targetName ?? 'build']: {
        executor: options?.executor ?? '@webundsoehne/nx-executors:tsc',
        cache: true,
        inputs: ['production', '^production'],
        outputs: ['{options.outputPath}'],
        options: {
          main: 'src/main.ts',
          tsConfig: 'tsconfig.build.json'
        }
      }
    }
  }
}

export const { createNodes, createNodesV2, buildTarget, buildNodes } = buildPlugin(TscPlugin)
