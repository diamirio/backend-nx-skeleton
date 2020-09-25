/* eslint-disable @typescript-eslint/naming-convention */
import { join, normalize } from '@angular-devkit/core'
import { Rule } from '@angular-devkit/schematics'
import { generateProjectLint, updateWorkspaceInTree } from '@nrwl/workspace'
import { WorkspaceJSON } from '@webundsoehne/nx-tools'

import { NormalizedSchema } from '../main.interface'

export function addProject (options: NormalizedSchema): Rule {
  return updateWorkspaceInTree((json: WorkspaceJSON) => {
    const architect: any = {}

    architect.lint = generateProjectLint(normalize(options.root), join(normalize(options.root), 'tsconfig.json'), options.linter)

    json.projects[options.name] = {
      root: options.root,
      sourceRoot: join(options.root, 'src'),
      projectType: 'library',
      schematics: {},
      architect
    }

    return json
  })
}
