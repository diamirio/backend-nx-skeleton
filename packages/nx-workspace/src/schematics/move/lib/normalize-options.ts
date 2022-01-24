import { SchematicContext, Tree } from '@angular-devkit/schematics'
import { Listr } from 'listr2'

import { Schema, NormalizedSchema } from '../main.interface'
import { readWorkspaceProjects, setSchemaDefaultsInContext } from '@webundsoehne/nx-tools'

/**
 * Normalize the options passed in through angular-schematics.
 * @param host
 * @param context
 * @param options
 */
export async function normalizeOptions (host: Tree, _context: SchematicContext, options: Schema): Promise<NormalizedSchema> {
  return new Listr<NormalizedSchema>([
    // assign options to parsed schema
    {
      task: (ctx): void => {
        setSchemaDefaultsInContext(ctx, {
          default: [ options ]
        })
      }
    },

    {
      skip: (ctx): boolean => !!ctx.projectName,
      task: async (ctx, task): Promise<void> => {
        const projects = readWorkspaceProjects(host)

        if (Object.keys(projects).length === 0) {
          throw new Error('No project has been found in the workspace.')
        }

        ctx.projectName = await task.prompt({
          type: 'AutoComplete',
          message: 'Please select an existing application.',
          choices: Object.keys(projects)
        })
      }
    },

    {
      skip: (ctx): boolean => !!ctx.destination,
      task: async (ctx, task): Promise<void> => {
        ctx.destination = await task.prompt({
          type: 'Input',
          message: 'Please give a new name to the project.'
        })
      }
    }
  ]).run()
}
