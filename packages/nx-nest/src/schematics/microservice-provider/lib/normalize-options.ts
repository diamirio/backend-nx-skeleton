import { normalize } from '@angular-devkit/core'
import { SchematicContext, Tree } from '@angular-devkit/schematics'
import { readNxJson } from '@nrwl/workspace'
import { directoryExists } from '@nrwl/workspace/src/utils/fileutils'
import { Listr } from 'listr2'

import { NormalizedSchema, Schema } from '../main.interface'
import { NxNestProjectIntegration, readMicroserviceIntegration } from '@src/integration'
import { SchematicConstants } from '@src/interfaces'
import { generateMicroserviceCasing } from '@utils/generate-microservice-casing'
import { isVerbose, readNxProjectIntegration, readWorkspaceLayout, setSchemaDefaultsInContext } from '@webundsoehne/nx-tools'

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
      {
        title: 'Normalizing package.json library name.',
        task: (ctx, task): void => {
          const nxJson = readNxJson()
          ctx.packageName = `@${nxJson.npmScope}/${ctx.name}`
          ctx.packageScope = `@${nxJson.npmScope}/${ctx.name}`

          task.title = `Library package name set as "${ctx.packageName}".`
        }
      },

      // set project root directory
      {
        title: 'Setting library root directory.',
        task: (ctx, task): void => {
          const layout = readWorkspaceLayout(host)

          ctx.root = normalize(`${layout.libsDir}/${ctx.name}`)

          task.title = `Library root directory is set as "${ctx.root}".`
        }
      },

      // check for prior configuration
      {
        title: 'Checking if the application is configured before.',
        task: (ctx, task): void => {
          if (directoryExists(ctx.root)) {
            task.output = `Project root directory is not empty at: "${ctx.root}"`

            task.title = 'Looking for prior application configuration in "nx.json".'

            const integration = readNxProjectIntegration<NxNestProjectIntegration>(host, ctx.name)
            if (integration?.microserviceProvider) {
              ctx.priorConfiguration = integration.microserviceProvider

              task.title = 'Prior configuration successfully found in "nx.json".'
            } else {
              throw new Error('Can not read prior configuration from "nx.json".')
            }
          } else {
            task.title = 'This is the initial configuration of the package.'
          }
        },
        options: {
          persistentOutput: true,
          bottomBar: false
        }
      },

      // parse microservices for templates
      {
        title: 'Parsing all integrated microservices...',
        task: (ctx, task): void => {
          const microservices = readMicroserviceIntegration(host)

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
