import { normalize } from '@angular-devkit/core'
import { SchematicContext, Tree } from '@angular-devkit/schematics'
import { readNxJson, toFileName } from '@nrwl/workspace'
import { appsDir } from '@nrwl/workspace/src/utils/ast-utils'
import { Listr } from 'listr2'

import { NormalizedSchema, Schema } from '../main.interface'

export async function normalizeOptions (host: Tree, context: SchematicContext, options: Schema): Promise<NormalizedSchema> {
  return new Listr<NormalizedSchema>(
    [
      // assign options to parsed schema
      {
        task: async (ctx): Promise<void> => {
          await Promise.all(
            [ 'name', 'verbose', 'linter' ].map((item) => {
              ctx[item] = options[item]
            })
          )
        }
      },

      // decide the application root directory
      {
        task: (ctx): void => {
          if (options.directory) {
            ctx.directory = `${toFileName(options.directory)}/${toFileName(options.name)}`
          } else {
            ctx.directory = toFileName(options.name)
          }
        }
      },

      // remove unwanted charachters from directory name
      {
        title: 'Normalizing project name.',
        task: (ctx, task): void => {
          ctx.name = ctx.directory.replace(new RegExp('/', 'g'), '-')

          task.title = `Project name is set as "${ctx.name}".`
        }
      },

      // normalize package json scope
      {
        title: 'Normalizing package.json project name.',
        task: (ctx, task): void => {
          ctx.packageName = `@${readNxJson().npmScope}/${ctx.name}`

          task.title = `Project package name set as "${ctx.packageName}".`
        }
      },

      // set project root directory
      {
        title: 'Setting project root directory.',
        task: (ctx, task): void => {
          ctx.root = normalize(`${appsDir(host)}/${ctx.directory}`)

          task.title = `Project root directory is set as "${ctx.root}".`
        }
      }
    ],
    {
      concurrent: false,
      rendererFallback: context.debug
    }
  ).run()
}
