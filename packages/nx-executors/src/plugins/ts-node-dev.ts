import type { TargetConfiguration } from 'nx/src/config/workspace-json-project-json'

import type { BuildTargetOptions } from './utils/plugin'
import { buildPlugin, PluginBuilder } from './utils/plugin'

export interface TsNodeDevPluginOptions {
  targetName?: string
  executor?: string
}

class TsNodeDevPlugin extends PluginBuilder<TsNodeDevPluginOptions> {
  name = 'ts-node-dev'
  targetName = 'serve'

  buildTarget ({ options, projectConfig }: BuildTargetOptions<TsNodeDevPluginOptions>): TargetConfiguration {
    const target: TargetConfiguration = {
      executor: options?.executor ?? '@webundsoehne/nx-executors:ts-node-dev',
      options: {
        main: 'src/main.ts',
        tsConfig: 'tsconfig.build.json'
      }
    }
    const nodeService = this.guessNodeService(projectConfig?.integration?.nestjs?.components ?? [])

    if (nodeService) {
      target.options.env = { NODE_SERVICE: nodeService }
    }

    return target
  }

  private guessNodeService (components: string[]): string {
    for (const service of ['server', 'bgtask', 'microservice-server']) {
      if (components.includes(service)) {
        return service
      }
    }
  }
}

export const { createNodes, createNodesV2, buildTarget, buildNodes } = buildPlugin(TsNodeDevPlugin)
