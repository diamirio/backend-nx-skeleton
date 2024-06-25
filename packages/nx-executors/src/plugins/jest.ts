import { existsSync } from 'node:fs'
import { join } from 'node:path'
import type { TargetConfiguration } from 'nx/src/config/workspace-json-project-json'

import type { BuildTargetOptions } from './utils/plugin'
import { buildPlugin, PluginBuilder } from './utils/plugin'

export interface JestPluginOptions {
  targetName?: string
  executor?: string
  testConfig?: string
  e2eTestConfig?: string
}

class JestPlugin extends PluginBuilder<JestPluginOptions> {
  name = 'jest'
  targetName = 'test'
  projectTypes = ['application', 'library']

  buildTarget ({ options, context, projectRoot }: BuildTargetOptions<JestPluginOptions>): TargetConfiguration {
    const cwd = join(context.workspaceRoot, projectRoot)

    options ??= {}
    options.testConfig ??= './test/jest.config.ts'
    options.e2eTestConfig ??= './test/jest-e2e.config.ts'

    if (!existsSync(join(cwd, options.testConfig))) {
      return {}
    }

    const testTarget: TargetConfiguration = {
      executor: options.executor ?? '@webundsoehne/nx-executors:jest',
      cache: true,
      options: {
        jestConfig: options.testConfig,
        passWithNoTests: true,
        detectOpenHandles: true,
        noStackTrace: true,
        env: {
          NODE_ENV: 'development', // config-package: hide NODE_ENV value of '..' did not match any deployment files
          SUPPRESS_NO_CONFIG_WARNING: 'true' // config-package: hide warning that config folder is missing
        }
      },
      configurations: {
        cov: {
          coverage: true
        }
      }
    }

    if (existsSync(join(cwd, options.e2eTestConfig))) {
      testTarget.configurations = {
        ...testTarget.configurations,
        e2e: {
          jestConfig: options.e2eTestConfig,
          runInBand: true
        }
      }
    }

    return testTarget
  }
}

export const { createNodes, createNodesV2, buildTarget, buildNodes } = buildPlugin(JestPlugin)
