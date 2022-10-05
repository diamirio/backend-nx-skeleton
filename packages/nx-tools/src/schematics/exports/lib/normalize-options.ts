import type { SchematicContext, Tree } from '@angular-devkit/schematics'

import type { NormalizedSchema, Schema } from '../main.interface'
import type { GenerateExportsJinjaTemplateOptions } from '@rules/generate-exports.rule.interface'
import { Manager, relativeToNxRoot, setSchemaDefaultsInContext } from '@utils'
import type { ArrayElement } from '@webundsoehne/ts-utility-types'

/**
 * Normalize options for the schematic.
 * @param host
 * @param context
 * @param options
 */
export async function normalizeOptions (_host: Tree, context: SchematicContext, options: Schema): Promise<NormalizedSchema> {
  return new Manager(context).run<NormalizedSchema>(
    [
      // assign options to parsed schema
      {
        task: (ctx): void => {
          setSchemaDefaultsInContext(ctx, { default: [options] })
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

          ctx.templates = { templates: [prompt], root: relativeToNxRoot(process.cwd()) }
        }
      }
    ],
    {
      concurrent: false,
      rendererSilent: options.silent
    }
  )
}
