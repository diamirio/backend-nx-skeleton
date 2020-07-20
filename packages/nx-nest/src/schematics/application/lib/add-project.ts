import { join, normalize } from '@angular-devkit/core'
import { Rule } from '@angular-devkit/schematics'
import { generateProjectLint, updateWorkspaceInTree } from '@nrwl/workspace'

import { ProjectArchitect } from './add-project.interface'
import { NormalizedSchema } from '@src/schematics/application/main.interface'

export function addProject (options: NormalizedSchema): Rule {
  return updateWorkspaceInTree((json) => {
    const architect: ProjectArchitect = {} as ProjectArchitect

    architect.build = {
      builder: '@webundsoehne/nx-builders:tsc',
      options: {
        cwd: options.root,
        main: `${options.root}/src/main.ts`,
        outputPath: `dist/${options.directory}`,
        tsConfig: `${options.root}/tsconfig.build.json`,
        swapPaths: true,
        assets: [ `${options.root}/config/` ]
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

    architect.test = {
      builder: '@nrwl/jest:jest',
      options: {
        jestConfig: join(normalize(options.root), 'test/jest.config.js'),
        tsConfig: join(normalize(options.root), 'test/tsconfig.json'),
        passWithNoTests: true
      }
    }

    architect.lint = generateProjectLint(
      normalize(options.root),
      join(normalize(options.root), 'tsconfig.json'),
      options.linter
    )

    json.projects[options.name] = {
      root: options.root,
      sourceRoot: join(options.root, 'src'),
      projectType: 'application',
      schematics: {},
      architect
    }

    json.defaultProject = json.defaultProject || options.name

    return json
  })
}
