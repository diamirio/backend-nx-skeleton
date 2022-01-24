import { SchematicContext, Tree } from '@angular-devkit/schematics'
import { Listr } from 'listr2'

import { NormalizedSchema, Schema } from '../main.interface'
import { NxNestProjectIntegration } from '@src/integration'
import { readBackendInterfacesWorkspaceIntegration } from '@src/integration/backend-interfaces'
import { AvailableDBAdapters, SchematicConstants } from '@src/interfaces'
import { uniqueArrayFilter } from '@webundsoehne/deep-merge'
import {
  isVerbose,
  normalizePackageJsonScopeTask,
  normalizePriorConfigurationTask,
  normalizeRootDirectoryTask,
  NxProjectTypes,
  setSchemaDefaultsInContext
} from '@webundsoehne/nx-tools'

export async function normalizeOptions (host: Tree, _context: SchematicContext, options: Schema): Promise<NormalizedSchema> {
  return new Listr<NormalizedSchema>(
    [
      // assign options to parsed schema
      {
        task: async (ctx): Promise<void> => {
          setSchemaDefaultsInContext(ctx, {
            default: [
              options,
              {
                sourceRoot: 'src',
                name: SchematicConstants.BACKEND_INTERFACES_PACKAGE,
                constants: SchematicConstants,
                dbAdapters: [],
                enum: { dbAdapters: AvailableDBAdapters }
              }
            ]
          })
        }
      },

      // select application name
      {
        skip: (ctx): boolean => !!ctx.name,
        task: async (ctx, task): Promise<void> => {
          ctx.name = await task.prompt({
            type: 'Input',
            message: 'Give the library a name.'
          })
        }
      },

      // normalize package json scope
      normalizePackageJsonScopeTask<NormalizedSchema>(host),

      // set project root directory
      normalizeRootDirectoryTask<NormalizedSchema>(host, NxProjectTypes.LIB),

      // check for prior configuration
      normalizePriorConfigurationTask<NormalizedSchema, NxNestProjectIntegration>(host, 'backendInterfaces'),

      // parse microservices for templates
      {
        title: 'Parsing all integrated backend applications...',
        task: (ctx, task): void => {
          const backendInterfaces = readBackendInterfacesWorkspaceIntegration(host)

          ctx.dbAdapters = backendInterfaces.flatMap((m) => m.dbAdapters).filter(uniqueArrayFilter)

          if (ctx.dbAdapters.length > 0) {
            task.title = `DB Adapters used in the applications are: ${ctx.dbAdapters.join(', ')}`

            task.output = `Applications with databases has been found: ${backendInterfaces.map((m) => `${m.name}:${m.dbAdapters}`).join(', ')}`
          } else {
            task.title = 'No applications with databases has been found working in mock mode.'
          }
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
