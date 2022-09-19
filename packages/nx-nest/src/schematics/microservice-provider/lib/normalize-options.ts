import type { SchematicContext, Tree } from '@angular-devkit/schematics'
import { Listr } from 'listr2'

import type { NormalizedSchema, Schema } from '../main.interface'
import type { NxNestProjectIntegration } from '@integration'
import { readMicroserviceProviderWorkspaceIntegration } from '@integration'
import { SchematicConstants } from '@interfaces'
import { generateMicroserviceCasing } from '@utils/generate-microservice-casing'
import {
  isVerbose,
  normalizePackageJsonNamePrompt,
  normalizePriorConfigurationPrompt,
  normalizeRootDirectoryPrompt,
  NxProjectTypes,
  setSchemaDefaultsInContext,
  ensureNxRootListrTask,
  ListrLogger
} from '@webundsoehne/nx-tools'

export async function normalizeOptions (host: Tree, context: SchematicContext, options: Schema): Promise<NormalizedSchema> {
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

      ...ensureNxRootListrTask(),

      // normalize package json scope
      ...normalizePackageJsonNamePrompt<NormalizedSchema>(host),

      // set project root directory
      ...normalizeRootDirectoryPrompt<NormalizedSchema>(host, NxProjectTypes.LIB),

      // check for prior configuration
      ...normalizePriorConfigurationPrompt<NormalizedSchema, NxNestProjectIntegration>(host, 'microserviceProvider'),

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
      rendererSilent: options.silent,
      nonTTYRendererOptions: { logger: ListrLogger, options: [context] },
      rendererFallback: isVerbose()
    }
  ).run()
}
