import { apply, Rule, SchematicContext, Source, Tree } from '@angular-devkit/schematics'
import * as micromatch from 'micromatch'
import { dirname, join, parse, relative } from 'path'

import { createApplicationRule } from './create-application.rule'
import { GenerateExportsJinjaTemplateOptions } from '@rules/generate-exports.rule.interface'
import { applyOverwriteWithDiff } from '@rules/overwrite-with-diff.rule'
import { MultipleJinjaTemplateTemplates } from '@templates/template-engine.interface'
import { convertStringToDirPath, Logger } from '@utils'
import { deepMergeWithUniqueMergeArray } from '@webundsoehne/deep-merge'

/**
 * Generates from given template. Will search for multiple files that match the import case and will export them from root of the output file.
 * @param source
 * @param options
 * @param templatePath
 */
export function generateExportsRule (source: Source, options: GenerateExportsJinjaTemplateOptions, templatePath: MultipleJinjaTemplateTemplates['path']): Rule {
  return (host: Tree, context: SchematicContext): Rule => {
    let output: Record<string, string[]>

    // should use dot to not go crazy with node_modules
    const micromatchDefaultOptions: micromatch.Options = { fastpaths: false, dot: true }

    const log = new Logger(context)

    // parse the host tree first generate which files to output
    host.getDir(options.root).visit((file) => {
      if (micromatch.isMatch(file, [ '**/node_modules/**/*' ], micromatchDefaultOptions)) {
        return
      }

      // if we dont overwrite the file with filechanges we do not need it, but it exists in tree which is the current host sysstem
      output = deepMergeWithUniqueMergeArray(
        output,
        options.templates.reduce((o, template) => {
          if (!Array.isArray(template.pattern)) {
            template.pattern = [ template.pattern ]
          }

          if (micromatch.isMatch(file, template.pattern, { ...micromatchDefaultOptions, ...template.options })) {
            log.debug(`Generate export pattern "${template.pattern.join(', ')}" matches: "${file}"`)

            o = deepMergeWithUniqueMergeArray(o, {
              [template.output]: [
                './' +
                  join(
                    relative(
                      convertStringToDirPath(dirname(join(template?.cwd ?? options.root, template.output)), { start: true, end: false }),
                      convertStringToDirPath(dirname(file), { start: true, end: false })
                    ),
                    parse(file).name
                  )
              ]
            })
          }

          return o
        }, {} as Record<string, string[]>)
      )
    })

    if (!output || Object.keys(output).length === 0) {
      log.warn('Can not generate exports, because there is no file matched.')
      return
    }

    return applyOverwriteWithDiff(
      apply(source, [
        ...createApplicationRule(
          {
            multipleTemplates: [
              {
                templates: Object.entries(output).map(([ output, files ]) => ({
                  output,
                  path: templatePath,
                  factory: (): Record<string, unknown> => ({ files })
                }))
              }
            ]
          },
          { root: options.root }
        )
      ]),
      null,
      context
    )
  }
}
