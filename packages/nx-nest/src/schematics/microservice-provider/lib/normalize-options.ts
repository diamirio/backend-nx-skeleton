import { SchematicContext, Tree } from '@angular-devkit/schematics'
import { Listr } from 'listr2'

import { NormalizedSchema, Schema } from '../main.interface'
import { NxNestProjectIntegration, readMicroserviceProviderWorkspaceIntegration } from '@src/integration'
import { SchematicConstants } from '@src/interfaces'
import { generateMicroserviceCasing } from '@utils/generate-microservice-casing'
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
                name: SchematicConstants.MICROSERVICE_PROVIDER_PACKAGE,
                constants: SchematicConstants
              }
            ]
          })
        }
      },

      // normalize package json scope
      normalizePackageJsonScopeTask<NormalizedSchema>(host),

      // set project root directory
      normalizeRootDirectoryTask<NormalizedSchema>(host, NxProjectTypes.LIB),

      // check for prior configuration
      normalizePriorConfigurationTask<NormalizedSchema, NxNestProjectIntegration>(host, 'microserviceProvider'),

      // parse microservices for templates
      {
        title: 'Parsing all integrated microservices...',
        task: (ctx, task): void => {
          const microservices = readMicroserviceProviderWorkspaceIntegration(host)

          if (microservices.length === 0) {
            task.skip('No microservice integration has been found.')
          } else {
            task.title = `Microservice servers found: ${microservices.map((m) => m.name).join(', ')}`
          }

          ctx.microservices = microservices.map((microservice) => {
            return generateMicroserviceCasing(microservice.name)
          })
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
