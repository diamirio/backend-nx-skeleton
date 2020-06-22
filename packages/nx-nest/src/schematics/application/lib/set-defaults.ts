import { JsonObject } from '@angular-devkit/core'
import { noop, Rule } from '@angular-devkit/schematics'
import { updateWorkspace } from '@nrwl/workspace'

import { NormalizedSchema } from '../schema'

export function setDefaults (options: NormalizedSchema): Rule {
  return noop()
}

function jsonIdentity (x: any): JsonObject {
  return x as JsonObject
}