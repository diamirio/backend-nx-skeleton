import { JsonObject } from '@angular-devkit/core'
import { chain, Rule, SchematicContext } from '@angular-devkit/schematics'
import {
  addDepsToPackageJson,
  updateWorkspace
} from '@nrwl/workspace'
import { installWorkspaceDependencies } from '@webundsoehne/nx-tools'

import { NormalizedSchema } from '@src/schematics/application/main.interface'
import { calculateDependencies } from '@src/utils/versions'

function setDefault (): Rule {
  const updateThisWorkspace = updateWorkspace((workspace) => {
    // Also generate all new react apps with babel.
    workspace.extensions.schematics =
      jsonIdentity(workspace.extensions.schematics) || {}

  })

  return chain([ updateThisWorkspace ])
}

function jsonIdentity (x: any): JsonObject {
  return x as JsonObject
}

export default function (schema: NormalizedSchema): Rule {
  const dependencies = calculateDependencies(schema)

  return chain([
    setDefault(),
    addDepsToPackageJson(
      dependencies.prod,
      dependencies.dev
    )
  ])
}