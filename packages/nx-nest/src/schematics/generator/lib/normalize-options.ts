import { SchematicContext, Tree } from '@angular-devkit/schematics'
import { readNxJson, toFileName } from '@nrwl/workspace'
import { generateNameCases, isVerbose, Logger, setSchemaDefaultsInContext } from '@webundsoehne/nx-tools'
import globby from 'globby'
import { Listr } from 'listr2'
import { join } from 'path'

import { NormalizedSchema, Schema } from '../main.interface'

/**
 * @param  {Tree} host
 * @param  {SchematicContext} context
 * @param  {Schema} options This should be unparsed options entry coming from the Angular schematics.
 * @returns Promise
 * Normalizes options for given schematic.
 */
export async function normalizeOptions (_host: Tree, context: SchematicContext, options: Schema): Promise<NormalizedSchema> {
  const logger = new Logger(context)

  return new Listr<NormalizedSchema>(
    [
      // assign options to parsed schema
      {
        task: (ctx): void => {
          setSchemaDefaultsInContext(ctx, {
            assign: { from: options, keys: [ 'name', 'parent', 'force', 'type', 'silent', 'mount' ] }
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
        task: (ctx): void => {
          const nxJson = readNxJson()
          ctx.packageScope = `${nxJson.npmScope}`
        }
      },

      // select partial type
      {
        enabled: (ctx): boolean => ctx.type === undefined,
        task: async (ctx, task): Promise<void> => {
          const scanDir = join(__dirname, '../files')

          logger.debug('Template directory to scan for is: ', scanDir)

          const choices = await globby('*', {
            deep: 1,
            onlyDirectories: true,
            cwd: scanDir
          })

          logger.debug('Selectable choices are:', choices)

          if (!choices || choices.length === 0) {
            throw new Error(`Template directory is empty: ${scanDir}`)
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
          ctx.root = process.cwd()

          task.title = `Generated item root directory is set as: ${ctx.root}`
        }
      }
    ],
    {
      rendererFallback: isVerbose(),
      rendererSilent: options.silent
    }
  ).run()
}
