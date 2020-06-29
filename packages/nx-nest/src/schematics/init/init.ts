import { JsonObject } from '@angular-devkit/core'
import { chain, noop, Rule } from '@angular-devkit/schematics'
import {
  addPackageWithInit,
  setDefaultCollection,
  updateWorkspace,
  addDepsToPackageJson,
  updatePackageJsonDependencies
} from '@nrwl/workspace'

import { Schema, NormalizedSchema } from '@application/schema'
import { baseDeps, restServerDeps } from '@src/utils/versions'

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
    // addPackageWithInit('@nrwl/linter'),
    // schema.tests === 'jest'
    // ? addPackageWithInit('@nrwl/jest')
    // : noop(),
    // base dependencies
    addDepsToPackageJson(
      baseDeps.prod,
      baseDeps.dev
    ),
    // server specific dependencies
    schema.components.includes('server') && schema.server === 'restful' ?
      addDepsToPackageJson(
        restServerDeps.prod,
        restServerDeps.dev
      )
      : noop()
  ])
}