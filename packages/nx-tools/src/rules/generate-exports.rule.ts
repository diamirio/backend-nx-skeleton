import { apply, mergeWith, Rule, SchematicContext, Source, Tree } from '@angular-devkit/schematics'
import { applyOverwriteWithDiff } from '@rules/index'
import * as micromatch from 'micromatch'
import { dirname, join, parse, relative } from 'path'

import { createApplicationRule } from './create-application.rule'
import { GenerateExportsJinjaTemplateOptions } from '@src/templates/template-engine.interface'
import { Logger } from '@src/utils/logger/logger'
import { deepMergeWithUniqueMergeArray } from '@utils/index'

export function generateExportsRule (source: Source, options: GenerateExportsJinjaTemplateOptions): Rule {
  return (host: Tree, context: SchematicContext): Promise<Rule> => {
    let output: Record<string, string[]>

    const log = new Logger(context)

    // parse the host tree first generate which files to output
    host.visit((file) => {
      // if we dont overwrite the file with filechanges we do not need it, but it exists in tree which is the current host sysstem
      output = deepMergeWithUniqueMergeArray(
        output,
        options.templates.reduce((o, template) => {
          if (!Array.isArray(template.pattern)) {
            template.pattern = [ template.pattern ]
          }

          if (micromatch.every(file.toString(), [ ...template.pattern, '!**/node_modules/**' ], template.options)) {
            log.debug(`Generate export pattern "${template.pattern.join(', ')}" matches: "${file}"`)

            o = deepMergeWithUniqueMergeArray(o, {
              [template.output]: [ './' + join(relative('/' + dirname(join(options.root ?? '', template.output)), '/' + dirname(file)), parse(file).name) ]
            })
          }

          return o
        }, {} as Record<string, string[]>)
      )
    })

    return applyOverwriteWithDiff(
      apply(source, [
        ...createApplicationRule(
          {
            multipleTemplates: [
              {
                templates: Object.entries(output).map(([ output, files ]) => ({
                  output,
                  path: new RegExp(/\[\[exports\]\].ts.j2/),
                  factory: (): Record<string, unknown> => ({ files })
                }))
              }
            ]
          },
          {
            root: options.root
          }
        )
      ]),
      null,
      context
    )
  }
}
