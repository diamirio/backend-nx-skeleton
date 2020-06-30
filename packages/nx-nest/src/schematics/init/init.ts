import { JsonObject } from '@angular-devkit/core'
import { chain, Rule, noop } from '@angular-devkit/schematics'
import {
  addDepsToPackageJson, setDefaultCollection,
  updateWorkspace,
  addPackageWithInit
} from '@nrwl/workspace'

import { NormalizedSchema } from '@src/schematics/application/main.interface'
import { calculateDependencies } from '@src/utils/versions'

function setDefault (): Rule {
  const updateThisWorkspace = updateWorkspace((workspace) => {
    // Also generate all new react apps with babel.
    workspace.extensions.schematics =
      jsonIdentity(workspace.extensions.schematics) || {}

  })

  return chain([ setDefaultCollection('@webundsoehne/nx-nest'), updateThisWorkspace ])
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