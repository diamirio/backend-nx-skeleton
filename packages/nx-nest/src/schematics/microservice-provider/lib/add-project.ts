import { normalize } from '@angular-devkit/core'
import { Rule } from '@angular-devkit/schematics'
import { generateProjectLint, updateWorkspaceInTree } from '@nrwl/workspace'
import { EnrichedWorkspaceJson, NxProjectTypes } from '@webundsoehne/nx-tools'
import { join } from 'path'

import { NormalizedSchema } from '../main.interface'

export function addProject (options: NormalizedSchema): Rule {
  return updateWorkspaceInTree<EnrichedWorkspaceJson>((json) => {
    // we dont need to enforce types here, since it is only going to be linting
    const architect: any = {}

    architect.lint = generateProjectLint(normalize(options.root), join(normalize(options.root), 'tsconfig.json'), options.linter, [ '*.ts', '*.js' ])

    json.projects[options.name] = {
      root: normalize(options.root),
      sourceRoot: join(normalize(options.root), options.sourceRoot),
      projectType: NxProjectTypes.LIB,
      schematics: {},
      architect
    }

    return json
  })
}
