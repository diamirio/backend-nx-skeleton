import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { from, Observable } from 'rxjs'
import { filter, map, mergeMap } from 'rxjs/operators'

import { getJinjaDefaults } from './jinja-defaults'
import { JinjaTemplateOptions, MultipleJinjaTemplateOptions } from './template-engine.interface'
import { getFilesInTree } from '@src/utils/file-system/file-system'
import { Logger } from '@utils/logger/logger'

export function jinjaTemplate (ctx: Record<string, any>, options: JinjaTemplateOptions): Rule {
  return (((host: Tree, context: SchematicContext): Tree | Observable<Tree> => {
    const log = new Logger(context)

    const files = getFilesInTree(host, (action) => action.kind !== 'd' && action.kind !== 'r')

    if (files.size === 0 || !options.templates) {
      return host
    }

    const nunjucks = getJinjaDefaults(options.nunjucks)

    return from(files).pipe(
      filter((file) => host.exists(file.path)),
      mergeMap(async (file) => {
        let matchedTemplate: string
        await Promise.all(
          options.templates?.map(async (template) => {
            if (file.path.match(template)) {
              matchedTemplate = template
            }
          })
        )

        if (!matchedTemplate) {
          return
        }

        try {
          file.content = nunjucks.renderString(file.content, ctx)

          host.overwrite(file.path, file.content)
          host.rename(file.path, file.path.replace(matchedTemplate, ''))
        } catch (e) {
          log.warn(`Could not create "${file.path}" from template: ${e.message}`)
        }
      }),
      map(() => host)
    )
  }) as unknown) as Rule
}

export function multipleJinjaTemplate<T extends Record<string, any>> (ctx: T, options: MultipleJinjaTemplateOptions<T>): Rule {
  return (((host: Tree, context: SchematicContext): Tree | Observable<Tree> => {
    const log = new Logger(context)

    const files = getFilesInTree(host, (action) => action.kind !== 'd' && action.kind !== 'r')

    if (files.size === 0 || !options.templates) {
      return host
    }

    const nunjucks = getJinjaDefaults(options.nunjucks)

    return from(files).pipe(
      mergeMap(async (file) => {
        let matchedTemplate: string
        await Promise.all(
          options.templates?.map(async (template) => {
            if (file.path.match(template.path)) {
              matchedTemplate = template.path
            }
          })
        )

        log.warn(file.path)

        if (!matchedTemplate) {
          return
        }
        log.error(matchedTemplate)

        await Promise.all(
          options.templates.map(async (template) => {
            try {
              const content = nunjucks.renderString(file.content, template.factory(ctx, template.output))

              host.create(template.output, content)
            } catch (e) {
              context.logger.warn(`Could not create "${file.path}" from template: ${e.message}`)
            }
          })
        )

        // remove the template itself
        host.delete(file.path)
      }),
      map(() => host)
    )
  }) as unknown) as Rule
}
