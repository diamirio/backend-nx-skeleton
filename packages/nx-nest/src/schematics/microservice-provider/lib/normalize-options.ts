import { normalize } from '@angular-devkit/core'
import { SchematicContext, Tree } from '@angular-devkit/schematics'
import { readNxJson } from '@nrwl/workspace'
import { libsDir } from '@nrwl/workspace/src/utils/ast-utils'
import { directoryExists } from '@nrwl/workspace/src/utils/fileutils'
import { readMicroserviceIntegration, readNxIntegration } from '@webundsoehne/nx-tools'
import { constantCase, paramCase } from 'change-case'
import { Listr } from 'listr2'

import { NormalizedSchema, ParsedMicroservices, Schema } from '../main.interface'

export async function normalizeOptions (host: Tree, context: SchematicContext, options: Schema): Promise<NormalizedSchema> {
  return new Listr<NormalizedSchema>(
    [
      // assign options to parsed schema
      {
        task: async (ctx): Promise<void> => {
          await Promise.all(
            [ 'name', 'verbose', 'linter' ].map((item) => {
              ctx[item] = options[item]
            })
          )
        }
      },

      // decide the application root directory
      {
        task: (ctx): void => {
          ctx.directory = 'microservice-provider'
        }
      },

      // remove unwanted charachters from directory name
      {
        title: 'Normalizing library name.',
        task: (ctx, task): void => {
          ctx.name = ctx.directory.replace(new RegExp('/', 'g'), '-')

          task.title = `Library name is set as "${ctx.name}".`
        }
      },

      // normalize package json scope
      {
        title: 'Normalizing package.json library name.',
        task: (ctx, task): void => {
          ctx.packageName = `@${readNxJson().npmScope}/${ctx.name}`

          task.title = `Library package name set as "${ctx.packageName}".`
        }
      },

      // set project root directory
      {
        title: 'Setting library root directory.',
        task: (ctx, task): void => {
          ctx.root = normalize(`${libsDir(host)}/${ctx.directory}`)

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

            const thisProject = readNxIntegration<NormalizedSchema['priorConfiguration']>(ctx.name)
            if (thisProject) {
              ctx.priorConfiguration = thisProject

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
        title: 'Parsing all integrated microservices.',
        task: (ctx, task): void => {
          const microservices = readMicroserviceIntegration()

          ctx.parsedMicroservices = microservices.reduce((o, microservice) => {
            return [
              ...o,
              {
                name: microservice.name,
                names: {
                  pattern: `${constantCase(microservice.name)}_QUEUE`
                },
                casing: {
                  kebab: paramCase(microservice.name)
                }
              }
            ]
          }, [] as ParsedMicroservices[])
          task.title = 'test'
        }
      }
    ],
    {
      concurrent: false,
      rendererFallback: context.debug
    }
  ).run()
}
