import type { SchematicContext, Tree } from '@angular-devkit/schematics'
import { readFileIfExisting } from '@nrwl/workspace/src/core/file-utils'
import fs from 'fs-extra'
import globby from 'globby'
import type { PromptOptionsMap } from 'listr2'
import { Listr } from 'listr2'
import { join, relative } from 'path'

import type { NormalizedSchema, Schema } from '../main.interface'
import { color, findNxRoot, generateNameCases, isVerbose, Logger, relativeToNxRoot, setSchemaDefaultsInContext } from '@utils'

/**
 * @param  {Tree} host
 * @param  {SchematicContext} context
 * @param  {Schema} options This should be unparsed options entry coming from the Angular schematics.
 * @returns Promise
 * Normalizes options for given schematic.
 */
export async function normalizeOptions (_host: Tree, context: SchematicContext, options: Schema, files: string): Promise<NormalizedSchema> {
  const logger = new Logger(context)

  logger.debug(`Template directory to scan in: ${files}`)

  return new Listr<NormalizedSchema>(
    [
      // assign options to parsed schema
      {
        task: (ctx): void => {
          setSchemaDefaultsInContext(ctx, {
            default: [options]
          })
        }
      },

      // prompt for generator component name
      {
        skip: (ctx): boolean => !!ctx.name,
        task: async (ctx, task): Promise<void> => {
          ctx.name = await task.prompt({
            type: 'Input',
            message: 'Please give a name to the soon to be generated component.'
          })
        }
      },

      // parse component name and convert casings to use in template
      {
        title: 'Normalizing component name.',
        task: (ctx, task): void => {
          ctx.casing = generateNameCases(ctx.name)
          ctx.name = ctx.casing.kebab

          task.title = `Generated item name is set as "${ctx.name}".`
        }
      },

      // need package scope for imports and such
      {
        task: async (ctx): Promise<void> => {
          const nxJsonPath = join(findNxRoot(), 'nx.json')

          logger.debug(`nx.json path found: ${nxJsonPath}`)

          try {
            const nxJson = await fs.readJSON(nxJsonPath)

            ctx.packageScope = `${nxJson.npmScope}`
            // eslint-disable-next-line no-empty
          } catch {}
        }
      },

      // select partial type
      {
        enabled: (ctx): boolean => !ctx.type,
        task: async (ctx, task): Promise<void> => {
          let choices: PromptOptionsMap['AutoComplete']['choices'] = await globby('*', {
            deep: 1,
            onlyDirectories: true,
            cwd: files
          })

          choices = await Promise.all(
            choices.map(async (c) => {
              return {
                name: c,
                message: c,
                hint: color.yellow(readFileIfExisting(join(files, c, 'description.txt')).trimEnd())
              }
            })
          )

          logger.debug('Selectable choices are:', choices)

          if (!choices || choices.length === 0) {
            throw new Error(`Template directory is empty: ${files}`)
          }

          // select the base components
          // when options are not passed as an option to the command
          ctx.type = await task.prompt<string>({
            type: 'AutoComplete',
            message: 'Please select the component type.',
            choices
          })

          task.title = `Generated item type selected: ${ctx.type}`
        },
        options: {
          bottomBar: Infinity,
          persistentOutput: true
        }
      },

      // set component root directory
      {
        title: 'Setting partial root directory.',
        task: async (ctx, task): Promise<void> => {
          if (ctx.directory) {
            ctx.root = relative(process.cwd(), ctx.directory)
          } else {
            ctx.root = relativeToNxRoot(process.cwd())
          }

          task.title = `Generated item root directory is set as: ${ctx.root}`
        }
      },

      // get and process prompts
      {
        title: 'Extra prompts to extend the templates.',
        skip: (ctx): boolean => !fs.existsSync(join(files, ctx.type, 'prompts.json')),
        task: async (ctx, task): Promise<void> => {
          task.title = 'Prompts file is found, now have some extra questions to inject to templates.'

          const prompts = await fs.readJSON(join(files, ctx.type, 'prompts.json'))

          ctx.inject = await task.prompt(prompts)

          task.title = 'Injected extra variables to generator.'

          logger.debug(`Injected extra variables through prompts: ${JSON.stringify(ctx.inject, null, 2)}`)
        }
      }
    ],
    {
      rendererFallback: isVerbose(),
      rendererSilent: options.silent
    }
  ).run()
}
