import { join, normalize } from '@angular-devkit/core'
import { Rule } from '@angular-devkit/schematics'
import { generateProjectLint, updateWorkspaceInTree } from '@nrwl/workspace'

import { NormalizedSchema } from '@application/schema'

export function addProject (options: NormalizedSchema): Rule {
  return updateWorkspaceInTree((json) => {
    const architect: { [key: string]: any } = {}

    architect.build = {
      builder: '@webundsoehne/nx-tsc:build',
      options: {
        outputPath: `dist/${options.directory}`,
        tsConfig: `${options.root}/tsconfig.build.json`,
        packageJson: `${options.root}/package.json`,
        main: `${options.root}/src/main.ts`
      }
    }

    // prefer server mode
    if (options.components.includes('server')) {
      architect.serve = {
        builder: '@webundsoehne/nx-tsc:serve',
        options: {
          entry: join(options.root, 'src/main.ts'),
          tsConfig: join(options.root, 'tsconfig.json'),
          environment: {
            NODE_CONFIG_DIR: join(options.root, 'config/'),
            NODE_SERVICE: 'server'
          }
        }
      }
    }

    if (options.components.includes('bgtask')) {
      architect.bgtask = {
        builder: '@webundsoehne/nx-tsc:serve',
        options: {
          entry: join(options.root, 'src/main.ts'),
          tsConfig: join(options.root, 'tsconfig.json'),
          environment: {
            NODE_CONFIG_DIR: join(options.root, 'config/'),
            NODE_SERVICE: 'bgtask'
          }
        }
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
