import { CreateFileAction, noop, OverwriteFileAction, Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { findWorkspaceRoot } from '@nrwl/cli/lib/find-workspace-root'
import { ESLint } from 'eslint'
import * as path from 'path'
import prettier from 'prettier'
import { from, Observable } from 'rxjs'
import { filter, map, mergeMap } from 'rxjs/operators'

import { FormatFilesOptions } from './format-files.interface'
import { Logger } from '@utils'

/**
 * Format files as a rule in a tree.
 *
 * Requires configuration to be present in the current tree.
 *
 * Will use prettier first, others after.
 * @param options
 */
export function formatFiles (
  options: FormatFilesOptions = {
    skipFormat: false,
    prettier: true,
    eslint: false
  }
): Rule {
  // insanity check
  if (options.skipFormat || !(options.prettier && options.eslint)) {
    return noop()
  }

  return (((host: Tree, context: SchematicContext): Tree | Observable<Tree> => {
    const log = new Logger(context)
    // get root path
    const appRootPath = findWorkspaceRoot(process.cwd())?.dir ?? '/'

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

    let eslint: ESLint
    if (options.eslint) {
      // create new eslint instance
      eslint = new ESLint({
        fix: true
      })
    }

    return from(files).pipe(
      filter((file) => host.exists(file.path)),
      mergeMap(async (file) => {
        const systemPath = path.join(appRootPath, file.path)

        try {
          if (options.prettier) {
            let config: any = {
              filepath: systemPath
            }

            const localConfig = await prettier.resolveConfig(systemPath)
            if (localConfig) {
              config = {
                ...config,
                ...localConfig
              }
            }

            const support = await prettier.getFileInfo(systemPath, config)
            if (support.ignored || !support.inferredParser) {
              return
            }

            // dont remove await, eventhough it is not marked as promise it is
            file.content = await prettier.format(file.content, config)
          }

          if (options.eslint) {
            const config: any = {
              filePath: systemPath
            }

            // have to exclude json files manually until i found a better solution because overriding exts not work with lintText!
            if (await eslint.isPathIgnored(systemPath)) {
              return
            }

            const results = await eslint.lintText(file.content, config)

            if (results?.[0]?.output) {
              file.content = results[0].output
            }
          }

          host.overwrite(file.path, file.content)
        } catch (e) {
          log.error(`Could not format ${file.path}:\n${e.message}`)
        }
      }),
      map(() => host)
    )
  }) as unknown) as Rule
}
