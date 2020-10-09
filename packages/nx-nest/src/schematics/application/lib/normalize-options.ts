import { normalize } from '@angular-devkit/core'
import { SchematicContext, Tree } from '@angular-devkit/schematics'
import { readNxJson, toFileName } from '@nrwl/workspace'
import { appsDir } from '@nrwl/workspace/src/utils/ast-utils'
import { directoryExists } from '@nrwl/workspace/src/utils/fileutils'
import { ConvertToPromptType, parseArguments, readNxIntegration, setSchemaDefaultsInContext } from '@webundsoehne/nx-tools'
import { Listr } from 'listr2'

import { NormalizedSchema, Schema } from '../main.interface'
import {
  AvailableComponents,
  AvailableDBTypes,
  AvailableMicroserviceTypes,
  AvailableServerTypes,
  AvailableTestsTypes,
  PrettyNamesForAvailableThingies
} from '@interfaces/available-options.interface'

/**
 * Normalize the options passed in through angular-schematics.
 * @param host
 * @param context
 * @param options
 */
export async function normalizeOptions (host: Tree, context: SchematicContext, options: Schema): Promise<NormalizedSchema> {
  return new Listr<NormalizedSchema>(
    [
      // assign options to parsed schema
      {
        task: (ctx): void => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          setSchemaDefaultsInContext(ctx, {
            assign: { from: options, keys: [ 'name', 'linter' ] },
            default: [
              {
                sourceRoot: 'src'
              },
              {
                ...options
              },
              {
                enum: {
                  components: AvailableComponents,
                  server: AvailableServerTypes,
                  database: AvailableDBTypes,
                  tests: AvailableTestsTypes,
                  microservice: AvailableMicroserviceTypes
                }
              }
            ]
          })
        }
      },

      // decide the application root directory
      {
        task: (ctx): void => {
          if (options.directory) {
            ctx.directory = `${toFileName(options.directory)}/${toFileName(options.name)}`
          } else {
            ctx.directory = toFileName(options.name)
          }
        }
      },

      // normalize package json scope
      {
        title: 'Normalizing package.json project name.',
        task: (ctx, task): void => {
          ctx.packageName = `@${readNxJson().npmScope}/${ctx.name}`

          task.title = `Project package name set as "${ctx.packageName}".`
        }
      },

      // set project root directory
      {
        title: 'Setting project root directory.',
        task: (ctx, task): void => {
          ctx.root = normalize(`${appsDir(host)}/${ctx.directory}`)

          task.title = `Project root directory is set as "${ctx.root}".`
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

      // select server functionality
      {
        skip: (ctx): boolean => ctx.components?.length > 0,
        task: async (ctx, task): Promise<void> => {
          const choices: ConvertToPromptType<AvailableComponents> = [
            { name: AvailableComponents.SERVER, message: PrettyNamesForAvailableThingies.SERVER },
            { name: AvailableComponents.MICROSERVICE_SERVER, message: PrettyNamesForAvailableThingies.MICROSERVICE_SERVER },
            { name: AvailableComponents.MICROSERVICE_CLIENT, message: PrettyNamesForAvailableThingies.MICROSERVICE_CLIENT },
            { name: AvailableComponents.BG_TASK, message: PrettyNamesForAvailableThingies.BG_TASK },
            { name: AvailableComponents.COMMAND, message: PrettyNamesForAvailableThingies.COMMAND }
          ]

          // select the base components
          ctx.components = await task.prompt<AvailableComponents[]>({
            type: 'MultiSelect',
            message: 'Please select which components you want to include.',
            choices: choices as any,
            validate: (val) => {
              if (val?.length > 0) {
                return true
              } else {
                return 'At least one component must be included.'
              }
            },
            initial: getInitialFromPriorConfiguration(ctx, 'components', choices)
          })

          task.title = `Server components selected: ${ctx.components}`
        },
        options: {
          bottomBar: Infinity,
          persistentOutput: true
        }
      },

      // backend server types
      {
        skip: (ctx): boolean => !ctx.components.includes(AvailableComponents.SERVER) && !ctx?.server,
        task: async (ctx, task): Promise<void> => {
          // there can be two selections of API servers here
          const choices: ConvertToPromptType<AvailableServerTypes> = [
            { name: AvailableServerTypes.RESTFUL, message: PrettyNamesForAvailableThingies.RESTFUL },
            { name: AvailableServerTypes.GRAPHQL, message: PrettyNamesForAvailableThingies.GRAPHQL }
          ]

          ctx.server = await task.prompt<AvailableServerTypes>({
            type: 'Select',
            message: 'Please select the API server type.',
            choices: choices as any,
            initial: getInitialFromPriorConfiguration(ctx, 'server', choices)
          })

          task.title = `Server type selected as: ${ctx.server}`
        },
        options: {
          bottomBar: Infinity,
          persistentOutput: true
        }
      },

      // microservice-server types
      {
        skip: (ctx): boolean => !ctx.components.includes(AvailableComponents.MICROSERVICE_SERVER) && !ctx?.microservice,
        task: async (ctx, task): Promise<void> => {
          // there can be two selections of API servers here
          const choices: ConvertToPromptType<AvailableMicroserviceTypes> = [ { name: AvailableMicroserviceTypes.RMQ, message: PrettyNamesForAvailableThingies.RMQ } ]

          ctx.microservice = await task.prompt<AvailableMicroserviceTypes>({
            type: 'Select',
            message: 'Please select the microservice server type.',
            choices: choices as any,
            initial: getInitialFromPriorConfiguration(ctx, 'microservice', choices)
          })

          task.title = `Microservice type selected as: ${ctx.microservice}`
        },
        options: {
          bottomBar: Infinity,
          persistentOutput: true
        }
      },

      // database options
      {
        skip: (ctx): boolean => !ctx.components.includes(AvailableComponents.SERVER) && !ctx.components.includes(AvailableComponents.BG_TASK) && !ctx?.database,
        task: async (ctx, task): Promise<void> => {
          const choices: ConvertToPromptType<AvailableDBTypes> = [
            { name: AvailableDBTypes.NONE, message: PrettyNamesForAvailableThingies.NONE },
            { name: AvailableDBTypes.TYPEORM_MYSQL, message: PrettyNamesForAvailableThingies.TYPEORM_MYSQL },
            { name: AvailableDBTypes.TYPEORM_POSTGRESQL, message: PrettyNamesForAvailableThingies.TYPEORM_POSTGRESQL },
            { name: AvailableDBTypes.MONGOOSE_MONGODB, message: PrettyNamesForAvailableThingies.MONGOOSE_MONGODB }
          ]

          // there can be two selections of API servers here
          ctx.database = await task.prompt<AvailableDBTypes>({
            type: 'Select',
            message: 'Please select the database type.',
            choices: choices as any,
            initial: getInitialFromPriorConfiguration(ctx, 'database', choices)
          })

          task.title = `Database selected as: ${ctx.database}`
        },
        options: {
          bottomBar: Infinity,
          persistentOutput: true
        }
      },

      // select tests
      {
        skip: (ctx): boolean => !ctx?.tests,
        task: async (ctx, task): Promise<void> => {
          const choices: ConvertToPromptType<AvailableTestsTypes> = [
            { name: AvailableTestsTypes.JEST, message: PrettyNamesForAvailableThingies.JEST },
            { name: AvailableTestsTypes.NONE, message: PrettyNamesForAvailableThingies.NONE }
          ]

          ctx.tests = await task.prompt<AvailableTestsTypes>({
            type: 'Select',
            message: 'Please select the test runner type.',
            choices: choices as any,
            initial: getInitialFromPriorConfiguration(ctx, 'tests', choices)
          })

          task.title = `Test runner selected as: ${ctx.tests}`
        },
        options: {
          bottomBar: Infinity,
          persistentOutput: true
        }
      }
    ],
    {
      concurrent: false,
      rendererFallback: context.debug
    }
  ).run()
}

function getInitialFromPriorConfiguration (ctx: NormalizedSchema, key: keyof NormalizedSchema['priorConfiguration'], choices: ConvertToPromptType<any>): number[] | number {
  if (key === 'components') {
    return (
      ctx.priorConfiguration?.[key]?.reduce((o, val) => {
        choices.forEach((v, i) => {
          if (v.name === val) {
            o = [ ...o, i ]
          }
        })
        return o
      }, []) ?? []
    )
  } else {
    let value = 0
    choices.forEach((val, i) => {
      if (val.name === ctx.priorConfiguration?.[key]) {
        value = i
      }
    })

    return value
  }
}
