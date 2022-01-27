import { SchematicContext, Tree } from '@angular-devkit/schematics'
import { Listr } from 'listr2'

import { NormalizedSchema, Schema } from '../main.interface'
import { NxNestProjectIntegration, readMicroserviceProviderWorkspaceIntegration } from '@integration'
import { SchematicConstants } from '@interfaces'
import {
  AvailableComponents,
  AvailableDBAdapters,
  AvailableDBTypes,
  AvailableExtensions,
  AvailableMicroserviceTypes,
  AvailableServerTypes,
  PrettyNamesForAvailableThingies
} from '@interfaces/available.constants'
import { generateMicroserviceCasing } from '@utils'
import {
  AvailableTestsTypes,
  generateNameCases,
  getInitialFromPriorConfiguration,
  isVerbose,
  mapPromptChoices,
  normalizeNameWithApplicationModeTask,
  normalizePackageJsonNameTask,
  normalizePriorConfigurationTask,
  normalizeRootDirectoryTask,
  NxProjectTypes,
  setSchemaDefaultsInContext
} from '@webundsoehne/nx-tools'

/**
 * Normalize the options passed in through angular-schematics.
 * @param host
 * @param context
 * @param options
 */
export async function normalizeOptions (host: Tree, _context: SchematicContext, options: Schema): Promise<NormalizedSchema> {
  return new Listr<NormalizedSchema>(
    [
      // assign options to parsed schema
      {
        task: (ctx): void => {
          setSchemaDefaultsInContext(ctx, {
            default: [
              options,
              {
                sourceRoot: 'src'
              },
              {
                constants: SchematicConstants
              },
              {
                enum: {
                  components: AvailableComponents,
                  server: AvailableServerTypes,
                  database: AvailableDBTypes,
                  tests: AvailableTestsTypes,
                  microservice: AvailableMicroserviceTypes,
                  dbAdapters: AvailableDBAdapters,
                  extensions: AvailableExtensions
                }
              },
              {
                injectedCasing: {}
              }
            ]
          })
        }
      },

      ...normalizeNameWithApplicationModeTask<NormalizedSchema, NxNestProjectIntegration>(host, (_, project) => !!project.integration?.nestjs),

      // normalize package json scope
      ...normalizePackageJsonNameTask<NormalizedSchema>(host),

      // set project root directory
      ...normalizeRootDirectoryTask<NormalizedSchema>(host, NxProjectTypes.APP),

      // check for prior configuration
      ...normalizePriorConfigurationTask<NormalizedSchema, NxNestProjectIntegration>(host, 'nestjs'),

      // select server functionality
      {
        skip: (ctx): boolean => ctx.components?.length > 0,
        task: async (ctx, task): Promise<void> => {
          const choices = mapPromptChoices<AvailableComponents>(AvailableComponents, PrettyNamesForAvailableThingies)

          // select the base components
          ctx.components = await task.prompt<AvailableComponents[]>({
            type: 'MultiSelect',
            message: 'Please select which components you want to include.',
            choices,
            validate: (val) => {
              if (val.includes(AvailableComponents.MICROSERVICE_CLIENT) && val.length === 1) {
                return 'Microservice client can not be selected by its own.'
              }

              if (val?.length > 0) {
                return true
              } else {
                return 'At least one component must be included.'
              }
            },
            initial: getInitialFromPriorConfiguration<NormalizedSchema, AvailableComponents>(ctx, 'components', choices)
          })

          ctx.effectiveComponents = ctx.components.includes(AvailableComponents.MICROSERVICE_CLIENT) ? ctx.components.length - 1 : ctx.components.length

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
          const choices = mapPromptChoices<AvailableServerTypes>(AvailableServerTypes, PrettyNamesForAvailableThingies)

          ctx.server = await task.prompt<AvailableServerTypes>({
            type: 'Select',
            message: 'Please select the API server type.',
            choices,
            initial: getInitialFromPriorConfiguration<NormalizedSchema, AvailableServerTypes>(ctx, 'server', choices)
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
          const choices = mapPromptChoices<AvailableMicroserviceTypes>(AvailableMicroserviceTypes, PrettyNamesForAvailableThingies)

          ctx.microservice = await task.prompt<AvailableMicroserviceTypes>({
            type: 'Select',
            message: 'Please select the microservice server type.',
            choices,
            initial: getInitialFromPriorConfiguration<NormalizedSchema, AvailableMicroserviceTypes>(ctx, 'microservice', choices)
          })

          ctx.injectedCasing.microservice = generateMicroserviceCasing(ctx.name)

          task.title = `Microservice type selected as: ${ctx.microservice}`
        },
        options: {
          bottomBar: Infinity,
          persistentOutput: true
        }
      },

      // database options
      {
        skip: (ctx): boolean => !!ctx?.database,
        task: async (ctx, task): Promise<void> => {
          const choices = mapPromptChoices<AvailableDBTypes>(AvailableDBTypes, PrettyNamesForAvailableThingies)

          // there can be two selections of API servers here
          ctx.database = await task.prompt<AvailableDBTypes>({
            type: 'Select',
            message: 'Please select the database type.',
            choices,
            initial: getInitialFromPriorConfiguration<NormalizedSchema, AvailableDBTypes>(ctx, 'database', choices)
          })

          switch (ctx.database) {
          case AvailableDBTypes.TYPEORM_MYSQL:
            ctx.dbAdapters = AvailableDBAdapters.TYPEORM
            break
          case AvailableDBTypes.TYPEORM_POSTGRESQL:
            ctx.dbAdapters = AvailableDBAdapters.TYPEORM
            break
          case AvailableDBTypes.MONGOOSE_MONGODB:
            ctx.dbAdapters = AvailableDBAdapters.MONGOOSE
            break
          }

          task.title = `Database selected as: ${ctx.database}`
        },
        options: {
          bottomBar: Infinity,
          persistentOutput: true
        }
      },

      {
        skip: (ctx): boolean => !!ctx.extensions && ctx.extensions.length > 0,
        task: async (ctx, task): Promise<void> => {
          const choices = mapPromptChoices<AvailableExtensions>(AvailableExtensions, PrettyNamesForAvailableThingies)

          // there can be two selections of API servers here
          ctx.extensions = await task.prompt<AvailableExtensions[]>({
            type: 'MultiSelect',
            message: 'Please select the extensions you want.',
            choices,
            initial: getInitialFromPriorConfiguration<NormalizedSchema, AvailableExtensions>(ctx, 'extensions', choices)
          })

          task.title = `Extensions selected as: ${ctx.extensions.length > 0 ? ctx.extensions.join(', ') : 'none'}`
        },
        options: {
          bottomBar: Infinity,
          persistentOutput: true
        }
      },

      // microservice-client options
      {
        skip: (ctx): boolean => !ctx.components.includes(AvailableComponents.MICROSERVICE_CLIENT),
        task: async (ctx, task): Promise<void> => {
          const microservices = readMicroserviceProviderWorkspaceIntegration(host).map((m) => ({ name: m.name, message: `${m.name} from ${m.root}` }))

          if (microservices?.length > 0) {
            // there can be two selections of API servers here
            ctx.microserviceClient = await task.prompt<string[]>({
              type: 'MultiSelect',
              message: 'Please select which microservice-servers you want to include.',
              choices: microservices,
              initial: getInitialFromPriorConfiguration<NormalizedSchema, string>(ctx, 'microserviceClient', microservices)
            })

            ctx.microserviceCasing = {}
            // generate the microservice names
            await Promise.all(ctx.microserviceClient.map(async (m) => ctx.microserviceCasing[m] = generateMicroserviceCasing(m)))

            // select the components to inject these microservice-clients to
            // TODO: not sure if this is required a trivial case

            task.title = `Microservice clients selected as: ${ctx.microserviceClient.join(', ')}`
          } else {
            task.title = 'No microservice clients are found.'
          }
        },
        options: {
          bottomBar: Infinity,
          persistentOutput: true
        }
      },

      // select tests
      {
        skip: (ctx): boolean => !!ctx.tests,
        task: async (ctx, task): Promise<void> => {
          const choices = mapPromptChoices<AvailableTestsTypes>(AvailableTestsTypes, PrettyNamesForAvailableThingies)

          ctx.tests = await task.prompt<AvailableTestsTypes>({
            type: 'Select',
            message: 'Please select the test runner type.',
            choices,
            initial: getInitialFromPriorConfiguration<NormalizedSchema, AvailableTestsTypes>(ctx, 'tests', choices)
          })

          task.title = `Test runner selected as: ${ctx.tests}`
        },
        options: {
          bottomBar: Infinity,
          persistentOutput: true
        }
      },

      // generate casing
      {
        task: async (ctx): Promise<void> => {
          const casing = generateNameCases(ctx.name)

          ctx.casing = casing
        }
      }
    ],
    {
      rendererFallback: isVerbose()
    }
  ).run()
}
