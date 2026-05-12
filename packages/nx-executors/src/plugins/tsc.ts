import { TargetConfiguration } from '@nx/devkit'

import type { BuildTargetOptions } from './utils/plugin'
import { buildPlugin, PluginBuilder, SKIP_NX_EXECUTORS } from './utils/plugin'

export interface TscPluginOptions {
  targetName?: string
  executor?: string
  typecheckTargetName?: string
}

class TscPlugin extends PluginBuilder<TscPluginOptions> {
  name = 'tsc'

  buildTarget({
    options,
    projectConfig,
    projectRoot
  }: BuildTargetOptions<TscPluginOptions>): Record<string, TargetConfiguration> {
    if (projectConfig.tags?.includes(`${SKIP_NX_EXECUTORS}:${this.name}`)) {
      return {}
    }

    return {
      [options?.targetName ?? 'build']: {
        executor: options?.executor ?? '@diamir/nx-executors:tsc',
        cache: true,
        inputs: ['production', '^production'],
        outputs: ['{options.outputPath}'],
        options: {
          main: 'src/main.ts',
          tsConfig: 'tsconfig.build.json',
          outputPath:
            projectConfig.targets?.[options?.targetName ?? 'build']?.options?.outputPath ?? `dist/${projectRoot}`
        }
      },
      [options?.typecheckTargetName ?? 'typecheck']: {
        executor: 'nx:run-commands',
        inputs: ['production', '^production'],
        outputs: [],
        options: {
          command: 'tsc --noEmit',
          args: ['--project=tsconfig.build.json'],
          cwd: '{projectRoot}'
        }
      }
    }
  }
}

export const { createNodes, buildTarget } = buildPlugin(TscPlugin)
