import { JsonObject } from '@angular-devkit/core'
import { chain, noop, Rule } from '@angular-devkit/schematics'
import {
  addPackageWithInit,
  setDefaultCollection,
  updateWorkspace,
  addDepsToPackageJson
} from '@nrwl/workspace'

import { nxVersion } from '../../utils/versions'
import { Schema } from './schema'

function setDefault (): Rule {
  const updateReactWorkspace = updateWorkspace((workspace) => {
    // Also generate all new react apps with babel.
    workspace.extensions.schematics =
      jsonIdentity(workspace.extensions.schematics) || {}
    const reactSchematics =
      jsonIdentity(workspace.extensions.schematics['@nrwl/react']) || {}

    workspace.extensions.schematics = {
      ...workspace.extensions.schematics,
      '@nrwl/react': {
        ...reactSchematics,
        application: {
          ...jsonIdentity(reactSchematics.application),
          babel: true
        }
      }
    }
  })
  return chain([ setDefaultCollection('@nrwl/react'), updateReactWorkspace ])
}

function jsonIdentity (x: any): JsonObject {
  return x as JsonObject
}

export default function (schema: Schema): Rule {
  return chain([
    setDefault(),
    schema.tests === 'jest'
      ? addPackageWithInit('@nrwl/jest')
      : noop(),
    addDepsToPackageJson(
      {
      },
      {
        '@nrwl/react': nxVersion
      }
    )
  ])
}