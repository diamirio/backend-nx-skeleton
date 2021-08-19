import { SchematicContext, Tree } from '@angular-devkit/schematics'
import { Listr } from 'listr2'

import { NormalizedSchema, Schema } from '../main.interface'
import { GenerateExportsJinjaTemplateOptions } from '@rules/generate-exports.rule.interface'
import { ArrayElement, isVerbose, relativeToNxRoot, setSchemaDefaultsInContext } from '@utils'

/**
 * Normalize options for the schematic.
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
          setSchemaDefaultsInContext(ctx, { assign: { from: options, keys: [ 'templates' ] } })
        }
      },

      // define the export pattern
      {
        enabled: (ctx): boolean => !ctx.templates,
        task: async (ctx, task): Promise<void> => {
          const prompt = await task.prompt<ArrayElement<GenerateExportsJinjaTemplateOptions['templates']>>([
            {
              name: 'output',
              type: 'Input',
              message: 'Please provide a pattern for the export file.',
              initial: 'index.ts'
            },
            {
              name: 'pattern',
              type: 'Input',
              message: 'Please provide a comma delimited glob pattern.',
              initial: '**/*.ts',
              result: (value): void => {
                return value.split(',')
              }
            }
          ])

          ctx.templates = { templates: [ prompt ], root: relativeToNxRoot(process.cwd()) }
        }
      }
    ],
    {
      concurrent: false,
      rendererFallback: isVerbose(),
      rendererSilent: options.silent
    }
  ).run()
}
