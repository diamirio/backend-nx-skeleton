import { apply, mergeWith, Rule, SchematicContext, Source, Tree } from '@angular-devkit/schematics'
import * as micromatch from 'micromatch'
import { dirname, join, parse, relative } from 'path'

import { createApplicationRule } from './create-application.rule'
import { GenerateExportsJinjaTemplateOptions } from '@src/templates/template-engine.interface'
import { Logger } from '@src/utils/logger/logger'
import { deepMergeWithUniqueMergeArray } from '@utils/index'

export function generateExportsRule (source: Source, options: GenerateExportsJinjaTemplateOptions): Rule {
  return (host: Tree, context: SchematicContext): Rule => {
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

          if (micromatch.isMatch(file, template.pattern, template.options)) {
            log.debug(`Generate export pattern "${template.pattern.join(', ')}" matches: "${file}"`)

            o = deepMergeWithUniqueMergeArray(o, {
              [template.output]: [ './' + relative(dirname(join(options.root, template.output)), join(dirname(file), parse(file).name)) ]
            })
          }

          return o
        }, {} as Record<string, string[]>)
      )
    })

    return mergeWith(
      apply(source, [
        ...createApplicationRule(
          {
            multipleTemplates: Object.entries(output).map(([ path, files ]) => ({
              condition: files.length > 0,
              match: 'default',
              template: {
                output: path,
                path: '__default__.ts.j2',
                factory: (): Record<string, unknown> => ({ files })
              }
            }))
          },
          {
            root: options.root
          }
        )
      ])
    )
  }
}
