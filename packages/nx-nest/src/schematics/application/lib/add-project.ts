import { normalize } from '@angular-devkit/core'
import { Rule, Tree } from '@angular-devkit/schematics'
import { generateProjectLint, readNxJson } from '@nrwl/workspace'
import { join } from 'path'

import { SchematicTargets } from '../interfaces/add-project.interface'
import { SchematicFilesMap } from '../interfaces/file.constants'
import { NormalizedSchema } from '../main.interface'
import { AvailableComponents, AvailableDBAdapters, AvailableExtensions, AvailableTestsTypes } from '@interfaces/available.constants'
import { SchematicConstants } from '@src/interfaces'
import { createWorkspaceProjectRule, EnrichedProjectConfiguration, NxProjectTypes } from '@webundsoehne/nx-tools'

/**
 * Add the project to the {workspace,angular}.json
 * @param options Parsed schema
 */
export function addProject (host: Tree, options: NormalizedSchema): Rule {
  const targets: SchematicTargets = {} as SchematicTargets

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
          glob: '*',
          input: `${options.root}/config`,
          output: 'config'
        },
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

  // prefer server mode
  if (options.components.includes(AvailableComponents.SERVER)) {
    targets.serve = {
      executor: '@webundsoehne/nx-builders:ts-node-dev',
      options: {
        cwd: options.root,
        main: join(options.root, 'src/main.ts'),
        tsConfig: join(options.root, 'tsconfig.json'),
        environment: {
          NODE_SERVICE: 'server'
        }
      }
    }
  } else if (options.components.includes(AvailableComponents.MICROSERVICE_SERVER)) {
    targets.serve = {
      executor: '@webundsoehne/nx-builders:ts-node-dev',
      options: {
        cwd: options.root,
        main: join(options.root, 'src/main.ts'),
        tsConfig: join(options.root, 'tsconfig.json'),
        environment: {
          NODE_SERVICE: 'microservice-server'
        }
      }
    }
  } else if (options.components.includes(AvailableComponents.BG_TASK)) {
    targets.serve = {
      executor: '@webundsoehne/nx-builders:ts-node-dev',
      options: {
        cwd: options.root,
        main: join(options.root, 'src/main.ts'),
        tsConfig: join(options.root, 'tsconfig.json'),
        environment: {
          NODE_SERVICE: 'bgtask'
        }
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
        },

        e2e: {
          command: 'jest --config ./test/jest.e2e-config.js --passWithNoTests --runInBand --detectOpenHandles',
          nodeOptions: '-r ts-node/register -r tsconfig-paths/register',
          node: true,
          environment: {}
        }
      }
    }
  }

  if (options.components.includes(AvailableComponents.COMMAND)) {
    targets.command = {
      executor: '@webundsoehne/nx-builders:run',
      options: {
        cwd: options.root,
        command: 'nestjs-command',
        nodeOptions: '-r tsconfig-paths/register',
        node: true,
        watch: false,
        interactive: true,
        environment: {
          CLI_PATH: './src/main.ts'
        }
      }
    }
  }

  if (options.dbAdapters === AvailableDBAdapters.TYPEORM) {
    const configurationBasePath = options.extensions.includes(AvailableExtensions.EXTERNAL_BACKEND_INTERFACES)
      ? join(readNxJson().workspaceLayout.libsDir, SchematicConstants.BACKEND_INTERFACES_PACKAGE)
      : join(options.sourceRoot, SchematicFilesMap.UTILS)

    targets.migration = {
      executor: '@webundsoehne/nx-builders:run',
      options: {
        cwd: options.root,
        nodeOptions: '-r ts-node/register -r tsconfig-paths/register',
        node: true,
        watch: false,
        environment: {}
      },
      configurations: {
        run: {
          command: `typeorm migration:run --config=${join(configurationBasePath, 'orm.config.ts')}`
        },
        'mock-run': {
          command: `typeorm migration:run --config=${join(configurationBasePath, 'mock-orm.config.ts')}`
        },
        create: {
          command: `typeorm migration:create --config=${join(configurationBasePath, 'orm.config.ts')} -n`
        },
        generate: {
          command: `typeorm migration:generate --config=${join(configurationBasePath, 'orm.config.ts')} -n`
        },
        rollback: {
          command: `typeorm migration:revert --config=${join(configurationBasePath, 'orm.config.ts')}`
        }
      }
    }

    targets.seed = {
      executor: '@webundsoehne/nx-builders:run',
      options: {
        cwd: options.root,
        command: `typeorm-seeding --configName=${join(configurationBasePath, 'orm.config.ts')} seed`,
        nodeOptions: '-r ts-node/register -r tsconfig-paths/register',
        node: true,
        watch: false,
        environment: {}
      }
    }
  }

  targets.lint = generateProjectLint(normalize(options.root), join(normalize(options.root), 'tsconfig.json'), options.linter, [
    `${options.root}/**/*.ts`,
    `${options.root}/**/*.js`
  ])

  const project: EnrichedProjectConfiguration = {
    root: options.root,
    sourceRoot: options.sourceRoot,
    projectType: NxProjectTypes.APP,
    targets
  }

  return createWorkspaceProjectRule(options.name, project)
}
