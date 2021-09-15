import { SchematicContext, Tree } from '@angular-devkit/schematics'
import { toFileName } from '@nrwl/workspace'
import { readFileIfExisting } from '@nrwl/workspace/src/core/file-utils'
import { sync as findUpSync } from 'find-up'
import fs from 'fs-extra'
import globby from 'globby'
import { Listr, PromptOptionsMap } from 'listr2'
import { join, relative } from 'path'

import { NormalizedSchema, Schema } from '../main.interface'
import { color, generateNameCases, isVerbose, Logger, relativeToNxRoot, setSchemaDefaultsInContext } from '@utils'

/**
 * @param  {Tree} host
 * @param  {SchematicContext} context
 * @param  {Schema} options This should be unparsed options entry coming from the Angular schematics.
 * @returns Promise
 * Normalizes options for given schematic.
 */
export async function normalizeOptions (files: string, _host: Tree, context: SchematicContext, options: Schema): Promise<NormalizedSchema> {
  const logger = new Logger(context)
  logger.debug(`Template directory to scan in: ${files}`)

  return new Listr<NormalizedSchema>(
    [
      // assign options to parsed schema
      {
        task: (ctx): void => {
          setSchemaDefaultsInContext(ctx, {
            assign: { from: options, keys: [ 'name', 'directory', 'exports', 'type' ] }
          })
        }
      },

      // parse component name and convert casings to use in template
      {
        title: 'Normalizing component name.',
        task: (ctx, task): void => {
          ctx.name = toFileName(options.name)

          ctx.casing = generateNameCases(ctx.name)

          task.title = `Generated item name is set as "${ctx.name}".`
        }
      },

      // need package scope for imports and such
      {
        task: async (ctx): Promise<void> => {
          const nxJsonPath = findUpSync('nx.json', { cwd: process.cwd(), type: 'file' })

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
