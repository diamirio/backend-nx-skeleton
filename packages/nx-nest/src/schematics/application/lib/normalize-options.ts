import { normalize } from '@angular-devkit/core'
import { Tree } from '@angular-devkit/schematics'
import { toFileName } from '@nrwl/workspace'
import { appsDir } from '@nrwl/workspace/src/utils/ast-utils'

import { NormalizedSchema, Schema } from '../schema'

export function normalizeOptions (
  host: Tree,
  options: Schema
): NormalizedSchema {
  const appDirectory = options.directory
    ? `${toFileName(options.directory)}/${toFileName(options.name)}`
    : toFileName(options.name)

  const appProjectName = appDirectory.replace(new RegExp('/', 'g'), '-')

  const appProjectRoot = normalize(`${appsDir(host)}/${appDirectory}`)

  return {
    ...options,
    name: toFileName(options.name),
    projectName: appProjectName,
    appProjectRoot
  }
}