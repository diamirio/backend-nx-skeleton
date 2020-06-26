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
        outputPath: join(normalize('dist'), options.root),
        index: join(options.root, 'src/index.html'),
        main: join(options.root, 'src/main.tsx'),
        polyfills: join(
          options.root,
          'src/polyfills.ts'
        ),
        tsConfig: join(options.root, 'tsconfig.build.json'),
        assets: [
          join(options.root, 'src/favicon.ico'),
          join(options.root, 'src/assets')
        ],
        scripts: [],
        webpackConfig: '@nrwl/react/plugins/webpack'
      },
      configurations: {
        production: {
          fileReplacements: [
            {
              replace: join(
                options.root,
                'src/environments/environment.ts'
              ),
              with: join(
                options.root,
                'src/environments/environment.prod.ts'
              )
            }
          ],
          optimization: true,
          outputHashing: 'all',
          sourceMap: false,
          extractCss: true,
          namedChunks: false,
          extractLicenses: true,
          vendorChunk: false,
          budgets: [
            {
              type: 'initial',
              maximumWarning: '2mb',
              maximumError: '5mb'
            }
          ]
        }
      }
    }

    architect.serve = {
      builder: '@webundsoehne/nx-tsc:serve',
      options: {
        entry: 'src/main.ts'
      }
    }

    architect.lint = generateProjectLint(
      normalize(options.root),
      join(normalize(options.root), 'tsconfig.app.json'),
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
