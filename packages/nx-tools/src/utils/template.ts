import {
  CreateFileAction,
  OverwriteFileAction,
  Rule,
  SchematicContext,
  Tree
} from '@angular-devkit/schematics'
import nunjucks from 'nunjucks'
import { from, Observable } from 'rxjs'
import { filter, map, mergeMap } from 'rxjs/operators'

export function jinjaTemplate (ctx: Record<string, any>, options: { templates: string[], nunjucks?: nunjucks.ConfigureOptions }): Rule {

  return (host: Tree, context: SchematicContext): Tree | Observable<Tree> => {
    const files = new Set(
      host.actions
        .filter((action) => action.kind !== 'd' && action.kind !== 'r')
        .map((action: OverwriteFileAction | CreateFileAction) => ({
          path: action.path,
          content: action.content.toString()
        }))
    )

    if (files.size === 0) {
      return host
    }

    // nunjucks configuration
    nunjucks.configure({
      autoescape: false, throwOnUndefined: true, trimBlocks: true, lstripBlocks: false, ...options?.nunjucks
    })

    return from(files).pipe(
      filter((file) => host.exists(file.path)),
      mergeMap(async (file) => {

        let matchedTemplate: string
        await Promise.all(options.templates.map((template) => {
          if (file.path.match(template)) {
            matchedTemplate = template
          }
        }))

        if (!matchedTemplate) {
          return
        }

        try {
          file.content = nunjucks.renderString(file.content, ctx)

          host.overwrite(file.path, file.content)
          host.rename(file.path, file.path.replace(matchedTemplate, ''))
        } catch (e) {
          context.logger.warn(`Could not create "${file.path}" from template because ${e.message}`)
        }

      }),
      map(() => host)
    )

  }
}
