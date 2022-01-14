import { normalize } from '@angular-devkit/core'
import { Rule } from '@angular-devkit/schematics'
import { Tree } from '@nrwl/devkit'
import { generateProjectLint } from '@nrwl/workspace'
import { join } from 'path'

import { NormalizedSchema } from '../main.interface'
import { createWorkspaceProject, NxProjectTypes } from '@webundsoehne/nx-tools'

export function addProject (host: Tree, options: NormalizedSchema): Rule {
  // we dont need to enforce types here, since it is only going to be linting
  const targets: Record<string, any> = {}

  targets.lint = generateProjectLint(normalize(options.root), join(normalize(options.root), 'tsconfig.json'), options.linter, [
    `${options.root}/**/*.ts`,
    `${options.root}/**/*.js`
  ])

  const project = {
    root: normalize(options.root),
    sourceRoot: join(normalize(options.root), options.sourceRoot),
    projectType: NxProjectTypes.LIB,
    targets
  }

  return createWorkspaceProject(host, options.name, project)
}
