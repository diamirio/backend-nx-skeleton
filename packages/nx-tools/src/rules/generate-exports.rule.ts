import type { Rule, SchematicContext, Source, Tree } from '@angular-devkit/schematics'
import { apply } from '@angular-devkit/schematics'
import * as micromatch from 'micromatch'
import { dirname, join, parse, relative } from 'path'

import { createApplicationRule } from './create-application.rule'
import type { GenerateExportsJinjaTemplateOptions } from '@rules/generate-exports.rule.interface'
import { applyOverwriteWithDiff } from '@rules/overwrite-with-diff.rule'
import type { MultipleJinjaTemplateTemplates } from '@templates/template-engine.interface'
import { convertStringToDirPath, Logger } from '@utils'
import { ArrayMergeBehavior, merge } from '@webundsoehne/deep-merge'

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
      if (micromatch.isMatch(file, ['**/node_modules/**/*'], micromatchDefaultOptions)) {
        return
      }

      // if we dont overwrite the file with filechanges we do not need it, but it exists in tree which is the current host sysstem
      output = merge(
        { arrayMerge: ArrayMergeBehavior.UNIQUE },
        output,
        options.templates.reduce<Record<string, string[]>>((o, template) => {
          if (!Array.isArray(template.pattern)) {
            template.pattern = [template.pattern]
          }

          const root = template?.cwd ?? options.root

          const pattern = [...template.pattern, '!/' + join(root, template.output)]

          if (micromatch.all(file, pattern, { ...micromatchDefaultOptions, ...template.options })) {
            log.debug('Generate export pattern "%s" matches: "%s"', pattern.join(', '), file)

            o = merge({ arrayMerge: ArrayMergeBehavior.UNIQUE }, o, {
              [template.output]: [
                './' +
                  join(
                    relative(
                      convertStringToDirPath(dirname(join(root, template.output)), { start: true, end: false }),
                      convertStringToDirPath(dirname(file), { start: true, end: false })
                    ),
                    parse(file).name
                  )
              ]
            })
          }

          return o
        }, {})
      )
    })

    if (!output || Object.keys(output).length === 0) {
      log.warn('Nothing to export no file has been matched with the given pattern.')

      output = merge(
        null,
        output,
        options.templates.reduce<Record<string, string[]>>((o, template) => {
          log.debug('Generate empty export file: "%s"', template.output)

          o = merge({ arrayMerge: ArrayMergeBehavior.UNIQUE }, o, {
            [template.output]: []
          })

          return o
        }, {})
      )
    }

    return applyOverwriteWithDiff(
      apply(source, [
        ...createApplicationRule(
          {
            format: false,

            multipleTemplates: [
              {
                templates: Object.entries(output).map(([output, files]) => ({
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
