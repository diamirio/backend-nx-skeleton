import { apply, forEach, mergeWith, Rule, SchematicContext, Source, Tree } from '@angular-devkit/schematics'
import * as micromatch from 'micromatch'
import { dirname, join, parse, relative } from 'path'
import { from } from 'rxjs'
import { map, mergeMap, scan } from 'rxjs/operators'

import { createApplicationRule } from './create-application.rule'
import { mergeFiles } from './overwrite-with-diff.rule'
import { GenerateExportsJinjaTemplateOptions } from '@src/templates/template-engine.interface'
import { getFilesInTree } from '@src/utils/file-system/file-system'
import { Logger } from '@src/utils/logger/logger'

export async function generateExportsRule (source: Source, host: Tree, context: SchematicContext, options: GenerateExportsJinjaTemplateOptions): Promise<Rule> {
  const log = new Logger(context)

  const files = getFilesInTree(host, (action) => action.kind !== 'd' && action.kind !== 'r')

  if (files.size === 0 || options.templates.length === 0) {
    return
  }

  const output: { [output: string]: string[] } = await from(files)
    .pipe(
      map((file) => {
        return options.templates.map(async (template) => {
          if (!Array.isArray(template.pattern)) {
            template.pattern = [ template.pattern ]
          }

          if (micromatch.isMatch(file.path, template.pattern, template.options)) {
            log.debug(`Generate export pattern "${template.pattern}" matches: "${file.path}"`)
            return { output: template.output, path: file.path }
          }
        })
      }),

      mergeMap(async (file) => {
        return await Promise.all(file)
      }),

      scan((acc, cur) => {
        if (cur) {
          cur.forEach((file) => {
            if (!file) {
              return
            }

            acc[file.output] = [ ...acc?.[file.output] ?? [], './' + relative(dirname(file.output), join(dirname(file.path), parse(file.path).name)) ]
          })
        }

        return acc
      }, {})
    )
    .toPromise()

  return (host: Tree): Rule => {
    return mergeWith(
      apply(source, [
        ...createApplicationRule(
          {
            multipleTemplates: Object.entries(output).map(([ path, files ]) => ({
              output: path,
              path: '__default__.ts.j2',
              factory: (): Record<string, unknown> => ({ files })
            }))
          },
          {
            root: options.root
          }
        ),
        forEach((file) => {
          if (host.exists(file.path)) {
            let buffer = file.content

            // check if this file is part of old application
            const currentFile = host.read(file.path).toString()
            const newFile = file.content.toString()

            const mergedFiles = mergeFiles(file.path, currentFile, null, newFile, log, { historical: false })

            if (typeof mergedFiles === 'string') {
              buffer = Buffer.from(mergedFiles, 'utf-8')

              host.overwrite(file.path, buffer)
            } else {
              log.error(`Can not merge file: "${file.path}" -> "${file.path}.old"`)

              host.rename(file.path, `${file.path}.old`)

              host.create(file.path, buffer)
            }
            // add this to file changes, return null since we did the operation directly
            return null
          }

          // vanilla mode
          return file
        })
      ])
    )
  }
}
