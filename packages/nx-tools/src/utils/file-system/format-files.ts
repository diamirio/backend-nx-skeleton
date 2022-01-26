import { noop, Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { ESLint } from 'eslint'
import * as path from 'path'
import prettier from 'prettier'
import { from, Observable } from 'rxjs'
import { filter, map, mergeMap } from 'rxjs/operators'

import { getFilesInTree } from '.'
import { FormatFilesOptions } from './format-files.interface'
import { findNxRoot, Logger } from '@utils'

/**
 * Format files as a rule in a tree.
 *
 * Requires configuration to be present in the current tree.
 *
 * Will use prettier first, others after.
 * @param options
 */
export function formatFilesRule (options?: FormatFilesOptions): Rule {
  options = {
    skip: false,
    prettier: true,
    eslint: true,
    ...options
  }

  // insanity check
  if (options.skip || !(options.prettier && options.eslint)) {
    return noop()
  }

  return (host: Tree, context: SchematicContext): Tree | Observable<Tree> => {
    const log = new Logger(context)

    const files = getFilesInTree(host, (action) => action.kind !== 'd' && action.kind !== 'r')

    if (files.size === 0) {
      return host
    }

    // get root path
    const appRootPath = findNxRoot({ throw: false }) ?? '/'

    log.debug(`Application root path for linting: ${appRootPath}`)

    let eslint: ESLint
    if (options.eslint) {
      // create new eslint instance
      eslint = new ESLint({
        fix: true
      })
    }

    // BUG: additional configuration for some weird bug fixes
    const prettierIgnored = [ 'custom-environment-variables.yml' ]

    return from(files).pipe(
      filter((file) => host.exists(file.path)),
      mergeMap(async (file) => {
        const systemPath = path.join(appRootPath, file.path)

        try {
          if (options.prettier) {
            let config: prettier.Options = {
              filepath: systemPath
            }

            const localConfig = await prettier.resolveConfig(systemPath)
            if (localConfig) {
              config = {
                ...config,
                ...localConfig
              }
            }

            const support = await prettier.getFileInfo(systemPath)
            if (support.ignored || !support.inferredParser || prettierIgnored.some((ignore) => file.path.includes(ignore))) {
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

          return
        } catch (e) {
          log.error(`Could not format ${file.path}:\n${e.message}`)
        }
      }),
      map(() => host)
    )
  }
}
