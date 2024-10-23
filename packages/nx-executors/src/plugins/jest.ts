import { existsSync } from 'node:fs'
import { join } from 'node:path'
import type { TargetConfiguration } from 'nx/src/config/workspace-json-project-json'
import { fileExists } from 'nx/src/utils/fileutils'

import type { BuildTargetOptions } from './utils/plugin'
import { buildPlugin, PluginBuilder } from './utils/plugin'

export interface JestPluginOptions {
  targetName?: string
  executor?: string
  testConfig?: string
  e2eTargetName?: string
  e2eExecutor?: string
  e2eTestConfig?: string
}

class JestPlugin extends PluginBuilder<JestPluginOptions> {
  name = 'jest'
  projectTypes = ['application', 'library']

  buildTarget ({ options, context, projectRoot }: BuildTargetOptions<JestPluginOptions>): Record<string, TargetConfiguration> {
    const cwd = join(context.workspaceRoot, projectRoot)

    options ??= {}
    options.testConfig ??= this.findConfigFile(cwd, 'jest.config')
    options.e2eTestConfig ??= this.findConfigFile(cwd, 'jest-e2e.config')

    if (!options.testConfig || !existsSync(join(cwd, options.testConfig))) {
      return {}
    }

    const targets: Record<string, TargetConfiguration> = {
      [options?.targetName ?? 'test']: {
        executor: options.executor ?? '@webundsoehne/nx-executors:jest',
        cache: true,
        inputs: ['default', '^default', '{workspaceRoot}/jest.preset.js', { externalDependencies: ['jest'] }],
        options: {
          jestConfig: options.testConfig,
          passWithNoTests: true,
          noStackTrace: true
        },
        configurations: {
          cov: {
            coverage: true
          }
        }
      }
    }

    if (options.e2eTestConfig && existsSync(join(cwd, options.e2eTestConfig))) {
      targets[options?.e2eTargetName ?? 'e2e'] = {
        executor: options.e2eExecutor ?? '@webundsoehne/nx-executors:jest',
        cache: true,
        inputs: ['default', '^default', '{workspaceRoot}/jest-e2e.preset.js', { externalDependencies: ['jest'] }],
        options: {
          jestConfig: options.e2eTestConfig,
          passWithNoTests: true,
          noStackTrace: true,
          runInBand: true
        },
        configurations: {
          cov: {
            coverage: true
          }
        }
      }
    }

    return targets
  }

  private findConfigFile (cwd: string, name: string, folder?: string[]): string {
    folder ??= ['test']

    const possibleFiles = [name, folder.map((path) => join(path, name))]
      .flat()
      .map((file) => [`${file}.js`, `${file}.ts`])
      .flat()

    for (const file of possibleFiles) {
      if (fileExists(join(cwd, file))) {
        return file
      }
    }
  }
}

export const { createNodes, createNodesV2, buildTarget, buildNodes } = buildPlugin(JestPlugin)
