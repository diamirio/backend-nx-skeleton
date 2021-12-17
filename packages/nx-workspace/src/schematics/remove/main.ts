import { chain, Rule } from '@angular-devkit/schematics'
import { checkProjectExists } from '@nrwl/workspace/src/utils/rules/check-project-exists'

import { checkDependencies } from './lib/check-dependencies'
import { checkTargets } from './lib/check-targets'
import { removeProject } from './lib/remove-project'
import { updateNxJson } from './lib/update-nx-json'
import { updateTsconfig } from './lib/update-tsconfig'
import { updateWorkspace } from './lib/update-workspace'
import { Schema } from './main.interface'
import { formatOrSkip } from '@webundsoehne/nx-tools'

export default function (schema: Schema): Rule {
  return chain([
    checkProjectExists(schema),
    checkDependencies(schema),
    checkTargets(schema),
    removeProject(schema) as any,
    updateNxJson(schema),
    // will change this one
    updateTsconfig(schema),
    updateWorkspace(schema),
    formatOrSkip(null, schema.skipFormat, { eslint: true, prettier: true })
  ])
}
