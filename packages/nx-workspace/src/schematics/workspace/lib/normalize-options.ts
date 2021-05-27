import { SchematicContext, Tree } from '@angular-devkit/schematics'
import { toFileName } from '@nrwl/workspace'
import { isVerbose, mapPromptChoices, setSchemaDefaultsInContext } from '@webundsoehne/nx-tools'
import chalk from 'chalk'
import { Listr } from 'listr2'
import { join } from 'path'

import { NormalizedSchema, Schema } from '../main.interface'
import { AvailableCLICommands, AvailableCLIs, AvailableFolderStructures, AvailableWorkspaceFiles, PrettyNamesForAvailableThingies } from '@interfaces/available.constants'
import { calculateDependencies } from '@utils/versions'

/**
 * Normalize the options passed in through angular-schematics.
 * @param host
 * @param context
 * @param options
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
            footer: chalk.dim(`Leave empty to use current folder: ${process.cwd()}`),
            format: (value) => {
              return toFileName(value)
            }
          })

          if (!ctx.directory) {
            if (
              !await task.prompt({
                type: 'Toggle',
                message: 'Are you sure that you want to use current directory for the repository.',
                footer: chalk.red('This will overwrite everything!')
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
          task.title = `Project root folder set as: ${chalk.yellow(join(process.cwd(), ctx.directory) ?? process.cwd())}`
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
              return toFileName(value)
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

      // set project cli
      {
        skip: (ctx): boolean => !!ctx.cli,
        task: async (ctx, task): Promise<void> => {
          const choices = mapPromptChoices<AvailableCLIs>(AvailableCLIs, PrettyNamesForAvailableThingies)

          ctx.cli = await task.prompt<AvailableCLIs>({
            type: 'Select',
            message: 'Please select a CLI to use.',
            choices
          })

          task.title = `CLI set as: ${ctx.cli}`
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
        title: 'Setting constants...',
        task: async (ctx, task): Promise<void> => {
          ctx.workspaceFile = AvailableWorkspaceFiles[ctx.cli]
          ctx.cliCmd = AvailableCLICommands[ctx.cli]

          const deps = calculateDependencies(ctx.cli)
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
