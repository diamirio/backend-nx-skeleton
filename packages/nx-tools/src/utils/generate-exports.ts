import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import * as micromatch from 'micromatch'
import { dirname, join, parse, relative } from 'path'
import { from } from 'rxjs'
import { map, mergeMap, scan } from 'rxjs/operators'

import { getFilesInTree } from './file-system'
import { getJinjaDefaults } from './jinja-defaults'
import { Logger } from './logger'
import { GenerateExportsJinjaTemplateOptions } from './template-engine.interface'

export function generateExports (options: GenerateExportsJinjaTemplateOptions): Rule {
  return ((async (host: Tree, context: SchematicContext): Promise<Tree> => {
    const logger = new Logger(context)
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
              logger.debug(`Generate export pattern "${template.pattern}" matches: "${file.path}"`)
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
      logger.debug(`Creating export file: "${o}" with imported files "${val.join(', ')}".`)
      host[!host.exists(o) ? 'create' : 'overwrite'](o, nunjucks.renderString('{% for file in files %}export * from \'{{ file }}\'\n{% endfor %}', { files: val }))
    })

    return host
  }) as unknown) as Rule
}
