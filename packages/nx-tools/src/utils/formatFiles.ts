import {
  CreateFileAction,
  noop,
  OverwriteFileAction,
  Rule,
  SchematicContext,
  Tree
} from '@angular-devkit/schematics'
import { findWorkspaceRoot } from '@nrwl/cli'
import * as path from 'path'
import { from, Observable } from 'rxjs'
import { filter, map, mergeMap } from 'rxjs/operators'

let prettier
let eslint
try {
  prettier = require('prettier')

  const { ESLint } = require('eslint')

  eslint = new ESLint()
} catch (e) {}

export function formatFiles (
  options: { skipFormat: boolean, prettier: boolean, eslint: boolean } = {
    skipFormat: false, prettier: true, eslint: false
  }
): Rule {
  const appRootPath = findWorkspaceRoot(process.cwd()).dir

  if (options.skipFormat || !prettier) {
    return noop()
  }

  // @ts-ignore
  return (host: Tree, context: SchematicContext): Tree | Observable<Tree> => {
    const files = new Set(
      host.actions
        .filter((action) => action.kind !== 'd' && action.kind !== 'r')
        .map((action: OverwriteFileAction | CreateFileAction) => ({
          path: action.path,
          content: action.content.toString()
        }))
    )

    if (files.size === 0) {
      return host
    }

    return from(files).pipe(
      filter((file) => host.exists(file.path)),
      mergeMap(async (file) => {
        const systemPath = path.join(appRootPath, file.path)
        let options: any = {
          filepath: systemPath
        }

        const resolvedOptions = await prettier.resolveConfig(systemPath)
        if (resolvedOptions) {
          options = {
            ...options,
            ...resolvedOptions
          }
        }

        const support = await prettier.getFileInfo(systemPath, options)
        if (support.ignored || !support.inferredParser) {
          return
        }

        try {
          host.overwrite(file.path, prettier.format(file.content, options))
        } catch (e) {
          context.logger.warn(
            `Could not format ${file.path} because ${e.message}`
          )
        }
      }),
      map(() => host)
    )

  }
}
