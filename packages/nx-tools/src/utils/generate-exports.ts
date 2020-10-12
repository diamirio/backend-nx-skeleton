import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import * as micromatch from 'micromatch'
import { dirname, join, parse, relative } from 'path'
import { from } from 'rxjs'
import { map, mergeMap, scan } from 'rxjs/operators'

import { GenerateExportsJinjaTemplateOptions } from '@src/rules/generate-exports.rule.interface'
import { getJinjaDefaults } from '@src/templates/jinja-defaults'
import { getFilesInTree } from '@src/utils/file-system/file-system'
import { Logger } from '@utils/index'

export function generateExports (options: GenerateExportsJinjaTemplateOptions): Rule {
  return ((async (host: Tree, context: SchematicContext): Promise<Tree> => {
    const log = new Logger(context)
    const files = getFilesInTree(host, (action) => action.kind !== 'd' && action.kind !== 'r')

    if (files.size === 0 || options.templates.length === 0) {
      return host
    }

    const nunjucks = getJinjaDefaults(options.nunjucks)

    const output: { [output: string]: string[] } = await from(files)
      .pipe(
        // filter((file) => host.exists(file.path)),
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

    Object.entries(output).forEach(([ o, val ]) => {
      log.debug(`Creating export file: "${o}" with imported files "${val.join(', ')}".`)
      host[!host.exists(o) ? 'create' : 'overwrite'](o, nunjucks.renderString('{% for file in files %}export * from \'{{ file }}\'\n{% endfor %}', { files: val }))
    })

    return host
  }) as unknown) as Rule
}
