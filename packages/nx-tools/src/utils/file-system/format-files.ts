import type { Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { noop } from '@angular-devkit/schematics'
import { ESLint } from 'eslint'
import { EOL } from 'os'
import * as path from 'path'
import type * as Prettier from 'prettier'
import * as prettier from 'prettier'
import type { Observable } from 'rxjs'
import { from } from 'rxjs'

import { getFilesInTree } from '.'
import type { FormatFilesOptions } from './format-files.interface'
import { findNxRoot, isVerbose, Logger } from '@utils'

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

  const processed = {
    ignored: [],
    prettier: { formatted: [], ignored: [] },
    eslint: {
      formatted: [],
      ignored: [],
      clean: []
    }
  }

  const isDebug = isVerbose()

  let eslint: ESLint

  if (options.eslint) {
    // create new eslint instance
    eslint = new ESLint({
      fix: true
    })
  }

  return (host: Tree, context: SchematicContext): Tree | Observable<Tree> => {
    const log = new Logger(context)

    const files = getFilesInTree(host, (action) => action.kind !== 'd' && action.kind !== 'r')

    if (files.size === 0) {
      return host
    }

    // get root path
    const appRootPath = findNxRoot({ throw: false }) ?? '/'

    log.debug('Formatting and linting: tree %s in %s, running with options %o', host.root.path, appRootPath, options)

    // BUG: additional configuration for some weird bug fixes
    const prettierIgnored = ['custom-environment-variables.yml']

    // this should be much faster than the observable approach that angular directly supports
    // things were getting slow with it
    return from(
      (async (): Promise<Tree> => {
        const start = Date.now()

        await Promise.all(
          Array.from(files.values()).map(async (file) => {
            if (!host.exists(file.path)) {
              if (isDebug) {
                processed.ignored.push(file.path)
              }

              return
            }

            const systemPath = path.join(appRootPath, file.path)

            try {
              if (options.prettier) {
                const start = Date.now()

                let config: Prettier.Options = {
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
                  if (isDebug) {
                    processed.prettier.ignored.push({ path: file.path, time: Date.now() - start })
                  }

                  return
                }

                // dont remove await, even though it is not marked as promise it is
                // eslint-disable-next-line @typescript-eslint/await-thenable
                file.content = await prettier.format(file.content, config)

                if (isDebug) {
                  processed.prettier.formatted.push({ path: file.path, time: Date.now() - start })
                }
              }

              if (options.eslint) {
                const start = Date.now()

                // have to exclude json files manually until i found a better solution because overriding exts not work with lintText!
                if (await eslint.isPathIgnored(systemPath)) {
                  if (isDebug) {
                    processed.eslint.ignored.push({ path: file.path, time: Date.now() - start })
                  }

                  return
                }

                const results = await eslint.lintText(file.content, { filePath: systemPath })

                if (results?.[0]?.output) {
                  file.content = results[0].output

                  if (isDebug) {
                    processed.eslint.formatted.push({ path: file.path, time: Date.now() - start })
                  }
                } else if (isDebug) {
                  processed.eslint.clean.push({ path: file.path, time: Date.now() - start })
                }
              }

              host.overwrite(file.path, file.content)

              return
            } catch (e) {
              log.error('Could not format %s:%s%s', file.path, EOL, e.message)
            }
          })
        )

        log.debug('Formatted and linted files: %o in %ss', processed, (Date.now() - start) / 1000)

        return host
      })()
    )
  }
}
