import type { Rule } from '@angular-devkit/schematics'
import { join } from 'path'

import type { SchematicTargets } from '../interfaces/add-project.interface'
import type { NormalizedSchema } from '../main.interface'
import { AvailableLibraryTypes } from '@interfaces/available.constants'
import type { EnrichedProjectConfiguration } from '@webundsoehne/nx-tools'
import { AvailableTestsTypes, createWorkspaceProjectRule, generateProjectLintTarget, NxProjectTypes } from '@webundsoehne/nx-tools'

/**
 * Add the project to the {workspace,angular}.json
 * @param options Parsed schema
 */
export function addProject (options: NormalizedSchema): Rule {
  return (): Rule => {
    const targets: SchematicTargets = {} as SchematicTargets

    if (options.type === AvailableLibraryTypes.BUILDABLE) {
      targets.build = {
        executor: '@webundsoehne/nx-builders:tsc',
        options: {
          cwd: options.root,
          main: `${options.root}/src/main.ts`,
          outputPath: `dist/${options.root}`,
          tsConfig: `${options.root}/tsconfig.build.json`,
          swapPaths: true,
          assets: [
            {
              glob: '.dockerignore',
              input: `${options.root}`,
              output: '.'
            },
            {
              glob: 'Dockerfile',
              input: `${options.root}`,
              output: '.'
            },
            {
              glob: 'package-lock.json',
              input: '.',
              output: '.'
            }
          ]
        }
      }

      targets.serve = {
        executor: '@webundsoehne/nx-builders:tsc',
        options: {
          cwd: options.root,
          outputPath: `dist/${options.root}`,
          watch: true,
          main: join(options.root, 'src/main.ts'),
          tsConfig: join(options.root, 'tsconfig.json'),
          environment: {}
        }
      }
    }

    if (options.tests === AvailableTestsTypes.JEST) {
      targets.test = {
        executor: '@webundsoehne/nx-builders:run',
        options: {
          cwd: options.root,
          nodeOptions: '-r ts-node/register -r tsconfig-paths/register',
          node: true,
          watch: false,
          command: 'jest --config ./test/jest.config.js --passWithNoTests --detectOpenHandles',
          environment: {
            DEBUG_PORT: 9229
          }
        },
        configurations: {
          cov: {
            command: 'jest --config ./test/jest.config.js --passWithNoTests --coverage --detectOpenHandles',
            nodeOptions: '-r ts-node/register -r tsconfig-paths/register',
            node: true,
            environment: {}
          },

          dev: {
            command: 'jest --config ./test/jest.config.js --watchAll --passWithNoTests --runInBand --detectOpenHandles',
            nodeOptions: '-r ts-node/register -r tsconfig-paths/register --inspect=0.0.0.0:{{ debugPort | default(environment.DEBUG_PORT) }}',
            node: true,
            interactive: true,
            environment: {}
          }
        }
      }
    }

    targets.lint = generateProjectLintTarget(options)

    const project: EnrichedProjectConfiguration = {
      root: options.root,
      sourceRoot: options.sourceRoot,
      projectType: NxProjectTypes.LIB,
      targets
    }

    return createWorkspaceProjectRule(options.name, project)
  }
}
