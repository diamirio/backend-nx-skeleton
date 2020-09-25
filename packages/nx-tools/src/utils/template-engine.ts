import { CreateFileAction, OverwriteFileAction, Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { from, Observable } from 'rxjs'
import { filter, map, mergeMap } from 'rxjs/operators'

import { getFilesInTree } from './file-system'
import { getJinjaDefaults } from './jinja-defaults'
import { GenerateMultipleJinjaTemplateOptions, JinjaTemplateOptions } from './template-engine.interface'

export function jinjaTemplate (ctx: Record<string, any>, options: JinjaTemplateOptions): Rule {
  return (((host: Tree, context: SchematicContext): Tree | Observable<Tree> => {
    const files = getFilesInTree(host, (action) => action.kind !== 'd' && action.kind !== 'r')

    if (files.size === 0) {
      return host
    }

    const nunjucks = getJinjaDefaults(options.nunjucks)

    return from(files).pipe(
      filter((file) => host.exists(file.path)),
      mergeMap(async (file) => {
        let matchedTemplate: string
        await Promise.all(
          options.templates.map(async (template) => {
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
          context.logger.warn(`Could not create "${file.path}" from template: ${e.message}`)
        }
      }),
      map(() => host)
    )
  }) as unknown) as Rule
}

export function generateMultipleJinjaTemplate<T extends Record<string, any>> (ctx: T, options: GenerateMultipleJinjaTemplateOptions<T>): Rule {
  return (((host: Tree, context: SchematicContext): Tree | Observable<Tree> => {
    const files = getFilesInTree(host, (action) => action.kind !== 'd' && action.kind !== 'r')

    if (files.size === 0) {
      return host
    }

    const nunjucks = getJinjaDefaults(options.nunjucks)

    return from(files).pipe(
      filter((file) => host.exists(file.path)),
      mergeMap(async (file) => {
        let matchedTemplate: string
        await Promise.all(
          options.templates.map(async (template) => {
            if (file.path.match(template.path)) {
              matchedTemplate = template.path
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
          context.logger.warn(`Could not create "${file.path}" from template: ${e.message}`)
        }
      }),
      map(() => host)
    )
  }) as unknown) as Rule
}
