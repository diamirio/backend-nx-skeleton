import { normalize } from '@angular-devkit/core'
import { Rule } from '@angular-devkit/schematics'
import { generateProjectLint, updateWorkspaceInTree } from '@nrwl/workspace'
import { EnrichedWorkspaceJson } from '@webundsoehne/nx-tools'
import { join } from 'path'

import { NormalizedSchema } from '../main.interface'

export function addProject (options: NormalizedSchema): Rule {
  return updateWorkspaceInTree<EnrichedWorkspaceJson>((json) => {
    const architect: any = {}

    architect.lint = generateProjectLint(normalize(options.root), join(normalize(options.root), 'tsconfig.json'), options.linter, [ '*.ts', '*.js' ])

    json.projects[options.name] = {
      root: options.root,
      sourceRoot: join(normalize(options.root), 'src'),
      projectType: 'library',
      schematics: {},
      architect
    }

    return json
  })
}
