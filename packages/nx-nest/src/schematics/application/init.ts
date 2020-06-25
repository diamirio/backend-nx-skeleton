import { JsonObject } from '@angular-devkit/core'
import { chain, noop, Rule } from '@angular-devkit/schematics'
import {
  addPackageWithInit,
  setDefaultCollection,
  updateWorkspace,
  addDepsToPackageJson
} from '@nrwl/workspace'

import { Schema, NormalizedSchema } from '@application/schema'

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
  return chain([
    setDefault(),
    // addPackageWithInit('@nestjs/schematics'),
    // schema.tests === 'jest'
    // ? addPackageWithInit('@nrwl/jest')
    // : noop(),
    addDepsToPackageJson(
      {
      },
      {
      }
    )
  ])
}