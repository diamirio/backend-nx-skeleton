import type { SchematicContext, Tree } from '@angular-devkit/schematics'
import { Listr } from 'listr2'
import { join } from 'path'

import type { NormalizedSchema, Schema } from '../main.interface'
import { AvailableCLIs, AvailableFolderStructures, PrettyNamesForAvailableThingies } from '@interfaces/available.constants'
import { calculateDependencies } from '@utils/versions'
import { color, generateNameCases, isVerbose, mapPromptChoices, setSchemaDefaultsInContext } from '@webundsoehne/nx-tools'

/**
 * Normalize the options passed in through angular-schematics.
 */
export async function normalizeOptions (_host: Tree, _context: SchematicContext, options: Schema): Promise<NormalizedSchema> {
  return new Listr<NormalizedSchema>(
    [
      // assign options to parsed schema
      {
        task: (ctx): void => {
          setSchemaDefaultsInContext(ctx, {
            default: [
              options,
              {
                enum: {
                  cli: AvailableCLIs,
                  layout: AvailableFolderStructures
                }
              }
            ]
          })
        }
      },

      {
        skip: (ctx): boolean => !!ctx.directory,
        task: async (ctx, task): Promise<void> => {
          ctx.directory = await task.prompt({
            type: 'Input',
            message: 'Please give a folder name to this repository.',
            footer: color.dim(`Leave empty to use current folder: ${process.cwd()}`),
            format: (value) => {
              return generateNameCases(value).kebab.trim()
            },
            validate: (value) => {
              return new RegExp(/[A-Za-z0-9-]*/).test(value)
            }
          })

          if (!ctx.directory) {
            if (
              !await task.prompt({
                type: 'Toggle',
                message: 'Are you sure that you want to use current directory for the repository.',
                footer: color.red('This will overwrite everything!')
              })
            ) {
              throw new Error('Cancelled creation of the repository.')
            }
          }
        }
      },

      {
        task: (ctx, task): void => {
          ctx.root = ctx.directory
          task.title = `Project root folder set as: ${color.yellow(join(process.cwd(), ctx.directory) ?? process.cwd())}`
        }
      },

      {
        skip: (ctx): boolean => !!ctx.name,
        task: async (ctx, task): Promise<void> => {
          ctx.name = await task.prompt({
            type: 'Input',
            message: 'Please give a package scope name.',
            initial: ctx.directory,
            validate: (value) => {
              if (!value) {
                return 'You have to give this package a NPM scope.'
              }

              return true
            },
            format: (value) => {
              return generateNameCases(value).kebab
            }
          })
        }
      },

      {
        task: (ctx, task): void => {
          ctx.packageScope = `${ctx.name}`
          task.title = `Project scope set as: @${ctx.name}/*`
        }
      },

      // set project folder structure
      {
        skip: (ctx): boolean => !!ctx.layout,
        task: async (ctx, task): Promise<void> => {
          const choices = mapPromptChoices<AvailableFolderStructures>(AvailableFolderStructures, PrettyNamesForAvailableThingies)

          ctx.layout = await task.prompt<AvailableFolderStructures>({
            type: 'Select',
            message: 'Please select a folder structure to use.',
            choices
          })

          task.title = `Folder structure set as: ${ctx.layout}`
        }
      },

      // set workspacefile
      {
        task: async (ctx, task): Promise<void> => {
          task.title = 'Setting workspace constants...'

          const deps = await calculateDependencies(ctx)

          ctx.deps = deps.deps
          ctx.devDeps = deps.devDeps

          task.title = 'Constants set for the project.'
        }
      }
    ],
    {
      rendererFallback: isVerbose()
    }
  ).run()
}
