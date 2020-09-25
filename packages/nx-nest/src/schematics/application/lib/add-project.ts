/* eslint-disable @typescript-eslint/naming-convention */
import { join, normalize } from '@angular-devkit/core'
import { Rule } from '@angular-devkit/schematics'
import { generateProjectLint, updateWorkspaceInTree } from '@nrwl/workspace'
import { WorkspaceJSON } from '@webundsoehne/nx-tools'

import { SchematicArchitect } from '../interfaces/add-project.interface'
import { NormalizedSchema } from '../main.interface'

export function addProject (options: NormalizedSchema): Rule {
  return updateWorkspaceInTree((json: WorkspaceJSON<SchematicArchitect>) => {
    const architect: SchematicArchitect = {} as SchematicArchitect

    architect.build = {
      builder: '@webundsoehne/nx-builders:tsc',
      options: {
        cwd: options.root,
        main: `${options.root}/src/main.ts`,
        outputPath: `dist/${options.directory}`,
        tsConfig: `${options.root}/tsconfig.build.json`,
        swapPaths: true,
        assets: [
          {
            glob: '*',
            input: `${options.root}/config`,
            output: 'config'
          }
        ]
      }
    }

    // prefer server mode
    if (options.components.includes('server')) {
      architect.serve = {
        builder: '@webundsoehne/nx-builders:ts-node-dev',
        options: {
          cwd: options.root,
          main: join(options.root, 'src/main.ts'),
          tsConfig: join(options.root, 'tsconfig.json'),
          environment: {
            NODE_SERVICE: 'server'
          }
        }
      }
    } else if (options.components.includes('microservice-server')) {
      architect.serve = {
        builder: '@webundsoehne/nx-builders:ts-node-dev',
        options: {
          cwd: options.root,
          main: join(options.root, 'src/main.ts'),
          tsConfig: join(options.root, 'tsconfig.json'),
          environment: {
            NODE_SERVICE: 'microservice-server'
          }
        }
      }
    }

    if (options.components.includes('bgtask')) {
      architect.bgtask = {
        builder: '@webundsoehne/nx-builders:ts-node-dev',
        options: {
          cwd: options.root,
          main: join(options.root, 'src/main.ts'),
          tsConfig: join(options.root, 'tsconfig.json'),
          environment: {
            NODE_CONFIG_DIR: join(options.root, 'config/'),
            NODE_SERVICE: 'bgtask'
          }
        }
      }
    }

    if (options.tests === 'jest') {
      architect.test = {
        builder: '@nrwl/jest:jest',
        options: {
          jestConfig: join(normalize(options.root), 'test/jest.config.js'),
          tsConfig: join(normalize(options.root), 'test/tsconfig.json'),
          passWithNoTests: true
        }
      }
    }

    architect.lint = generateProjectLint(normalize(options.root), join(normalize(options.root), 'tsconfig.json'), options.linter)

    json.projects[options.name] = {
      root: options.root,
      sourceRoot: join(options.root, 'src'),
      projectType: 'application',
      schematics: {},
      architect
    }

    return json
  })
}
